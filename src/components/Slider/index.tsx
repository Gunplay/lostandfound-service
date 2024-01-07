import { Card, Carousel, Col, Divider, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import {
	CalendarOutlined,
	EnvironmentOutlined,
	FieldTimeOutlined,
	FormOutlined,
	LayoutOutlined,
	MailOutlined,
	PhoneOutlined,
	UserOutlined,
} from '@ant-design/icons';
import styles from './Slider.module.scss';
const { Title, Paragraph, Text, Link } = Typography;
export const Slider: React.FC = () => {
	const { newAds } = useSelector((store: RootState) => store.singleCard);

	const onChange = (currentSlide: number) => {};
	return (
		<div className={styles.SliderStyle}>
			<Carousel
				dotPosition='top'
				dots
				speed={20}
				autoplay={false}
				afterChange={onChange}
				effect='scrollx'
				className={styles.carousel__wrapper}
			>
				{newAds?.photos.map((photo, index) => (
					<>
						<Divider />
						<Title level={2}>{newAds.title}</Title>
						<div className={styles.slider_itemPosition}>
							<div key={index} className={styles.ContentStyle}>
								<img
									src={photo}
									className={styles.card__img}
									alt={`img-${index}`}
								/>
							</div>
							<Card hoverable={false}>
								{/* <Meta title={newAds.title} description={'categoryName'} /> */}
								{/* <p>{`Coordinates: ${position.lat}, ${position.lng}`}</p>
							{address && <p>{`City: ${address}`}</p>} */}
								<Col>
									<LayoutOutlined /> {newAds.typeId === 1 ? 'LOST' : 'FOUND'}
								</Col>

								{/* <div className={styles.singleCard__description}>
							Category:{' '}
							{categoryType.map((item, id) => {
								console.log('types', item.category);
								return item.category === item._id;
							})}
						</div> */}
								<div className={styles.singleCard__description}>
									<FormOutlined /> Description: {newAds.description}
								</div>
								<div className={styles.singleCard__description}>
									<EnvironmentOutlined /> Address where it was lost:{' '}
									{newAds.location.address}
								</div>
								<div className={styles.singleCard__description}>
									<CalendarOutlined /> Date when it was lost:{' '}
									{newAds.lostOrFoundAt}
								</div>
								<div className={styles.singleCard__description}>
									<FieldTimeOutlined /> Created At: {newAds.createdAt}
								</div>
								<div className={styles.singleCard__description}>
									<UserOutlined /> {newAds.user.firstname}{' '}
									{newAds.user.lastname}
								</div>

								<div className={styles.singleCard__description}>
									<MailOutlined /> {newAds.user.email}
								</div>

								<div className={styles.singleCard__description}>
									<PhoneOutlined /> {newAds.user.phone}
								</div>
							</Card>
						</div>
					</>
				))}
			</Carousel>
		</div>
	);
};
