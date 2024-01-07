import { useEffect, useState } from 'react';

import { Col, Divider, Row, Space, Switch, Typography } from 'antd';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link as LinkRout } from 'react-router-dom';
import CardNewItem from '../../components/CardNewItem';
import { fetchCards } from '../../redux/cards/asyncActions';
import { selectCardData } from '../../redux/cards/selectors';
import { RootState, useAppDispatch } from '../../redux/store';
import styles from './CardsPage.module.scss';
const { Text, Link } = Typography;

interface CardsPageProps {
	move?: React.MutableRefObject<HTMLDivElement | null>;
}

export const CardsPage: React.FC<CardsPageProps> = () => {
	const dispatch = useAppDispatch();
	const { items, status } = useSelector(selectCardData);

	const currentPageStart = useSelector(
		(store: RootState) => store.list.currentPage
	);

	const [switcher, setSwitcher] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const [listSearchAds, setListSearchAds] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const cardsPerPage = 6;

	const onChange = (checked: boolean) => {
		setSwitcher(checked);
	};

	useEffect(() => {
		dispatch(fetchCards());
	}, []);

	const onChangeComponent = () => {
		setShowMore(true);
	};

	const indexOfLastCard = currentPage * cardsPerPage;

	const indexOfFirstCard = indexOfLastCard - cardsPerPage;

	const currentCards = items?.slice(indexOfFirstCard, indexOfLastCard);

	return (
		<div id={styles.wrapper}>
			<Row justify='center' className={styles.cardPage}>
				<Col>
					<h1 className={styles.cardPage__title} id='viewrecentitems'>
						RECENTLY LOST THINGS
					</h1>
				</Col>
			</Row>
			<Row
				justify='center'
				align='middle'
				className={styles.cardPage__moreInfo}
			>
				<Col>
					<Text type='success'>Open more information</Text>
					<Switch
						checked={switcher}
						onChange={onChange}
						size='default'
					></Switch>
				</Col>
			</Row>

			<Divider />

			<Row gutter={[0, 32]}>
				{currentCards?.map(item => (
					<Col key={item['_id']} xl={8} md={8} sm={12} xs={24}>
						<Space>
							<Row justify='center' className={styles.cardPage__space}>
								<LinkRout to={`/ad?adId=${item._id}`}>
									<CardNewItem checked={switcher} cardInfo={item} />
								</LinkRout>
							</Row>
						</Space>
					</Col>
				))}
			</Row>
			<br />
			<Row justify='center'>
				<Col>
					<LinkRout to='/list' className='show-more-link'>
						SHOW MORE
					</LinkRout>
				</Col>
			</Row>
		</div>
	);
};
