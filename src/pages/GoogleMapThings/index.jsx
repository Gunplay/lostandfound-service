import GoogleMapReact from 'google-map-react'
import styles from './GoogleMapThings.module.scss'
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
		<div className={styles.map__container}>
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
