import React from 'react';

import { SubHeader } from '../../components';
import FloatingButtonHelpInfo from '../../components/FloatingButtonHelpInfo';
import { CardsPage } from '../CardsPage/CardPage';
import LeafletMap from '../LeafletjsMap';
import { MainManualLostAndFound } from '../MainManualLostAndFound';
import './HomePage.css';

const HomePage: React.FC = () => {
	return (
		<>
			<SubHeader />
			<MainManualLostAndFound />
			<LeafletMap markerForPath='homePage' />
			<CardsPage />
			<FloatingButtonHelpInfo />
			{/* <Account /> */}
		</>
	);
};

export default HomePage;
