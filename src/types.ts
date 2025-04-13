export interface WidgetData {
	id: string;
	name: string;
	added: boolean;
}

export type GridLayout = Array<{
	i: string;
	x: number;
	y: number;
	w: number;
	h: number;
	minW?: number;
	minH?: number;
}>;
