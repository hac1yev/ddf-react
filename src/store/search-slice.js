import { createSlice } from "@reduxjs/toolkit";

const getSearchedText = () => {
    const searchedText = window.localStorage.getItem('searchText');
    if(searchedText) {
        return searchedText;
    }else {
        return '';
    }
}

const initialSearchState = {
    searchedText: getSearchedText()
};

export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: initialSearchState,
    reducers: {
        getAllStructure(state,action) {
            state.searchedText = action.payload;
        },
    },
});

export const searchSliceAction = searchSlice.actions;