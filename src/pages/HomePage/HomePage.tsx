import React from 'react'

import { SubHeader } from '../../components'
import FloatingButtonHelpInfo from '../../components/FloatingButtonHelpInfo'
import { CardsPage } from '../CardsPage/CardPage'
import GoogleMapThings from '../GoogleMapThings'
import { MainManualLostAndFound } from '../MainManualLostAndFound'
import './HomePage.css'
const overlayStyle: React.CSSProperties = {
	height: '100vh',
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity value (0.5) to control the darkness
}

const HomePage: React.FC = () => {
	return (
		<>
			<SubHeader />
			<MainManualLostAndFound />
			<GoogleMapThings />
			{/* <div style={{ position: 'relative', zIndex: 50 }}>
				<img
					src='backgroundImg.jpg'
					alt='backgroundImg'
					style={{ height: '100vh', width: '100%', objectFit: 'cover' }}
				/>
				<div style={overlayStyle} />
				
			</div> */}

			<CardsPage />

			<FloatingButtonHelpInfo />
		</>
	)
}

export default HomePage
