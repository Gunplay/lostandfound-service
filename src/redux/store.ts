import { configureStore } from '@reduxjs/toolkit';
// import filter from './filter/slice';
// import cart from './cart/slice';
// import pizza from './pizza/slice';
import { useDispatch } from 'react-redux';

import accountReducer from './account/slice';
import cardReducer from './cards/slice';
import formReducer from './form/slice';
import adsPoints from './leafletMap/slice';
import listReducer from './list/slice';
import miniInfo from './mapMiniInfoOfCard/slice';
import registerUser from './register/slice';
import singleCardReducer from './singleCard/slice';
// import formCategoriesReducers from "./form/slice";

export const store = configureStore({
	reducer: {
		card: cardReducer,
		singleCard: singleCardReducer,
		form: formReducer,
		list: listReducer,
		dataPoints: adsPoints,
		dataMiniInfo: miniInfo,
		register: registerUser,
		account: accountReducer,

		// categories: formCategoriesReducers,

		// cart,
		// pizza,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these paths in the state
				ignoredActions: ['form/setAdataPhotos', 'form/setAdataDataLostOrFound'],
				ignoredPaths: [
					'form.adData.photos',
					'form.adData.lostOrFoundAt',
					'form.adData.photosData',
				],
				serializableCheck: false,
			},
		}),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
