import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export default function SimpleMap() {
	const defaultProps = {
		center: {
			lat: 49.132927,
			lng: 28.476183,
		},
		zoom: 5,
	}

	return (
		// Important! Always set the container height explicitly
		<div style={{ height: '65vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
				<AnyReactComponent lat={59.955413} lng={30.337844} text='My Marker' />
			</GoogleMapReact>
		</div>
	)
}
