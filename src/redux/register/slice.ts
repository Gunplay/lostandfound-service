import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { toastSuccess } from '../../utils/toastrConfig';
import { Status } from './types';
interface AuthState {
	userData: UserData | null;
	token: string | null;
	isOpenAuthModal: boolean;
	isLoginAuthModalMode: boolean;
	adsCategories: any[]; // Update the type accordingly
	modalPhoto: any; // Update the type accordingly
	status: Status;
}

interface UserData {
	// Define the structure of your user data
}

const initialState: AuthState = {
	userData: null,
	token: null,
	isOpenAuthModal: false,
	isLoginAuthModalMode: true,
	adsCategories: [], // Update the initial value accordingly
	modalPhoto: null, // Update the initial value accordingly
	status: Status.IDLE,
};

const sliceRegister = createSlice({
	name: 'register',
	initialState,
	reducers: {
		setІsLoginAuthModalMode: (state, action) => {
			state.isLoginAuthModalMode = !action.payload;
		},
		login: (
			state,
			action: PayloadAction<{ user: UserData; token: string }>
		) => {
			const { user, token } = action.payload;
			localStorage.setItem('userData', JSON.stringify(user));
			localStorage.setItem('token', JSON.stringify(token));
			state.userData = user;
			state.token = token;
		},
		logOut: (state, action) => {
			localStorage.removeItem('userData');
			localStorage.removeItem('token');
			state.userData = null;
			state.token = null;
			toastSuccess('You were successfully logged out!');
		},
		setIsOpenAuthModal: (state, action: PayloadAction<boolean>) => {
			state.isOpenAuthModal = action.payload;
		},
		setIsLoginAuthModalMode: (state, action: PayloadAction<boolean>) => {
			state.isLoginAuthModalMode = action.payload;
		},
	},
	// extraReducers: builder => {
	// 	builder.addCase(fetchAuthLogin.pending, state => {
	// 		state.status = Status.LOADING;
	// 		state.userData = null;
	// 		state.token = null;
	// 	});
	// 	builder.addCase(
	// 		fetchAuthLogin.fulfilled,
	// 		(state, action: PayloadAction<any>) => {
	// 			state.status = Status.SUCCESS;
	// 			state.userData = action.payload.userData;
	// 			state.token = action.payload.token;
	// 		}
	// 	);
	// 	builder.addCase(fetchAuthLogin.rejected, state => {
	// 		state.status = Status.ERROR;
	// 		state.userData = null;
	// 		state.token = null;
	// 	});
	// },
});

export const {
	setІsLoginAuthModalMode,
	login,
	logOut,
	setIsOpenAuthModal,
	setIsLoginAuthModalMode,
} = sliceRegister.actions;
export default sliceRegister.reducer;
