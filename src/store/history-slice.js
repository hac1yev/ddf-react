import { createSlice } from "@reduxjs/toolkit";

const initialHistoryState = {
    items: {},
};

export const historySlice = createSlice({
    name: 'historySlice',
    initialState: initialHistoryState,
    reducers: {
        getAllHistory(state,action) {
            state.items = action.payload;
        },
    },
});

export const historySliceAction = historySlice.actions;