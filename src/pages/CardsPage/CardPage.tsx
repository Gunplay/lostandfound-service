import { useEffect, useState } from 'react'

import { Button, Col, Row, Space, Switch, Typography } from 'antd'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Link as LinkRout } from 'react-router-dom'
import CardNewItem from '../../components/CardNewItem'
import { fetchCards } from '../../redux/card/asyncActions'
import { selectCardData } from '../../redux/card/selectors'
import { RootState, useAppDispatch } from '../../redux/store'
import styles from './CardsPage.module.scss'
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
		<div ref={move} id={styles.wrapper}>
			<Space size='middle'>
				<h1 style={{ color: 'black' }}>RECENTLY LOST THINGS</h1>
				<Switch checked={switcher} onChange={onChange}></Switch>
				<Text type='success'>Open more information</Text>
			</Space>

			<Row gutter={[0, 32]}>
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
				<LinkRout to='/list' className='show-more-link'>
					SHOW MORE
				</LinkRout>
			</Row>
		</div>
	)
}
