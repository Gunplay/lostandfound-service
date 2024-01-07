import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CardData } from '../cards/types';
// Define the type for the action payload
interface FetchAdsPayload {
	wordQ: string;
	page: number;
	noveltyOrderQ: string;
	addressQ: string;
	typeId: number;
	categoryIdQ: string;
}

export interface DataAndTotalPage {
	foundAds: CardData[];
	totalPages: number;
}

//type DataAll = FetchAdsPayload | DataAndTotalPage
//                                                      actionPay;oad
//export const fetchAds = createAsyncThunk<CardData[], FetchAdsPayload>("ads/fetchAds", async ({ page, noveltyOrder }) => {

export const fetchAds = createAsyncThunk<DataAndTotalPage, FetchAdsPayload>(
	'ads/fetchAds',
	async ({ wordQ, page, noveltyOrderQ, addressQ, typeId, categoryIdQ }) => {
		try {
			const ifCategory = categoryIdQ ? `&categoryId=${categoryIdQ}` : '';
			const ifAddress = addressQ ? `&address=${addressQ}` : '';
			const url = `http://127.0.0.1:3001/ads/find?word=${wordQ}&page=${page}&noveltyOrder=${noveltyOrderQ}${ifAddress}&typeId=${typeId}${ifCategory}`;
			const { data } = await axios.get<DataAndTotalPage>(url);

			const { foundAds, totalPages } = data;

			return { foundAds, totalPages };
		} catch (error) {
			throw error;
		}
	}
);
