import { WidgetData } from '../types';

interface WidgetPanelProps {
	widgets: WidgetData[];
	onAddWidget: (id: string) => void;
	onRemoveWidget: (id: string) => void;
}

const WidgetPanel = ({ widgets, onAddWidget, onRemoveWidget }: WidgetPanelProps) => {
	return (
		<div className="bg-gray-100 p-4 rounded mb-4">
			<h3 className="text-lg font-medium mb-3">Manage Widgets</h3>
			<div className="flex flex-wrap gap-[50px]">
				{widgets.map(widget => (
					<div
						key={widget.id}
						className="bg-black text-white p-3 rounded shadow-sm flex gap-[10px] justify-between items-center"
					>
						<span>{widget.name}</span>
						<button
							onClick={() => widget.added ? onRemoveWidget(widget.id) : onAddWidget(widget.id)}
							className={`px-3 py-1 rounded text-sm ${widget.added
								? 'bg-red-100 text-red-700 hover:bg-red-200'
								: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
								}`}
						>
							{widget.added ? 'Remove' : 'Add'}
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default WidgetPanel;
