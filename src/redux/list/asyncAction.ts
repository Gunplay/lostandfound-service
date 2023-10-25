import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { CardData } from '../card/types'
// Define the type for the action payload
interface FetchAdsPayload {
	page: number
	noveltyOrder: string
}

export interface DataAndTotalPage {
	foundAds: CardData[]
	totalPages: number
}

//type DataAll = FetchAdsPayload | DataAndTotalPage
//                                                      actionPay;oad
//export const fetchAds = createAsyncThunk<CardData[], FetchAdsPayload>("ads/fetchAds", async ({ page, noveltyOrder }) => {
export const fetchAds = createAsyncThunk<DataAndTotalPage, FetchAdsPayload>(
	'ads/fetchAds',
	async ({ page, noveltyOrder }) => {
		try {
			const url = `http://127.0.0.1:3001/ads/find?word=&page=${page}&noveltyOrder=${noveltyOrder}`
			const { data } = await axios.get<DataAndTotalPage>(url)
			//console.log("data", data);
			// const { foundAds } = data;
			// return foundAds;
			// const { foundAds, totalPages } = data
			// return { foundAds, totalPages: totalPages }
			// console.log('data', data)
			// return data
			const { foundAds, totalPages } = data // Destructure foundAds and totalPages

			return { foundAds, totalPages }
		} catch (error) {
			throw error
		}
	}
)
