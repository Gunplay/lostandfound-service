// import { Card } from 'antd';
// import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { Marker, Popup } from 'react-leaflet';
// import { OpenStreetMapProvider } from 'react-leaflet-geosearch';
// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router';
// import { setLocation } from '../../redux/form/slice';
// import { fetchAdsPoints } from '../../redux/leafletMap/asyncActions';
// import { useAppDispatch } from '../../redux/store';

// const { Meta } = Card;
// const center = {
// 	lat: 51.505,
// 	lng: -0.09,
// };

// function DraggableMarker({
// 	adId,
// 	position,
// 	draggable,
// 	onDragEnd,
// 	city,
// 	onClick,
// }) {
// 	const { address, title, categoryName, photo } =
// 		useSelector(store => store.dataMiniInfo.dataMiniInfo.miniInfo) || {};
// 	const toggleDraggable = () => {
// 		onDragEnd(!draggable);
// 	};

// 	return (
// 		<>
// 			<Marker
// 				draggable={draggable}
// 				position={position}
// 				eventHandlers={{ dragend: onDragEnd, click: () => onClick(adId) }}
// 			>
// 				<Popup>
// 					<Card
// 						hoverable={false}
// 						cover={<img alt={photo} src={photo} style={{ width: 240 }} />}
// 					>
// 						<Meta title={title} description={categoryName} />
// 						<p>{`Coordinates: ${position.lat}, ${position.lng}`}</p>
// 						{address && <p>{`City: ${address}`}</p>}
// 					</Card>
// 				</Popup>
// 			</Marker>
// 		</>
// 	);
// }

// export default function LeafletMap() {
// 	const location = useLocation();
// 	const queryParams = new URLSearchParams(location.search);
// 	const pickId = queryParams.get('adId') || '';
// 	const dispatch = useAppDispatch();
// 	const adsPoints = useSelector(store => store.dataPoints);
// 	const { address, lat, lng } = useSelector(
// 		store => store.form.adData.location
// 	);

// 	const [draggable, setDraggable] = useState(false);
// 	const [position, setPosition] = useState(center);

// 	useEffect(() => {
// 		const fetchMapData = async () => {
// 			dispatch(fetchAdsPoints());

// 			try {
// 				const provider = new OpenStreetMapProvider();
// 				const results = await provider.search({
// 					query: `${position.lat}, ${position.lng}`,
// 				});

// 				if (results.length > 0) {
// 					dispatch(
// 						setLocation({
// 							lat: position.lat,
// 							lng: position.lng,
// 							address: results[0].label,
// 						})
// 					);
// 				}
// 			} catch (error) {
// 				console.error('Error fetching city:', error);
// 			}
// 		};

// 		fetchMapData();
// 	}, [dispatch, position]);

// 	const handleDragEnd = useCallback(isDraggable => {
// 		setDraggable(isDraggable);
// 	}, []);

// 	const markerRef = useRef(null);

// 	const eventHandlers = useMemo(
// 		() => ({
// 			dragend() {
// 				const marker = markerRef?.current;
// 				if (marker != null) {
// 					setPosition(marker.getLatLng());
// 				}
// 			},
// 		}),
// 		[]
// 	);

// 	const toggleDraggable = useCallback(() => {
// 		setDraggable(d => !d);
// 	}, []);
// }
