import { createSlice } from "@reduxjs/toolkit";

const initialMisVisState = {
    mission: '',
    vision: ''
};

export const misVisSlice = createSlice({
    name: 'misVisSlice',
    initialState: initialMisVisState,
    reducers: {
        getAllMisVis(state,action) {
            state.mission = action.payload.mission;
            state.vision = action.payload.vision;
        },
    },
});

export const misVisSliceAction = misVisSlice.actions;