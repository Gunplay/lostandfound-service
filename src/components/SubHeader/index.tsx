import { Button, Col, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import styles from './SubHeader.module.scss'
const { Title } = Typography
export const SubHeader = () => {
	return (
		<>
			<div className={styles.SubHeader}>
				<div className={styles.sub__container}>
					<Row justify='center'>
						<Col>
							<Title level={2} italic type='warning'>
								LOST & FOUND
							</Title>
						</Col>
					</Row>
					<Row align='middle' justify='center'>
						<Col>
							<h1>SEVERAL STEPS TO RETURN OWN THING</h1>
						</Col>
					</Row>
					<Row justify='center'>
						<Col>
							<ul className={styles.sub__backgroundList}>
								<li className='sub__item'>
									ARE YOU LOST OR FOUND YOURSELF THING?
								</li>
								<li className='sub__item'>
									{' '}
									DON'T WORRY! YOU CAN FILL OUR FORM WITH SEVERAL STEPS
								</li>
								<li className='sub__item'>WE CAN HELP YOU!</li>
								<li className='sub__item'>PRESS ON FORM!</li>
							</ul>
						</Col>
					</Row>
					<Row justify='center'>
						<Col>
							<Button
								size='large'
								type='primary'
								style={{ marginBottom: '15px' }}
							>
								{' '}
								<Link to='/formlostandfound'>FILL IN FORM </Link>
							</Button>
						</Col>
					</Row>
				</div>
			</div>
		</>
	)
}
