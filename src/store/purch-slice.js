import { createSlice } from "@reduxjs/toolkit";

const initialPurchState = {
    main_title: {},
    descriptions: [],
    purchDetailItems: {

    },
};

export const purchSlice = createSlice({
    name: 'purchSlice',
    initialState: initialPurchState,
    reducers: {
        getAllPurchs(state, action) {
            state.main_title = {...action.payload.main_title};
            state.descriptions = [...action.payload.desciriptions];
        },
        getPurchDetailItems(state, action) {
           let newPurchDetailItems = action.payload.data.find(item => item.id === Number(action.payload.id));
           state.purchDetailItems = newPurchDetailItems;
        }
    },
});

export const purchSliceAction = purchSlice.actions;