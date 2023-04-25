import { createSlice } from "@reduxjs/toolkit";

const initialSocialState = {
    socialMedias: {},
};

export const socialSlice = createSlice({
    name: 'socialSlice',
    initialState: initialSocialState,
    reducers: {
        getAllSocial(state,action) {
            state.socialMedias = {...action.payload} 
        }
    }
});

export const socialSliceAction = socialSlice.actions;