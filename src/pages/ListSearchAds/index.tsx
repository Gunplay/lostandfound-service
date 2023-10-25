import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import { Avatar, Card, Col, Input, Pagination, Row, Spin } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Status } from '../../redux/card/types'
import { fetchAds } from '../../redux/list/asyncAction'
import { setCurrentPage } from '../../redux/list/slice'
import { RootState, useAppDispatch } from '../../redux/store'
const { Search } = Input
const { Meta } = Card

const ListSearchAds = () => {
	console.log('useParams', useParams())
	const dispatch = useAppDispatch()
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
	// const totalPagesNew = totalPages + 20
	console.log('totalPages', totalPages)
	// data
	// {foundAds: Array(3), totalPages: 3}
	// foundAds
	// :
	// (3) [{…}, {…}, {…}]
	// totalPages
	// :
	// 3

	// const totalPagesValue = Object.keys(foundAds).map(item => {
	// 	return item.
	// })
	// 	{foundAds: Array(3), totalPages: 3}
	// foundAds: (3) [{…}, {…}, {…}]
	// totalPages: 3

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
					<Col xl={24} md={24} sm={24} xs={24}>
						{foundAds.map(spinner => (
							<Spin size='large'></Spin>
						))}
					</Col>
				</Row>
			) : (
				<>
					<Row gutter={[0, 32]}>
						{foundAds &&
							foundAds.map((item: any) => (
								<Col key={item['_id']} xl={16} md={16} sm={16} xs={24}>
									<Row justify='space-around'>
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
									</Row>
								</Col>
							))}
					</Row>
				</>
			)}
			<Pagination
				current={currentPage}
				total={totalPages}
				defaultPageSize={totalPages}
				onChange={handlePageChange}
			/>
		</>
	)
}

export default ListSearchAds
