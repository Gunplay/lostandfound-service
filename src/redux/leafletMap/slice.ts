import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAdsPoints } from './asyncActions';
import { Status } from './types';

// Extend TypeAdsPoints to include miniInfo

const initialState = {
	dataPoints: {
		points: [],

		status: Status.IDLE,
	},
};

const pointsSlice = createSlice({
	name: 'adsPoints',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchAdsPoints.pending, (state, action) => {
			state.dataPoints.status = Status.LOADING;
			state.dataPoints.points = [];
		});
		builder.addCase(
			fetchAdsPoints.fulfilled,
			(state, action: PayloadAction<any>) => {
				state.dataPoints.status = Status.SUCCESS;
				state.dataPoints.points = action.payload;
			}
		);
		builder.addCase(fetchAdsPoints.rejected, (state, action) => {
			state.dataPoints.status = Status.ERROR;
			state.dataPoints.points = [];
		});
	},
});

export default pointsSlice.reducer;
