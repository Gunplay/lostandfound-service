import { Avatar, Card, Col, Descriptions, Pagination, Row, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { SearchPanel } from '../../components/SearchPanel';
import { Status } from '../../redux/cards/types';
import { setCurrentPage } from '../../redux/list/slice';
import { RootState, useAppDispatch } from '../../redux/store';
import styles from './ListSearchAds.module.scss';
const { Meta } = Card;
// const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']

const ListSearchAds = () => {
	const dispatch = useAppDispatch();

	const {
		foundAds,
		totalPages,
		currentPage,
		word,
		noveltyOrder,
		typeId,
		//categoryId,
		address,
		isLoadResults,
		status,
	} = useSelector((store: RootState) => store.list);

	const navigate = useNavigate();

	const location = useLocation();

	const queryParams = new URLSearchParams(location.search);

	const wordQ = queryParams.get('word') || '';
	const page = parseInt(queryParams.get('page') || '1', 10);

	const noveltyOrderQ = queryParams.get('noveltyOrder') || 'desc';
	const typeIdQ = parseInt(queryParams.get('typeId') || '1', 10);

	const categoryIdQ = queryParams.get('categoryId') || '';
	const addressQ = queryParams.get('address') || '';

	// useEffect(() => {
	// 	// navigate(`/ads/find`);
	// 	dispatch(
	// 		fetchAds({ wordQ, page, noveltyOrderQ, addressQ, typeId, categoryIdQ })
	// 	) // Fetch data when the component mounts or when query parameters
	// 	dispatch(fetchFormCategories())
	// 	//dispatch(setTotalPage(totalPages))
	// }, [dispatch, wordQ, page, noveltyOrderQ, addressQ, typeId, categoryIdQ])

	const handleNavigate = (
		newPage: number,
		newWordQ: string,
		newTypeIdQ: number,
		newCategoryIdQ: any,
		newNoveltyOrder: string,
		newAddressQ: string
	) => {
		dispatch(setCurrentPage(newPage));
		// dispatch(setWorQ(newWordQ))
		// dispatch(setTypeId(newTypeIdQ))
		// // newTypeIdQ === 1
		// // 	? dispatch(setTypeIdQ(AD_LOST_TYPE_ID))
		// // 	: dispatch(setTypeIdQ(AD_FOUND_TYPE_ID))

		// dispatch(setCategoryId(newCategoryIdQ))
		// dispatch(setNoveltyOrder(newNoveltyOrder))
		// dispatch(setAddress(newAddressQ))
		navigate(
			`/list?word=${newWordQ}&page=${newPage}&noveltyOrder=${newNoveltyOrder}&address=${newAddressQ}&typeId=${newTypeIdQ}&categoryId=${newCategoryIdQ}`
		);
	};

	const handlePageChange = (newPage: any) => {
		handleNavigate(
			newPage,
			wordQ,
			typeIdQ,
			[categoryIdQ],
			noveltyOrder,
			addressQ
		);
	};

	return (
		<>
			<div className={styles.wrapper}>
				<SearchPanel />
				{status === Status.LOADING ? (
					<Row align='middle'>
						<Col xs={24} sm={24} md={24} lg={24} xl={24}>
							<Spin size='large' />
						</Col>
					</Row>
				) : (
					<div className={styles.wrap__card}>
						{foundAds &&
							foundAds.map((item: any) => (
								<Row justify='center' align='middle' key={item['_id']}>
									<Col xs={14} sm={12} md={10} lg={8} xl={6}>
										<Link to={`/ad?adId=${item._id}`}>
											<Card
												className={styles.search__card}
												cover={
													<img
														alt='example'
														src={item.photo}
														className={styles.search__cardImg}
													/>
												}
												hoverable
												// actions={[
												// 	<SettingOutlined key='setting' />,
												// 	<EditOutlined key='edit' />,
												// 	<EllipsisOutlined key='ellipsis' />,
												// ]}
											>
												<Meta
													avatar={
														<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />
													}
													title={item.title}
													description={
														typeId === 1 ? 'Type Lost' : 'Type Found'
													}
												/>
											</Card>
										</Link>
									</Col>
									<Col xs={10} sm={10} md={14} lg={12} xl={16}>
										<Descriptions
											title={item.categoryName}
											className={styles.search__description}
										>
											{/* address, categoryName, createdAt, photo, title, typeId, _id */}
											<Descriptions.Item
												label='Address'
												className={styles.search__descriptionText}
											>
												{item.address}
											</Descriptions.Item>
											<Descriptions.Item
												label='Date'
												className={styles.search__descriptionText}
											>
												{item.createdAt.substring(0, 10)}
											</Descriptions.Item>
											<Descriptions.Item
												label='Name'
												className={styles.search__descriptionText}
											>
												{item.categoryName}
											</Descriptions.Item>
										</Descriptions>
									</Col>
								</Row>
							))}
					</div>
				)}
			</div>
			<Pagination
				current={currentPage}
				total={totalPages}
				defaultPageSize={1}
				onChange={handlePageChange}
			/>
		</>
	);
};

export default ListSearchAds;
