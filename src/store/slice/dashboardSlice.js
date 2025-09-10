import { createSlice } from "@reduxjs/toolkit";
import initialData from "../../data/initialData";

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: {
		panels: initialData,
	},
	reducers: {
		// Add a widget to one or more categories (widget contains name/text)
		addWidgetToCategories(state, action) {
			// payload: { categoryIds: [2,5], widget: { name, text } }
			const { categoryIds, widget } = action.payload;
			const newWidget = { ...widget, id: Date.now() + Math.floor(Math.random() * 1000) };
			state.panels.forEach((panel) => {
				panel.categories.forEach((cat) => {
					if (categoryIds.includes(cat.id)) {
						// push new copy
						cat.cardCategories.push({ ...newWidget });
					}
				});
			});
		},

		// Remove widget from a single category
		removeWidgetFromCategory(state, action) {
			// payload: { categoryId, widgetId }
			const { categoryId, widgetId } = action.payload;
			state.panels.forEach((panel) => {
				panel.categories.forEach((cat) => {
					if (cat.id === categoryId) {
						cat.cardCategories = cat.cardCategories.filter((w) => w.id !== widgetId);
					}
				});
			});
		},
	},
});

export const { addWidgetToCategories, removeWidgetFromCategory } = dashboardSlice.actions;

export default dashboardSlice.reducer;
