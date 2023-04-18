import { createSlice } from "@reduxjs/toolkit";

const initialVacancyState = {
    vacancyItems: [],
    vacancyDetailData: {}
};

export const vacancySlice = createSlice({
    name: 'vacancySlice',
    initialState: initialVacancyState,
    reducers: {
        getAllVacancy(state,action) {
            state.vacancyItems = [...action.payload];
        },
        getVacancyDetailData(state,action) {
            state.vacancyDetailData = action.payload.data.find(item => item.id === Number(action.payload.id));
        }
    }
});

export const vacancySliceAction = vacancySlice.actions;