import React from "react";
import { useDispatch } from "react-redux";
import { removeWidgetFromCategory } from "../store/slice/dashboardSlice";
import AddWidgetModal from "./AddWidgetModal";
import { Plus } from "lucide-react";
import { Card } from "./Card";

export default function Category({ category, allCategories, openModal, setOpenModal }) {
	const dispatch = useDispatch();

	const handleRemove = (widgetId) => {
		dispatch(removeWidgetFromCategory({ categoryId: category.id, widgetId }));
	};

	return (
		<div className="bg-pink-50 rounded-lg p-4 shadow-sm pb-10 mt-5">
			<div className="flex items-center justify-between mb-4">
				<h3 className="font-medium">{category.name}</h3>
				<div className="flex items-center gap-2"></div>
			</div>

			<div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-4   auto-rows-[minmax(250px,1fr)]">
				{category.cardCategories.map((card) => (
					<Card card={card} handleRemove={handleRemove}/>
				))}

				<div className="border border-gray-200  shadow-md  rounded-lg  bg-gray-50 flex items-center justify-center">
					<button
						onClick={() => setOpenModal(true)}
						className="flex items-center text-gray-500 text-sm px-3 py-1 border border-gray-300 rounded  cursor-pointer"
					>
						<Plus className="w-4 h-4 mr-2" /> Add Widget
					</button>
				</div>
			</div>

			{openModal && (
				<AddWidgetModal
					onClose={() => setOpenModal(false)}
					currentCategoryId={category.id}
					allCategories={allCategories}
				/>
			)}
		</div>
	);
}
