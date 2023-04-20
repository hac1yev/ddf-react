import { createSlice } from "@reduxjs/toolkit";

const initialNewsState = {
    items: [],
    mediaNewsItems: [],
    newsDetailItems: {
        imgs: []
    },
};

export const newsSlice = createSlice({
    name: 'newsSlice',
    initialState: initialNewsState,
    reducers: {
        getAllNews(state,action){
            state.items = [...action.payload];
        },
        getMediaNews(state,action) {
            state.mediaNewsItems = [...action.payload];
        },
        getNewsDetailItems(state,action) {
            state.newsDetailItems = action.payload.data.find(item => item.id === Number(action.payload.id))
        },
    },
});

export const newsSliceAction = newsSlice.actions;