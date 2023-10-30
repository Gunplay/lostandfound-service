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
	Space,
	Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Status } from '../../redux/card/types'
import { fetchAds } from '../../redux/list/asyncAction'
import { setCurrentPage } from '../../redux/list/slice'
import { RootState, useAppDispatch } from '../../redux/store'
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
	const location = useLocation()

	const queryParams = new URLSearchParams(location.search)

	const wordQ = queryParams.get('word') || ''
	const page = parseInt(queryParams.get('page') || '1', 10)

	const noveltyOrderQ = queryParams.get('noveltyOrder') || 'desc'

	useEffect(() => {
		// navigate(`/ads/find`);
		dispatch(fetchAds({ page, noveltyOrder })) // Fetch data when the component mounts or when query parameters
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
			{status === Status.LOADING ? ( // Update this lines
				<Row align='middle'>
					{/* <Col xl={24} md={24} sm={24} xs={24} key={spinner}>
						{foundAds.map(spinner => (
							<Spin size='large'></Spin>
						))}
					</Col> */}
				</Row>
			) : (
				<>
					<div>
						<Row justify='center'>
							<Col>
								<Title style={{ backgroundColor: 'ButtonHighlight' }}>
									SEARCH ADS
								</Title>
							</Col>
						</Row>
						<Row justify='center'>
							<Space size='large'>
								<Col>
									<Search
										size='large'
										placeholder='Search by word...'
										loading={false}
										enterButton
									/>
								</Col>
								<Col>
									<Search
										size='large'
										placeholder='Search by place...'
										loading={false}
										enterButton
									/>
								</Col>
								<Col>
									<Button size='large' icon={<SearchOutlined />}>
										Search
									</Button>
								</Col>
							</Space>
						</Row>
						<Row justify='center'>
							<Space size='large'>
								<Col>
									<Select
										size='large'
										style={{ width: 150 }}
										placeholder='Type item'
									/>
								</Col>
								<Col>
									<Select
										mode='multiple'
										placeholder='Category'
										value={selectedItems}
										onChange={setSelectedItems}
										style={{ width: 300 }}
										options={filteredOptions.map(item => ({
											value: item,
											label: item,
										}))}
									/>
								</Col>
								<Col>
									<Select
										size='large'
										style={{ width: 150 }}
										placeholder='Sort items by'
									/>
								</Col>
							</Space>
						</Row>
					</div>

					{foundAds &&
						foundAds.map((item: any) => (
							<Row justify='center' key={item['_id']}>
								<Col xl={16} md={16} sm={16} xs={24}>
									<Card
										style={{ width: 300 }}
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
		</>
	)
}

export default ListSearchAds
