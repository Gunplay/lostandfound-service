import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { FooterPanel, HeaderPanel, LayoutForForm } from '../components'
import { CardsPage } from '../pages/CardsPage/CardPage'
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

const ContentLayout: React.FC = () => {
	const location = useLocation()
	//	console.log('pathname', location.pathname)
	return (
		<Content style={contentStyle}>
			{/* <HeaderPanel /> */}
			{location.pathname !== '/formlostandfound' && <HeaderPanel />}
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/manual' element={<MainManualLostAndFound />} />
				<Route path='/cards' element={<CardsPage />} />
				<Route path='/list' element={<ListSearchAds />} />
				<Route path='/formlostandfound' element={<LayoutForForm />} />
			</Routes>
			{location.pathname !== '/formlostandfound' && <FooterPanel />}
		</Content>
	)
}

export default ContentLayout
