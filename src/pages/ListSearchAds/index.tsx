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

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Status } from '../../redux/card/types'
import { fetchFormCategories } from '../../redux/form/asyncActions'
import { fetchAds } from '../../redux/list/asyncAction'
import { setCurrentPage, setTypeIdQ, setWorQ } from '../../redux/list/slice'
import { RootState, useAppDispatch } from '../../redux/store'
import styles from './ListSearchAds.module.scss'
const { Option } = Select
const { Title } = Typography
const { Search } = Input
const { Meta } = Card
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']

const ListSearchAds = () => {
	const categories = useSelector(
		(store: RootState) => store.form.adData.categories
	)

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
	console.log('typeId', typeId)
	const location = useLocation()

	const queryParams = new URLSearchParams(location.search)
	console.log('queryParams', queryParams.get('word'))
	const wordQ = queryParams.get('word') || ''
	const page = parseInt(queryParams.get('page') || '1', 10)

	const noveltyOrderQ = queryParams.get('noveltyOrder') || 'desc'
	const typeIdQ = parseInt(queryParams.get('typeId') || '1', 10)
	useEffect(() => {
		// navigate(`/ads/find`);
		dispatch(fetchAds({ wordQ, page, noveltyOrder, typeIdQ })) // Fetch data when the component mounts or when query parameters
		dispatch(fetchFormCategories())
		//dispatch(setTotalPage(totalPages))
	}, [location])

	const handleNavigate = (
		newPage: number,
		newWordQ: string,
		newTypeIdQ: any
	) => {
		dispatch(setCurrentPage(newPage))
		dispatch(setWorQ(newWordQ))
		dispatch(setTypeIdQ(newTypeIdQ)) // Используйте setTypeIdQ вместо второго setWorQ
		navigate(
			`/list?word=${newWordQ}&page=${newPage}&noveltyOrder=${noveltyOrderQ}&typeId=${newTypeIdQ}`
		)
	}

	const handleChangeWord = (wordQ: string) => {
		handleNavigate(page, wordQ, typeIdQ)
	}

	const handlePageChange = (newPage: any) => {
		handleNavigate(newPage, wordQ, typeIdQ)
	}

	const handleTypeIdChange = (newTypeId: string | number | null) => {
		const typeIdValue =
			newTypeId !== null
				? newTypeId === 'FOUND'
					? '1'
					: newTypeId === 'LOST'
					? '2'
					: null
				: null
		handleNavigate(page, wordQ, typeIdValue)
	}
	// !TODO
	//  dispatch(fetchAds({ page, noveltyOrder }));
	// navigate(`list/ads/find?word=${wordQ}&page=${page}&noveltyOrder=${noveltyOrderQ}`);
	// URL MUST BE AFTER ? WITH NAVIGATE, WITHOUT http://127.0.0.1:3001/ads/find
	return (
		<>
			<div className={styles.wrapper}>
				{status === Status.LOADING ? ( // Update this lines
					<Row align='middle'>
						<Col xs={16} sm={16} md={16} lg={16} xl={16}>
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
												//enterButton
												value={word}
												onChange={e => dispatch(setWorQ(e.target.value))}
												onSearch={handleChangeWord}
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
											className={styles.input__All}
											size='large'
											placeholder='Type item'
											value={typeId}
											onChange={value => handleTypeIdChange(value)}
										>
											<Option value='FOUND'>Found</Option>
											<Option value='LOST'>Lost</Option>
										</Select>
									</Col>
									<Col xs={2} sm={12} md={6} lg={6} xl={6} flex='auto'>
										<Select
											className={styles.input__All}
											size='large'
											// mode='tags'
											placeholder='Category'
											value={selectedItems}
											onChange={setSelectedItems}
											options={filteredOptions.map(item => ({
												value: item,
												label: item,
											}))}
										></Select>
									</Col>
									<Col xs={2} sm={6} md={6} lg={6} xl={6} flex='auto'>
										<Select
											className={styles.input__All}
											size='large'
											placeholder='Sort items by'
										/>
									</Col>
								</Row>
							</div>
						</div>

						{foundAds &&
							foundAds.map((item: any) => (
								<Row justify='space-around' key={item['_id']}>
									<Col xs={6} sm={6} md={8} lg={6} xl={6}>
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
