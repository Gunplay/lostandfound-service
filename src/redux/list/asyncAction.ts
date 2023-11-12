import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { CardData } from '../card/types'
// Define the type for the action payload
interface FetchAdsPayload {
	wordQ: string
	page: number
	noveltyOrder: string
	typeIdQ: number
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
	async ({ wordQ, page, noveltyOrder, typeIdQ }) => {
		try {
			const url = `http://127.0.0.1:3001/ads/find?word=${wordQ}&page=${page}&noveltyOrder=${noveltyOrder}&typeId=${typeIdQ}`
			const { data } = await axios.get<DataAndTotalPage>(url)

			const { foundAds, totalPages } = data

			return { foundAds, totalPages }
		} catch (error) {
			throw error
		}
	}
)
