import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { FooterPanel, HeaderPanel } from '../components'

import { CardsPage } from '../pages/CardsPage/CardPage'
import FormLostFound from '../pages/FormLostFound'
import HomePage from '../pages/HomePage/HomePage'
import { MainManualLostAndFound } from '../pages/MainManualLostAndFound'

import { Route, Routes, useLocation } from 'react-router'
import ListSearchAds from '../pages/ListSearchAds'

const contentStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	backgroundColor: 'white',
	position: 'relative',
}

const siderStyle: React.CSSProperties = {
	textAlign: 'center',
	lineHeight: '120px',
	color: '#fff',
	backgroundColor: '#3ba0e9',
}

const footerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	backgroundColor: '#7dbcea',
	backgroundImage: 'url(',
}

const overlayStyle: React.CSSProperties = {
	height: '100vh',
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity value (0.5) to control the darkness
}

const ContentLayout: React.FC = () => {
	const location = useLocation()
	console.log('pathname', location.pathname)
	return (
		<Content style={contentStyle}>
			{/* <HeaderPanel /> */}
			{location.pathname !== '/formlostandfound' && <HeaderPanel />}
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/manual' element={<MainManualLostAndFound />} />
				<Route path='/cards' element={<CardsPage />} />
				<Route path='/list' element={<ListSearchAds />} />
				<Route path='/formlostandfound' element={<FormLostFound />} />
			</Routes>
			{location.pathname !== '/formlostandfound' && <FooterPanel />}
		</Content>
	)
}

export default ContentLayout
