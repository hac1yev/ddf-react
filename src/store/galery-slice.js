import { createSlice } from "@reduxjs/toolkit";

const initialGaleryState = {
    photoGaleryItems: [],
    videoGaleryItems: [],
    mediaGaleryItems: [],
    mediaVideoGaleryItems: [],
};

export const galerySlice = createSlice({
    name: 'galerySlice',
    initialState: initialGaleryState,
    reducers: { 
        getAllGalery(state,action) {
            state.photoGaleryItems = [...action.payload];
        },
        getMediaGalery(state,action) {
            state.mediaGaleryItems = [...action.payload];
        },
        getAllVideoGalery(state,action) {
            state.videoGaleryItems = [...action.payload];
        },
        getMediaVideoGalery(state,action) {
            state.mediaVideoGaleryItems = [...action.payload];
        },
    },
});

export const galerySliceAction = galerySlice.actions;