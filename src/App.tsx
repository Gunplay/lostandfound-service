import React from 'react'
import './App.css'
import ContentLayout from './layouts/ContentLayout'

const App: React.FC = () => {
	return (
		<>
			<ContentLayout />
			<script
				src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}
			></script>
		</>
	)
}

export default App
