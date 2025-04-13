interface WidgetProps {
	id: string;
	name: string;
	isEditing: boolean;
	onRemove: () => void;
}

const Widget = ({ id, name, isEditing, onRemove }: WidgetProps) => {
	return (
		<div className="h-full w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative">
			{isEditing && (
				<button
					className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
					onClick={onRemove}
					aria-label="Remove widget"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
					</svg>
				</button>
			)}
			<h3 className="font-medium text-gray-800 mb-2">{name}</h3>
			<div className="bg-gray-100 rounded-lg h-4/5 flex items-center justify-center text-gray-400">
				Placeholder content for {name}
			</div>
		</div>
	);
};

export default Widget;
