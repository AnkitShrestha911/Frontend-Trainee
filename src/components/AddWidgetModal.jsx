import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addWidgetToCategories } from "../store/slice/dashboardSlice";

/**
 * Modal that allows adding a new widget to one or more categories.
 *
 * Props:
 * - onClose(): close modal
 * - currentCategoryId: id of category from which modal was opened (prechecked)
 * - allCategories: array of categories (id, name)
 */
export default function AddWidgetModal({ onClose, currentCategoryId, allCategories }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  // by default precheck the category where user clicked add
  const [selectedIds, setSelectedIds] = useState([currentCategoryId]);

  const toggleCategory = (id) => {
    setSelectedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const handleConfirm = () => {
    if (!name.trim()) return alert("Please enter a widget name");
    if (selectedIds.length === 0) return alert("Select at least one category");

    dispatch(
      addWidgetToCategories({
        categoryIds: selectedIds,
        widget: { name: name.trim(), text: text.trim() || "Random placeholder text" },
      })
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full h-svh absolute right-0 max-w-2xl rounded-md shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Add Widget</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-700">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Widget name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring"
              placeholder="e.g. Cloud Accounts Overview"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Widget text (optional)</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring"
              rows={3}
              placeholder="Short description shown in card"
            />
          </div>

          <div>
            <label className="text-sm block mb-2">Add to categories</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-auto">
              {allCategories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 border rounded px-3 py-2 bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">{cat.name}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Uncheck a category to avoid adding the widget there.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end absolute bottom-5 right-5 gap-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded bg-white hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
