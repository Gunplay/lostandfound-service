import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../utils/API';
import { CardData } from './types';
// import pickBy from 'lodash/pickBy';
// import identity from 'lodash/identity';

export const fetchCards = createAsyncThunk<CardData[]>(
	'card/fetchCards',
	async () => {
		// (params)
		//const { sortBy, order, category, search, currentPage } = params;
		//console.log(params, 4444);
		const { data } = await axios.get<CardData[]>(
			`${API.defaults.baseURL}ads/new`,
			//`http://127.0.0.1:3001/ads/mini-info/65781b0ba06b7815c8240d66`,
			// http://127.0.0.1:3001/ads/mini-info
			{
				//   params: pickBy(
				//     {
				//       page: currentPage,
				//       limit: 4,
				//       category,
				//       sortBy,
				//       order,
				//       search,
				//     },
				//     identity,
				//   ),
			}
		);
		console.log('mini-info', data);
		return data;
	}
);
