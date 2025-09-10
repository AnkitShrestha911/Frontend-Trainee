import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Dashboard from "./components/Dashboard";
import { ChevronRight, Search } from "lucide-react";
import { Card } from "./components/Card";

export default function App() {
	const panels = useSelector((s) => s.dashboard.panels);
	const [search, setSearch] = useState("");

	// flatten all widgets to allow search
	const allWidgets = useMemo(() => {
		const widgets = [];
		panels.forEach((panel) => {
			panel.categories.forEach((cat) => {
				cat.cardCategories.forEach((w) =>
					widgets.push({ ...w, categoryId: cat.id, categoryName: cat.name })
				);
			});
		});
		return widgets;
	}, [panels]);

	const filtered = useMemo(() => {
		if (!search.trim()) return null;
		const q = search.toLowerCase();
		return allWidgets.filter(
			(w) => w.name.toLowerCase().includes(q) || w.text.toLowerCase().includes(q)
		);
	}, [search, allWidgets]);

	return (
		<div className="min-h-screen bg-blue-50 px-4 md:px-6">
			<header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
				<div>
					<span className="text-xs">Home</span>
					<ChevronRight className="w-4 h-4 inline-block" />
					<span className="text-xs text-blue-900 font-bold">Dashboard V2</span>
				</div>

				<div className="flex items-center mx-auto p-2 gap-3 w-full sm:max-w-[500px] flex-1 relative">
					<Search className="absolute w-5 h-5 left-4" />
					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search Anything"
						className="flex-1 md:w-80  pl-10 border border-blue-300 bg-blue-50 rounded px-3 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
					/>
				</div>
			</header>

			{filtered ? (
				<section>
					<h2 className="text-lg font-medium mb-3">Search results</h2>
					{filtered.length ? (
						<div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-4   auto-rows-[minmax(250px,1fr)]">
							{filtered.map((w) => (
								<Card card={w} />
							))}
						</div>
					) : (
						<div className="text-lg  text-center text-gray-500 font-semibold">
							No matching widgets found.
						</div>
					)}
				</section>
			) : (
				// show main dashboard
				<Dashboard panels={panels} />
			)}
		</div>
	);
}
