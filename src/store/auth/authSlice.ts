import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
    token: string|null,
    errorMessage: string|null
}

const initialState: AuthState = {
    token:localStorage.getItem('token'),
    errorMessage:null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // onChecking: ( state ) => {
        //     state.status = 'checking';
        //     state.user   = {};
        //     state.errorMessage = undefined;
        // },
        onLoginSuccess: ( state, action: PayloadAction<string> ) => {
            state.token = action.payload
            state.errorMessage = null;
        },
        // onLogout: ( state, { payload } ) => {
        //     state.status = 'not-authenticated';
        //     state.user   = {};
        //     state.errorMessage = payload;
        // },
        // clearErrorMessage: ( state ) => {
        //     state.errorMessage = undefined;
        // }
    }
});


// Action creators are generated for each case reducer function
export const { onLoginSuccess} = authSlice.actions;