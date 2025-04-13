import { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import WidgetPanel from './WidgetPanel';
import Widget from './Widget';
import { WidgetData, GridLayout } from '../types';

// Настройка адаптивного grid layout
const ResponsiveGridLayout = WidthProvider(Responsive);

// Дефолтные виджеты для панели управления
const DEFAULT_WIDGETS: WidgetData[] = [
	{ id: 'widget1', name: 'Analytics', added: false },
	{ id: 'widget2', name: 'Statistics', added: false },
	{ id: 'widget3', name: 'Performance', added: false },
	{ id: 'widget4', name: 'User Data', added: false },
	{ id: 'widget5', name: 'Calendar', added: false },
];

// Дефолтный layout (будет использован если нет данных в localStorage)
const DEFAULT_LAYOUT: GridLayout = [];

const Dashboard = () => {
	// Состояние для режима редактирования
	const [isEditing, setIsEditing] = useState<boolean>(false);

	// Состояние для виджетов
	const [widgets, setWidgets] = useState<WidgetData[]>(DEFAULT_WIDGETS);

	// Состояние для layout
	const [layout, setLayout] = useState<GridLayout>(DEFAULT_LAYOUT);

	// Загружаем layout из localStorage при монтировании
	useEffect(() => {
		const savedLayout = localStorage.getItem('dashboardLayout');
		const savedWidgets = localStorage.getItem('dashboardWidgets');

		if (savedLayout) {
			setLayout(JSON.parse(savedLayout));
		}

		if (savedWidgets) {
			setWidgets(JSON.parse(savedWidgets));
		}
	}, []);

	// Добавление виджета
	const addWidget = (widgetId: string) => {
		setWidgets(prevWidgets =>
			prevWidgets.map(widget =>
				widget.id === widgetId
					? { ...widget, added: true }
					: widget
			)
		);

		// Добавляем в layout
		const newLayoutItem = {
			i: widgetId,
			x: (layout.length * 4) % 12, // Размещаем по горизонтали
			y: Math.floor(layout.length / 3), // И вертикально
			w: 4,
			h: 2,
			minW: 2,
			minH: 2
		};

		setLayout([...layout, newLayoutItem]);
	};

	// Удаление виджета
	const removeWidget = (widgetId: string) => {
		setWidgets(prevWidgets =>
			prevWidgets.map(widget =>
				widget.id === widgetId
					? { ...widget, added: false }
					: widget
			)
		);

		// Удаляем из layout
		setLayout(prevLayout => prevLayout.filter(item => item.i !== widgetId));
	};

	// Сохранение layout
	const saveLayout = () => {
		localStorage.setItem('dashboardLayout', JSON.stringify(layout));
		localStorage.setItem('dashboardWidgets', JSON.stringify(widgets));
		setIsEditing(false);
	};

	// Отмена изменений
	const cancelEdit = () => {
		const savedLayout = localStorage.getItem('dashboardLayout');
		const savedWidgets = localStorage.getItem('dashboardWidgets');

		if (savedLayout) {
			setLayout(JSON.parse(savedLayout));
		}

		if (savedWidgets) {
			setWidgets(JSON.parse(savedWidgets));
		} else {
			setWidgets(DEFAULT_WIDGETS);
		}

		setIsEditing(false);
	};

	// Обработка изменения layout
	const handleLayoutChange = (newLayout: GridLayout) => {
		setLayout(newLayout);
	};

	// Активные виджеты для отображения
	const activeWidgets = widgets.filter(widget => widget.added);

	return (
		<div className="h-[calc(100vh-150px)] w-full bg-white shadow flex flex-col">
			<div className="flex justify-between p-4">
				<h2 className="text-xl font-semibold">Dashboard</h2>
				<div>
					{!isEditing ? (
						<button
							onClick={() => setIsEditing(true)}
							className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
						>
							Edit Dashboard
						</button>
					) : (
						<div className="space-x-2">
							<button
								onClick={cancelEdit}
								className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
							>
								Cancel
							</button>
							<button
								onClick={saveLayout}
								className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
							>
								Save dashboard
							</button>
						</div>
					)}
				</div>
			</div>

			{isEditing && (
				<div className="px-4">
					<WidgetPanel
						widgets={widgets}
						onAddWidget={addWidget}
						onRemoveWidget={removeWidget}
					/>
				</div>
			)}

			<div className="flex-grow w-full bg-gray-50 border-t border-gray-200 overflow-auto">
				<ResponsiveGridLayout
					className="layout w-full"
					layouts={{ lg: layout }}
					breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
					cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
					rowHeight={100}
					width={window.innerWidth}
					isDraggable={isEditing}
					isResizable={isEditing}
					onLayoutChange={handleLayoutChange}
					margin={[10, 10]}
					containerPadding={[0, 0]}
				>
					{activeWidgets.map(widget => (
						<div key={widget.id}>
							<Widget
								id={widget.id}
								name={widget.name}
								isEditing={isEditing}
								onRemove={() => removeWidget(widget.id)}
							/>
						</div>
					))}
				</ResponsiveGridLayout>
			</div>
		</div>
	);
};

export default Dashboard;
