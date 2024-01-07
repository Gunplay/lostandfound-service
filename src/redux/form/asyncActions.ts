import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../utils/API';
import { UserIdCategory } from './types';
// Remove the import of useDispatch from this file

export const fetchFormCategories = createAsyncThunk<UserIdCategory[]>(
	'form/fetchFormCategories',
	async () => {
		try {
			const { data } = await axios.get<UserIdCategory[]>(
				`${API.defaults.baseURL}ads/categories`
			);
			// Dispatch actions here if needed
			// dispatch(setAdsCategories(transformedCategories));

			return data;
		} catch (error) {
			// Handle errors here if necessary
			throw error;
		}
	}
);
