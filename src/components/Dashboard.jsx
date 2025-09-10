import React, { useState } from "react";
import Category from "./Category";
import { Clock, EllipsisVertical, Plus, RefreshCcw } from "lucide-react";

export default function Dashboard({ panels }) {
	const [openModal, setOpenModal] = useState(false);
	return (
		<div className="space-y-8">
			{panels.map((panel) => (
				<section key={panel.id}>
					<div className="flex h-full justify-between items-center gap-4 mb-10 sm:mb-0 flex-wrap">
						<h2 className="text-xl font-semibold mb-4">{panel.name}</h2>
						<div className="flex items-center h-10 gap-4 flex-wrap">
							<button
								onClick={() => setOpenModal(true)}
								className="flex items-center shadow-md text-sm px-3 hover:bg-gray-200 py-1.5 border border-gray-300 rounded h-full cursor-pointer"
							>
								Add Widget <Plus className="w-4 h-4 ml-2" />
							</button>
							<button className="shadow-md border cursor-pointer border-gray-300 rounded-md outline-none p-2 h-full">
								<RefreshCcw className="w-4 h-4" />
							</button>

							<button className="shadow-md cursor-pointer border border-gray-300 rounded-md outline-none px-1 py-2 h-full">
								<EllipsisVertical className="w-4 h-4" />
							</button>

							<button className="flex items-center cursor-pointer  font-medium border-2 h-full rounded-md px-2 gap-2 border-blue-900 text-blue-900">
								<Clock className="bg-blue-900 text-white rounded-full" />
								<span className="h-[90%] w-[2px] py-1 bg-blue-900"></span>
								<select className="outline-none border-none">
									<option value="2">Last 2 days</option>
									<option value="7">Last Week</option>
									<option value="30">Last Month</option>
								</select>
							</button>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-2 ">
						{panel.categories.map((cat) => (
							<Category
								key={cat.id}
								category={cat}
								allCategories={panel.categories}
                openModal={openModal}
                setOpenModal={setOpenModal}
							/>
						))}
					</div>
				</section>
			))}

		
		</div>
	);
}
