import { Card, Divider } from 'antd';
import { Icon } from 'leaflet';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { OpenStreetMapProvider } from 'react-leaflet-geosearch';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { setLocation } from '../../redux/form/slice';
import { fetchAdsPoints } from '../../redux/leafletMap/asyncActions';
import { fetchMiniInfoOfCard } from '../../redux/mapMiniInfoOfCard/asyncAction';
import { useAppDispatch } from '../../redux/store';
import customGlatIconGeo from './icon/placeholder.png';
import styles from './leafletjsMap.module.scss';
const { Meta } = Card;
const center = {
	lat: 51.505,
	lng: -0.09,
};

const customMarker = new Icon({
	iconUrl: customGlatIconGeo,
	iconSize: [33, 33],
});
function DraggableMarker({
	adId,
	position,
	draggable,
	onDragEnd,
	city,
	onClick,
}) {
	const location = useLocation();
	const { address, title, categoryName, photo } =
		useSelector(store => store.dataMiniInfo.dataMiniInfo.miniInfo) || {};
	const toggleDraggable = () => {
		onDragEnd(!draggable);
	};

	return (
		<>
			(
			<Marker
				draggable={draggable}
				position={position}
				eventHandlers={{ dragend: onDragEnd, click: () => onClick(adId) }}
				icon={customMarker}
			>
				<Popup>
					<Card
						hoverable={false}
						cover={<img alt={photo} src={photo} style={{ width: 240 }} />}
					>
						<Meta title={title} description={categoryName} />
						<p>{`Coordinates: ${position.lat}, ${position.lng}`}</p>
						{address && <p>{`City: ${address}`}</p>}
					</Card>
				</Popup>
			</Marker>
			)
		</>
	);
}

export default function LeafletMap({ markerForPath }) {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const pickId = queryParams.get('adId') || '';
	const dispatch = useAppDispatch();
	const adsPoints = useSelector(store => store.dataPoints);
	const { address, lat, lng } = useSelector(
		store => store.form.adData.location
	);

	const [draggable, setDraggable] = useState(false);
	const [position, setPosition] = useState(center);

	useEffect(() => {
		const fetchMapData = async () => {
			dispatch(fetchAdsPoints());

			try {
				const provider = new OpenStreetMapProvider();
				const results = await provider.search({
					query: `${position.lat}, ${position.lng}`,
				});

				if (results.length > 0) {
					dispatch(
						setLocation({
							lat: position.lat,
							lng: position.lng,
							address: results[0].label,
						})
					);
				}
			} catch (error) {
				console.error('Error fetching city:', error);
			}
		};

		fetchMapData();
	}, [dispatch, position]);

	const handleDragEnd = useCallback(isDraggable => {
		setDraggable(isDraggable);
	}, []);

	const markerRef = useRef(null);

	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef?.current;
				if (marker != null) {
					setPosition(marker.getLatLng());
				}
			},
		}),
		[]
	);

	const toggleDraggable = useCallback(() => {
		setDraggable(d => !d);
	}, []);

	let mapContent;

	switch (markerForPath) {
		case 'homePage':
			mapContent = adsPoints.dataPoints?.points.map(item => (
				<DraggableMarker
					key={item.adId}
					position={{ lat: item.lat, lng: item.lng }}
					draggable={draggable}
					onDragEnd={handleDragEnd}
					city={address}
					icon={customMarker}
					onClick={() => {
						try {
							console.log('pickedId:', item.adId);
							dispatch(fetchMiniInfoOfCard({ adId: item.adId }));
						} catch (error) {
							console.error('Error dispatching fetchMiniInfoOfCard:', error);
						}
					}}
				/>
			));
			break;

		case 'formPage':
			mapContent = (
				<Marker
					draggable={draggable}
					eventHandlers={eventHandlers}
					position={position}
					ref={markerRef}
					icon={customMarker}
				>
					<Popup minWidth={90}>
						<span onClick={toggleDraggable}>
							{draggable
								? 'Marker is draggable'
								: 'Click here to make marker draggable'}
						</span>
					</Popup>
				</Marker>
			);
			break;

		case 'singleItemPage':
			const selectedItem = adsPoints.dataPoints?.points.find(
				item => item.adId === pickId
			);

			if (selectedItem) {
				mapContent = (
					<Marker
						key={selectedItem.adId}
						position={{ lat: selectedItem.lat, lng: selectedItem.lng }}
						city={address}
						ref={markerRef}
						className={styles.marker}
						icon={customMarker}
					>
						<Popup minWidth={90}>
							<span>
								{selectedItem.lat}
								<Divider />
								{selectedItem.lng}
							</span>
						</Popup>
					</Marker>
				);
				center.lat = selectedItem.lat;
				center.lng = selectedItem.lng;
			}
			break;

		default:
			break;
	}

	return (
		<MapContainer
			center={center}
			zoom={4}
			scrollWheelZoom={false}
			className={styles.map__container}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{mapContent}
		</MapContainer>
	);
}
