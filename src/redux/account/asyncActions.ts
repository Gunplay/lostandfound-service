import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/API';

export const fetchAdsUser = createAsyncThunk(
	'fetch/AdsUser',
	async (_, { getState }) => {
		try {
			// Assuming you have a function to get the authentication token from the state

			// Making the API call with the authentication token in the headers
			const { data } = await API.get('/ads/user');
			console.log('data', data);
			return data;
		} catch (error) {
			console.log('Something went wrong with fetchAdsUser:', error);
			throw error;
		}
	}
);
