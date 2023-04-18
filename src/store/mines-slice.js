import { createSlice } from "@reduxjs/toolkit";

const initialMinesState = {
    main_title: {},
    descriptions: [],
    mineDetailItems: {},
}

export const minesSlice = createSlice({
    name: 'minesSlice',
    initialState: initialMinesState,
    reducers: {
        getAllMines(state,action) {
            state.main_title = {...action.payload.main_title};
            state.descriptions = [...action.payload.desciriptions];
        },
        getAllMinesDetail(state,action) {
            state.mineDetailItems = action.payload.data.find(item => item.id === Number(action.payload.id));
            state.descriptions = [...action.payload.data];
        },
    },
});

export const minesSliceAction = minesSlice.actions;