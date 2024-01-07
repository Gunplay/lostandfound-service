import { HomeOutlined } from '@ant-design/icons';
import { Button, Col, Layout, Row, Typography } from 'antd';
import 'antd/dist/antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ButtonViewResentPost from '../ButtonViewResentPost';
import ButtonLog from '../ButttonLog';
import styles from './Header.module.scss';
const { Title } = Typography;
//import AccountBtn from './AccountBtn';
//import LogginAccBtn from './LogginAccBtn';
const { Header } = Layout;

export const HeaderPanel: React.FC = () => {
	const location = useLocation();

	return (
		<Header
			className={
				location.pathname === '/ad'
					? styles.wrapper__singlePage
					: styles.wrapper
			}
		>
			<Row justify='center' align='middle'>
				<Col xl={6} md={8} sm={12} xs={24}>
					<Title level={1} type='secondary' style={{ color: 'white' }}>
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
					<ButtonViewResentPost />
				</Col>
			</Row>
		</Header>
	);
};
