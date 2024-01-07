import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchSingleCardById } from './asyncActions';
import { Card, CardState, Status } from './types';

const initialState: CardState = {
	newAds: null, // or newAds: {} as CardState, depending on your preference
	status: Status.IDLE,
	error: null,
};

const singleCardSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchSingleCardById.pending, (state, action) => {
			state.status = Status.LOADING;
			state.newAds = null; // or state.newAds = {} as CardState;
		});

		builder.addCase(
			fetchSingleCardById.fulfilled,
			(state, action: PayloadAction<Card>) => {
				state.status = Status.SUCCESS;
				state.newAds = action.payload;
			}
		);

		builder.addCase(fetchSingleCardById.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.newAds = null; // or state.newAds = {} as CardState;
		});
	},
});

export default singleCardSlice.reducer;
