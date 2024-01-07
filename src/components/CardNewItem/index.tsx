import { Card, Col, Row, Space, Typography } from 'antd';

import { CalendarOutlined } from '@ant-design/icons';
import styles from './CardNewItem.module.scss';
const { Text, Link } = Typography;

const { Meta } = Card;

interface CardData<S, N> {
	address: S;
	categoryName: S;
	createdAt: S;
	photo: S;
	title: S;
	typeId: N;
	_id: S;
}

interface CardProps {
	checked: boolean;
	cardInfo: CardData<string, number>;
}

const CardNewItem: React.FC<CardProps> = ({ checked, cardInfo }) => {
	const { address, categoryName, createdAt, photo, title, typeId, _id } =
		cardInfo;

	return (
		<Row gutter={[16, 16]} justify='center'>
			<Col xs={24} sm={24} md={24} lg={24} xl={24}>
				<Card
					className={styles.card}
					hoverable
					size='default'
					cover={<img alt='example' src={photo} className={styles.card__img} />}
				>
					<Space direction='vertical' size='middle'>
						<Meta
							title={title}
							description={typeId === 1 ? 'Type Lost' : 'Type Found'}
						/>

						{checked && (
							<>
								<Text
									style={{
										wordWrap: 'break-word',
										height: '63px',
										display: 'flex',
										alignItems: 'center',
									}}
									type='success'
								>
									<span>{address}</span>
								</Text>

								{/* <Divider /> */}
								<Row justify='center' align='middle'>
									<Col>
										<CalendarOutlined
											className={styles.card__iconCalendar}
											style={{
												fontSize: '1.3em',
												marginRight: 6,
											}}
										/>
										<Text strong>{createdAt.substring(0, 10)}</Text>
									</Col>
								</Row>
								<Row justify='center' align='middle'>
									<Col>
										<Text color='red'>{categoryName}</Text>
									</Col>
								</Row>
							</>
						)}
					</Space>
				</Card>
			</Col>
		</Row>
	);
};

export default CardNewItem;
