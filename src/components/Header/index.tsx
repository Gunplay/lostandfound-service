import { HomeOutlined } from '@ant-design/icons'
import { Button, Col, Layout, Row, Typography } from 'antd'
import 'antd/dist/antd'
import React from 'react'
import { Link } from 'react-router-dom'
import ButtonSubmit from '../ButtonSubmit'
import ButtonLog from '../ButttonLog'
import styles from './Header.module.scss'
const { Title } = Typography
//import AccountBtn from './AccountBtn';
//import LogginAccBtn from './LogginAccBtn';
const { Header } = Layout

export const HeaderPanel: React.FC = () => {
	return (
		<Header className={styles.wrapper}>
			<Row justify='center' align='middle'>
				<Col xl={6} md={8} sm={12} xs={24}>
					<Title level={1} type='secondary'>
						IRADAR
					</Title>
				</Col>
				<Col xl={6} md={8} sm={24} xs={24} flex='auto'>
					<Link to='/'>
						<Button icon={<HomeOutlined />} type='link' size='middle'></Button>
					</Link>
					<ButtonLog />
				</Col>
				<Col xl={6} md={8} sm={24} xs={24} flex='auto'>
					<ButtonSubmit />
				</Col>
			</Row>
		</Header>
	)
}
