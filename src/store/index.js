import { configureStore } from "@reduxjs/toolkit";
import { langSlice } from "./lang-slice";
import { minesSlice } from "./mines-slice";
import { newsSlice } from "./news-slice";
import { purchSlice } from "./purch-slice";
import { misVisSlice } from "./misVis-slice";
import { historySlice } from "./history-slice";
import { rehberlikSlice } from "./rehberlik-slice";
import { structureSlice } from "./structure-slice";
import { galerySlice } from "./galery-slice";
import { vacancySlice } from "./vacancy-slice";

export const store = configureStore({
    reducer: {
        newsReducer: newsSlice.reducer,
        langReducer: langSlice.reducer,
        minesReducer: minesSlice.reducer,
        purchReducer: purchSlice.reducer,
        misVisReducer: misVisSlice.reducer,
        historyReducer: historySlice.reducer,
        rehberlikReducer: rehberlikSlice.reducer,
        structureReducer: structureSlice.reducer,
        galeryReducer: galerySlice.reducer,
        vacancyReducer: vacancySlice.reducer,
    },
});