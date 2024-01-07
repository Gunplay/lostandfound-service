import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../utils/API';
import { TypeMiniInfo } from './types';

export const fetchMiniInfoOfCard = createAsyncThunk<
	TypeMiniInfo[],
	{ adId: number }
>('fetch/mini-info', async ({ adId }) => {
	try {
		console.log('async-id', adId);
		const { data } = await axios.get<TypeMiniInfo[]>(
			`${API.defaults.baseURL}ads/mini-info/${adId}`
		);

		return data;
	} catch (error) {
		console.log('Something went wrong');
		throw error;
	}
});
