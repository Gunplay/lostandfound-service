import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../utils/API';
import { TypeAdsPoints } from './types';

export const fetchAdsPoints = createAsyncThunk(
	'fetch/adsPoints',
	async function fetchAdsPoints(params: any, { rejectWithValue }) {
		try {
			// Await the result of axios.get to get the actual response

			const { data } = await axios.get<TypeAdsPoints[]>(
				`${API.defaults.baseURL}ads/points`
			);

			console.log('Ads Points Response:', data);

			return data;
		} catch (error) {
			alert('something went wrong..., The data are not available..');
			// Use rejectWithValue to pass error information to the reducer
			throw error;
			// return rejectWithValue(error || 'Failed to fetch data');
		}
	}
);
