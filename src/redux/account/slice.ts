import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAdsUser } from './asyncActions';

export const initialEditAdData = {
	_id: null,
	typeId: 1,
	title: '',
	description: '',
	location: {
		lat: null,
		lng: null,
		address: '',
	},
	photos: [],
	lostOrFoundAt: new Date(),
	categoryId: null,
	secretQuestion: '',
	secretAnswer: '',
};

const initialState = {
	// user ad list
	userAds: [],
	isLoadUserAds: false,
	// edit ad
	editAdData: initialEditAdData,
	isLoadEditAdData: false,
	editAdErrorMessage: '',
	isLoadSubmitEditAd: false,
	infoModalMessageEditAd: null,
	// answers
	answers: [],
	isLoadAnswers: false,
};

const sliceUserAccount = createSlice({
	name: 'account',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(
			fetchAdsUser.pending,
			(state, action: PayloadAction<any>) => {
				state.userAds = action.payload;
			}
		);
	},
});

// export const {} = sliceUserAccount.actions;
export default sliceUserAccount.reducer;
