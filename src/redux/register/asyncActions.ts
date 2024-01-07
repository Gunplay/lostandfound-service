import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import API from '../../utils/API';
import { RootState } from '../store';
import { AppState } from './types';

interface AuthLoginPayload {
	username: string;
	password: string;
}

export const fetchAuthLogin = createAsyncThunk<
	AppState,
	AuthLoginPayload,
	{ state: RootState }
>('fetchAuthLogin', async ({ username, password }, { rejectWithValue }) => {
	try {
		const response: AxiosResponse<AppState> = await axios.post(
			`${API.defaults.baseURL}/auth/login`,
			{ username, password }
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching auth login data:', error);
		if (error instanceof Error) {
			return rejectWithValue(
				error.message || 'Failed to fetch auth login data'
			);
		} else {
			return rejectWithValue('Failed to fetch auth login data');
		}
	}
});
