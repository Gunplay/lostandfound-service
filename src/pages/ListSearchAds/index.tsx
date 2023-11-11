import {
	EditOutlined,
	EllipsisOutlined,
	SearchOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import {
	Avatar,
	Button,
	Card,
	Col,
	Input,
	Pagination,
	Row,
	Select,
	Spin,
	Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Status } from '../../redux/card/types'
import { fetchFormCategories } from '../../redux/form/asyncActions'
import { fetchAds } from '../../redux/list/asyncAction'
import { setCurrentPage } from '../../redux/list/slice'
import { RootState, useAppDispatch } from '../../redux/store'
import styles from './ListSearchAds.module.scss'
const { Title } = Typography
const { Search } = Input
const { Meta } = Card
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']

const ListSearchAds = () => {
	const categories = useSelector(
		(store: RootState) => store.form.adData.categories
	)
	console.log('categories', categories)
	const [selectedItems, setSelectedItems] = useState<string[]>([])
	const dispatch = useAppDispatch()

	const filteredOptions = categories
		.map(item => item.category)
		.filter(o => !selectedItems.includes(o))

	const {
		foundAds,
		totalPages,
		currentPage,
		word,
		noveltyOrder,
		typeId,
		categoryId,
		address,
		isLoadResults,
		status,
	} = useSelector((store: RootState) => store.list)

	const navigate = useNavigate()
	const location = useLocation()

	const queryParams = new URLSearchParams(location.search)

	const wordQ = queryParams.get('word') || ''
	const page = parseInt(queryParams.get('page') || '1', 10)

	const noveltyOrderQ = queryParams.get('noveltyOrder') || 'desc'

	useEffect(() => {
		// navigate(`/ads/find`);
		dispatch(fetchAds({ page, noveltyOrder })) // Fetch data when the component mounts or when query parameters
		dispatch(fetchFormCategories())
		//dispatch(setTotalPage(totalPages))
	}, [location])

	const handlePageChange = (page: React.SetStateAction<number>) => {
		dispatch(setCurrentPage(page))

		// !TODO
		//  dispatch(fetchAds({ page, noveltyOrder }));
		// navigate(`list/ads/find?word=${wordQ}&page=${page}&noveltyOrder=${noveltyOrderQ}`);
		// URL MUST BE AFTER ? WITH NAVIGATE, WITHOUT http://127.0.0.1:3001/ads/find
		navigate(`/list?word=${wordQ}&page=${page}&noveltyOrder=${noveltyOrderQ}`)
	}

	return (
		<>
			<div className={styles.wrapper}>
				{status === Status.LOADING ? ( // Update this lines
					<Row align='middle'>
						<Col xs={16} sm={16} md={16} lg={6} xl={8}>
							{foundAds.map(spinner => (
								<Spin size='large'></Spin>
							))}
						</Col>
					</Row>
				) : (
					<>
						<div>
							<div className={styles.wrapper__inputPanel}>
								<Row justify='center'>
									<Col xs={16} sm={16} md={16} lg={16} xl={16} flex='auto'>
										<Title>SEARCH ADS</Title>
									</Col>
								</Row>
								<div className={styles.inputPanel__first}>
									<Row justify='space-around'>
										<Col xs={10} sm={6} md={6} lg={6} xl={6} flex='auto'>
											<Search
												size='large'
												placeholder='Search by word...'
												loading={false}
												enterButton
											/>
										</Col>
										<Col xs={4} sm={6} md={6} lg={6} xl={6} flex='auto'>
											<Search
												size='large'
												placeholder='Search by place...'
												loading={false}
												enterButton
											/>
										</Col>
										<Col xs={2} sm={6} md={6} lg={6} xl={6} flex='auto'>
											<Button
												size='large'
												type='primary'
												icon={<SearchOutlined />}
											>
												Search
											</Button>
										</Col>
									</Row>
								</div>

								<Row justify='space-around'>
									<Col xs={2} sm={6} md={6} lg={6} xl={6} flex='auto'>
										<Select
											className={styles.input__typeItem}
											size='large'
											placeholder='Type item'
										/>
									</Col>
									<Col xs={2} sm={12} md={6} lg={6} xl={6} flex='auto'>
										<Select
											className={styles.input__searchCategory}
											size='large'
											// mode='tags'
											placeholder='Category'
											value={selectedItems}
											onChange={setSelectedItems}
											options={filteredOptions.map(item => ({
												value: item,
												label: item,
											}))}
										/>
									</Col>
									<Col xs={2} sm={6} md={6} lg={6} xl={6} flex='auto'>
										<Select
											className={styles.input__SortItem}
											size='large'
											placeholder='Sort items by'
										/>
									</Col>
								</Row>
							</div>
						</div>

						{foundAds &&
							foundAds.map((item: any) => (
								<Row justify='start' key={item['_id']}>
									<Col xs={12} sm={12} md={8} lg={8} xl={8}>
										<Card
											className={styles.search__card}
											cover={<img alt='example' src={item.photo} />}
											hoverable
											actions={[
												<SettingOutlined key='setting' />,
												<EditOutlined key='edit' />,
												<EllipsisOutlined key='ellipsis' />,
											]}
										>
											<Meta
												avatar={<Avatar src={item.photo} />}
												title={item.title}
												description={item.address}
											/>
											<Meta
												title={item.categoryName}
												description={item.createdAt.slice(0, -4)}
											/>
										</Card>
									</Col>
								</Row>
							))}
					</>
				)}
				<Pagination
					current={currentPage}
					total={totalPages}
					defaultPageSize={1}
					onChange={handlePageChange}
				/>
			</div>
		</>
	)
}

export default ListSearchAds
