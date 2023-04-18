import { createSlice } from "@reduxjs/toolkit";

const initialStructureSlice = {
    structure: '',
};

export const structureSlice = createSlice({
    name: 'structureSlice',
    initialState: initialStructureSlice,
    reducers: {
        getAllStructure(state,action) {
            state.structure = action.payload.struktur;
        },
    },
});

export const structureSliceAction = structureSlice.actions;