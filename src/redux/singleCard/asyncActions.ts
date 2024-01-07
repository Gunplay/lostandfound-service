import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/API';
import { Card } from './types';

type FetchSingleCardByIdResponse = Card;

export const fetchSingleCardById = createAsyncThunk<
	FetchSingleCardByIdResponse, // Type of the returned data
	string
>('card/fetchSingleCardbyId', async function getDataSingleCard(adId: string) {
	try {
		const response = await fetch(`${API.defaults.baseURL}ads/${adId}`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();

		return data;
	} catch (error) {
		console.error('Error fetching single card:', error);
		throw error;
	}
});
