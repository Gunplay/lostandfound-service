import { Button, Col, Input, Row, Select, Space, Typography } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
	AD_FOUND_TYPE_ID,
	AD_LOST_TYPE_ID,
} from '../../pages/FormLostFound/ChooseTypeAd'
import { fetchAds } from '../../redux/list/asyncAction'
import {
	setAddress,
	setCategoryId,
	setCurrentPage,
	setNoveltyOrder,
	setTypeId,
	setWorQ,
} from '../../redux/list/slice'
import { RootState, useAppDispatch } from '../../redux/store'

import { CloseCircleOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router'
import { fetchFormCategories } from '../../redux/form/asyncActions'
import styles from './SearchPanel.module.scss'
const { Option } = Select
const { Title } = Typography
const { Search } = Input

export const SearchPanel = () => {
	const dispatch = useAppDispatch()
	const categories = useSelector(
		(store: RootState) => store.form.adData.categories
	)
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
	} = useSelector((store: RootState) => store.list)

	const navigate = useNavigate()

	const location = useLocation()

	const queryParams = new URLSearchParams(location.search)

	const wordQ = queryParams.get('word') || ''
	const page = parseInt(queryParams.get('page') || '1', 10)

	const noveltyOrderQ = queryParams.get('noveltyOrder') || 'desc'
	const typeIdQ = parseInt(queryParams.get('typeId') || '1', 10)

	const categoryIdQ = queryParams.get('categoryId') || ''
	const addressQ = queryParams.get('address') || ''

	useEffect(() => {
		// navigate(`/ads/find`);
		dispatch(
			fetchAds({ wordQ, page, noveltyOrderQ, addressQ, typeId, categoryIdQ })
		) // Fetch data when the component mounts or when query parameters
		dispatch(fetchFormCategories())
		//dispatch(setTotalPage(totalPages))
	}, [dispatch, wordQ, page, noveltyOrderQ, addressQ, typeId, categoryIdQ])

	const handleNavigate = (
		newPage: number,
		newWordQ: string,
		newTypeIdQ: number,
		newCategoryIdQ: any,
		newNoveltyOrder: string,
		newAddressQ: string
	) => {
		dispatch(setCurrentPage(newPage))
		dispatch(setWorQ(newWordQ))
		dispatch(setTypeId(newTypeIdQ))
		// newTypeIdQ === 1
		// 	? dispatch(setTypeIdQ(AD_LOST_TYPE_ID))
		// 	: dispatch(setTypeIdQ(AD_FOUND_TYPE_ID))

		dispatch(setCategoryId(newCategoryIdQ))
		dispatch(setNoveltyOrder(newNoveltyOrder))
		dispatch(setAddress(newAddressQ))
		navigate(
			`/list?word=${newWordQ}&page=${newPage}&noveltyOrder=${newNoveltyOrder}&address=${newAddressQ}&typeId=${newTypeIdQ}&categoryId=${newCategoryIdQ}`
		)
	}
	const handleChangeWord = (wordQ: string) => {
		handleNavigate(page, wordQ, typeIdQ, [categoryIdQ], noveltyOrder, addressQ)
	}

	const handleTypeToggle = () => {
		let newTypeIdQ = typeIdQ === 1 ? AD_FOUND_TYPE_ID : AD_LOST_TYPE_ID
		handleNavigate(
			page,
			wordQ,
			newTypeIdQ,
			[categoryIdQ],
			noveltyOrder,
			addressQ
		)
	}

	const handleCategoryIdChange = (categoryId: string) => {
		handleNavigate(page, wordQ, typeIdQ, categoryId, noveltyOrder, addressQ)
	}

	const handleSortByDescOrAsc = (noveltyOrder: string) => {
		handleNavigate(page, wordQ, typeIdQ, [categoryIdQ], noveltyOrder, addressQ)
	}

	const handleAddress = (addressQ: string) => {
		handleNavigate(page, wordQ, typeIdQ, [categoryIdQ], noveltyOrder, addressQ)
	}
	const handleClearState = () => {
		dispatch(setWorQ(''))
		dispatch(setTypeId(AD_LOST_TYPE_ID))
		dispatch(setCategoryId(''))
		dispatch(setNoveltyOrder('desc'))
		dispatch(setAddress(''))
		navigate('/list') // Redirect to the list without query parameters
	}
	return (
		<div className={styles.wrapper__inputPanel}>
			<Row justify='center'>
				<Col xs={24} sm={24} md={24} lg={24} xl={24}>
					<Title level={2}>SEARCH ADS</Title>
				</Col>
			</Row>

			<Space
				direction='vertical'
				size='large'
				style={{ width: '100%', textAlign: 'center' }}
			>
				<Row gutter={[16, 16]} justify='center'>
					<Col xs={24} sm={24} md={12} lg={8} xl={8}>
						<Search
							size='large'
							placeholder='Search by word...'
							value={word}
							onChange={e => dispatch(setWorQ(e.target.value))}
							onSearch={handleChangeWord}
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={8} xl={8}>
						<Search
							size='large'
							placeholder='Search by place...'
							enterButton
							value={address}
							onChange={e => dispatch(setAddress(e.target.value))}
							onSearch={handleAddress}
						/>
					</Col>
				</Row>

				<Row gutter={[16, 16]} justify='center'>
					<Col>
						<Select
							className={styles.input__All}
							size='large'
							placeholder='Type item'
							value={typeId === 1 ? 'LOST' : 'FOUND'}
							onChange={handleTypeToggle}
							onSearch={handleTypeToggle}
						>
							<Option value='LOST'>LOST</Option>
							<Option value='FOUND'>FOUND</Option>
						</Select>
					</Col>
					<Col>
						<Select
							className={styles.input__All}
							size='large'
							placeholder='Category'
							onChange={(selectedValue: string) => {
								handleCategoryIdChange(selectedValue)
							}}
							options={categories.map(item => ({
								label: item.category,
								value: item['_id'],
							}))}
						/>
					</Col>
					<Col>
						<Select
							className={styles.input__All}
							size='large'
							value={noveltyOrder}
							options={[
								{ label: 'Sort by: From new to old', value: 'desc' },
								{ label: 'Sort by: From old to new', value: 'asc' },
							]}
							onChange={(selectedValue: string) => {
								handleSortByDescOrAsc(selectedValue)
							}}
						/>
					</Col>
				</Row>
				<Row justify='end'>
					<Col xs={4} sm={4} md={4} lg={4} xl={4}>
						<Button
							danger
							type='primary'
							icon={<CloseCircleOutlined />}
							onClick={handleClearState}
							// style={{ color: 'red' }}
						>
							CLEAR SEARCH
						</Button>
					</Col>
				</Row>
			</Space>
		</div>
	)
}
function dispatch(arg0: any) {
	throw new Error('Function not implemented.')
}
