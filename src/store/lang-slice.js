import { createSlice } from "@reduxjs/toolkit";

const getLangStorage = () => {
    const lang = window.localStorage.getItem('lang');
    if(lang){
        if(lang === 'false'){
            return false
        }else{
            return true
        }
    }else{
        return false
    }
};

const initialLangState = {
    lang: getLangStorage(),
};

export const langSlice = createSlice({
    name: 'langSlice',
    initialState: initialLangState,
    reducers: {
        changeLang(state, action){
            state.lang = action.payload;
        },
        replaceLang(state) {
            state.lang = !state.lang;
        }
    }
});

export const langSliceAction = langSlice.actions;