import { createSlice } from "@reduxjs/toolkit";

const initialRehberlikSlice = {
    items: [],
    detailItems: {
        id: '',
        full_name: '',
        position: '',
        img: '',
        description: '',
    },
};

export const rehberlikSlice = createSlice({
    name: 'rehberlikSlice',
    initialState: initialRehberlikSlice,
    reducers: {
        getAllRehberlik(state,action) {
            state.items = [...action.payload];
        },
        getRehberlikDetail(state,action) {
            state.detailItems = action.payload.data.find(item => item.id === Number(action.payload.id));
        },
    },
});

export const rehberlikSliceAction = rehberlikSlice.actions;