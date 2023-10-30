import { useEffect, useState } from 'react'

import { Button, Col, Row, Space, Switch, Typography } from 'antd'
import CardNewItem from '../../components/CardNewItem'

import { useSelector } from 'react-redux/es/hooks/useSelector'
import { fetchCards } from '../../redux/card/asyncActions'
import { selectCardData } from '../../redux/card/selectors'
import { RootState, useAppDispatch } from '../../redux/store'

const { Text, Link } = Typography

interface CardsPageProps {
	move?: React.MutableRefObject<HTMLDivElement | null>
}

export const CardsPage: React.FC<CardsPageProps> = ({ move }) => {
	const dispatch = useAppDispatch()
	const { items, status } = useSelector(selectCardData)
	const currentPageStart = useSelector(
		(store: RootState) => store.list.currentPage
	)

	const [switcher, setSwitcher] = useState(false)
	const [showMore, setShowMore] = useState(false)
	const [listSearchAds, setListSearchAds] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const cardsPerPage = 6

	const onChange = (checked: boolean) => {
		setSwitcher(checked)
	}

	useEffect(() => {
		dispatch(fetchCards())
	}, [])

	const onChangeComponent = () => {
		setShowMore(true)
	}

	const indexOfLastCard = currentPage * cardsPerPage

	const indexOfFirstCard = indexOfLastCard - cardsPerPage

	const currentCards = items?.slice(indexOfFirstCard, indexOfLastCard)

	return (
		<div ref={move} id='viewrecentitems'>
			<Space size='middle'>
				<h1 style={{ color: 'black' }}>RECENTLY LOST THINGS</h1>
				<Switch checked={switcher} onChange={onChange}></Switch>
				<Text type='success'>Open more information</Text>
			</Space>

			<Row gutter={[0, 32]}>
				<Col span={24} />
				<Col span={24}></Col>
				<Col></Col>
				{/* <Card
					style={{ width: 300 }}
					cover={
						<img
							alt='example'
							src='https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg'
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
						// avatar={<Avatar } />}
						title='DOG'
						description='LOST MY PET'
					/>
					<Meta title='DOG' description='LOST MY PET' />
				</Card>
				<Card
					style={{ width: 300 }}
					cover={
						<img
							alt='example'
							src='https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg'
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
						// avatar={<Avatar } />}
						title='DOG'
						description='LOST MY PET'
					/>
					<Meta title='DOG' description='LOST MY PET' />
				</Card>
				<Card
					style={{ width: 300 }}
					cover={
						<img
							alt='example'
							src='https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg'
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
						// avatar={<Avatar } />}
						title='DOG'
						description='LOST MY PET'
					/>
					<Meta title='DOG' description='LOST MY PET' />
				</Card>
				<Card
					style={{ width: 300 }}
					cover={
						<img
							alt='example'
							src='https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg'
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
						// avatar={<Avatar } />}
						title='DOG'
						description='LOST MY PET'
					/>
					<Meta title='DOG' description='LOST MY PET' />
				</Card> */}
				{currentCards?.map(item => (
					<Col key={item['_id']} xl={6} md={8} sm={12} xs={24}>
						<Space>
							<Row justify='center'>
								<Row>
									<Col>
										{' '}
										<Button type='link'>Alert Owner</Button>
									</Col>
									<Col>
										{' '}
										<Button type='link'>View lost thing</Button>
									</Col>
								</Row>
								<CardNewItem checked={switcher} cardInfo={item} />
							</Row>
						</Space>
					</Col>
				))}
				<Col span={24} />
			</Row>
		</div>
	)
}
