import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CardData } from '../cards/types';
import { DataAndTotalPage, fetchAds } from './asyncAction';
import { Status } from './types';

const initialState = {
	foundAds: [] as CardData[],
	totalPages: 1,
	currentPage: 1,
	word: '',
	noveltyOrder: 'desc',
	typeId: 1,
	categoryId: null,
	address: '',
	isLoadResults: false,
	status: Status.LOADING,
};

const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		setWorQ: (state, action) => {
			state.word = action.payload;
		},
		setTypeId: (state, action) => {
			state.typeId = action.payload;
		},
		setCategoryId: (state, action) => {
			state.categoryId = action.payload;
		},
		setAddress: (state, action) => {
			state.address = action.payload;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setTotalPage: (state, action) => {
			state.totalPages = action.payload;
		},
		setNoveltyOrder: (state, action) => {
			state.noveltyOrder = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchAds.pending, (state, action) => {
			state.status = Status.LOADING;
			state.foundAds = [];
		});
		builder.addCase(
			fetchAds.fulfilled,
			//(state, action: PayloadAction<DataAndTotalPage>) => {
			(state, action: PayloadAction<DataAndTotalPage>) => {
				state.foundAds = action.payload.foundAds;
				state.totalPages = action.payload.totalPages; // Use `totalPages` here
				state.status = Status.SUCCESS;
			}
		);

		builder.addCase(fetchAds.rejected, (state, action) => {
			state.foundAds = [];
			state.status = Status.ERROR;
		});
	},
});

export const {
	setWorQ,
	setTypeId,
	setCategoryId,
	setNoveltyOrder,
	setAddress,
	setCurrentPage,
	setTotalPage,
} = listSlice.actions;
export default listSlice.reducer;
