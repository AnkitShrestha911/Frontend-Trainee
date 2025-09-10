export function Card({card,handleRemove}) {
	return (
		<div
			key={card.id}
			className="border border-gray-200 w-full shadow-md  rounded-lg p-3 bg-gray-50 relative"
		>
			<h2 className="font-bold text-sm">{card.name}</h2>
			{/* top-right remove */}
			<button
				onClick={() => handleRemove(card.id)}
				className="absolute cursor-pointer top-2 right-2 text-gray-400 hover:text-red-500"
				title="Remove widget"
			>
				✕
			</button>
			<div className="flex justify-center h-full mt-20 ">
				<p className="font-medium text-sm tracking-wide text-gray-600">{card.text}</p>
			</div>
		</div>
	);
}
