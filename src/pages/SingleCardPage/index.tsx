import {
	CalendarOutlined,
	EnvironmentOutlined,
	FieldTimeOutlined,
	LayoutOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Slider } from '../../components';
import { fetchSingleCardById } from '../../redux/singleCard/asyncActions';
import { RootState, useAppDispatch } from '../../redux/store';
import LeafletMap from '../LeafletjsMap';
import styles from './SingleCardPage.module.scss';
const { Title, Text } = Typography;

const SingleCardPage = () => {
	const dispatch = useAppDispatch();
	const { newAds } = useSelector((store: RootState) => store.singleCard);
	const categoryType = useSelector(
		(store: RootState) => store.form.adData.categories
	);
	const location = useLocation();

	const queryParams = new URLSearchParams(location.search);

	const id = queryParams.get('adId') || '';

	useEffect(() => {
		dispatch(fetchSingleCardById(id));
	}, [dispatch, id]);

	if (!newAds) {
		return <h1 style={{ backgroundColor: 'black' }}>Loading Card...</h1>;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.leafletMap__singlePageWrap}>
				<LeafletMap markerForPath='singleItemPage' />
			</div>
			<div className={styles.singleCard__wrapper}>
				<Row justify='start'>
					<Col>
						<Slider />
						{/* <Title style={{ color: 'white' }}>{newAds.title}</Title> */}
					</Col>
				</Row>
				<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify='start'>
					{/* <Col className='gutter-row' span={12}>
						<div
							className={`${styles.singleCard__description} ${styles.singleCard__type}`}
						>
							<LayoutOutlined /> {newAds.typeId === 1 ? 'LOST' : 'FOUND'}
						</div>
					</Col>
					<Col className='gutter-row' span={12}>
						<div className={styles.singleCard__description}>
							Category:{' '}
							{categoryType.map((item, id) => {
								console.log('types', item.category);
								return item.category === item._id;
							})}
						</div>
					</Col>
					<Col className='gutter-row' span={12}>
						<div className={styles.singleCard__description}>
							Description {newAds.description}
						</div>
					</Col>
					<Col className='gutter-row' span={12}>
						<div className={styles.singleCard__description}>
							<EnvironmentOutlined /> Address where it was lost:{' '}
							{newAds.location.address}
						</div>
					</Col>
					<Col className='gutter-row' span={12}>
						<div className={styles.singleCard__description}>
							<CalendarOutlined /> Date when it was lost: {newAds.lostOrFoundAt}
						</div>
					</Col>
					<Col className='gutter-row' span={12}>
						<div className={styles.singleCard__description}>
							<FieldTimeOutlined /> Created At: {newAds.createdAt}
						</div>
					</Col>

					<Col className='gutter-row' span={12}>
						<div className={styles.singleCard__description}>
							<UserOutlined /> {newAds.user.firstname} {newAds.user.lastname}
						</div>
					</Col>
					<Col className='gutter-row' span={12}>
						<div className={styles.singleCard__description}>
							{newAds.user.email}
						</div>
					</Col>
					<Col className='gutter-row' span={12}>
						<div className={styles.singleCard__description}>
							<PhoneOutlined /> {newAds.user.phone}
						</div>
					</Col> */}
				</Row>
			</div>
		</div>
	);
};

export default SingleCardPage;
