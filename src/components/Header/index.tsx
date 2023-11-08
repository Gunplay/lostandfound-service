import { AppstoreAddOutlined, HomeOutlined } from '@ant-design/icons'
import { Button, Col, Layout, Row, Space, Typography } from 'antd'
import 'antd/dist/antd'
import React from 'react'
import { Link } from 'react-router-dom'
import ButtonSubmit from '../ButtonSubmit'
import ButtonLog from '../ButttonLog'
import SearchItemsInput from '../SearchItemsInput'
import styles from './Header.module.scss'
const { Title } = Typography
//import AccountBtn from './AccountBtn';
//import LogginAccBtn from './LogginAccBtn';
const { Header } = Layout
const headerStyle: React.CSSProperties = {
	background: 'skyblue',

	width: '100%',
	padding: '10px',
	minHeight: '64px',
	paddingBottom: '20px',
}

export const HeaderPanel: React.FC = () => {
	return (
		<Header>
			<Row align='middle'>
				<Col flex='auto'>
					<Space>
						<Link to='/'>
							<Button
								icon={<HomeOutlined />}
								type='link'
								size='middle'
							></Button>
						</Link>
						<ButtonLog />
					</Space>
				</Col>
				<Col flex='auto'>
					<ButtonSubmit />
				</Col>
				<Col flex='auto'>
					<SearchItemsInput />
					<Button
						icon={<AppstoreAddOutlined rotate={5} spin />}
						type='primary'
						danger
						className={styles.buttonCreateAdd}
					>
						CREATE AD
					</Button>
				</Col>
			</Row>
		</Header>
	)
}
