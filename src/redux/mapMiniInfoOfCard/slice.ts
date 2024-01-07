import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchMiniInfoOfCard } from './asyncAction';
import { Status } from './types';
const initialState = {
	dataMiniInfo: {
		miniInfo: [],
		status: Status.IDLE,
	},
};

const sliceMiniInfo = createSlice({
	name: 'adsPoints',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchMiniInfoOfCard.pending, (state, action) => {
			state.dataMiniInfo.status = Status.LOADING;
			state.dataMiniInfo.miniInfo = [];
		});
		builder.addCase(
			fetchMiniInfoOfCard.fulfilled,
			(state, action: PayloadAction<any>) => {
				state.dataMiniInfo.status = Status.SUCCESS;
				state.dataMiniInfo.miniInfo = action.payload;
			}
		);
		builder.addCase(fetchMiniInfoOfCard.rejected, (state, action) => {
			state.dataMiniInfo.status = Status.ERROR;
			state.dataMiniInfo.miniInfo = [];
		});
	},
});

export default sliceMiniInfo.reducer;
