import { FacebookFilled, InstagramFilled } from '@ant-design/icons'
import { Button, Col, Row, Space, Typography } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import styles from './FooterPanel.module.scss'
const { Title, Paragraph, Text } = Typography
// const leftColStyle: React.CSSProperties = {
//     display: "flex",
//     justifyContent: "start",
//     alignItems: "flex-start",
//     color: "black",
//     fontSize: "50px",
// };

const rightColStyle: React.CSSProperties = {
	display: 'flex',
	//flexDirection: "column",
	justifyContent: 'end',
	alignItems: 'flex-end',
	color: 'black',
}

export const FooterPanel: React.FC = () => {
	return (
		<Footer className='footerColor'>
			<Row justify='start' wrap align='middle'>
				{/* <Space align="baseline" direction="horizontal" size="large"> */}
				<Button type='text' size='large'>
					Missing{' '}
				</Button>

				<Button type='text' size='large'>
					Finds
				</Button>

				<Button type='text' size='large'>
					Register ADD
				</Button>
				<Button type='text' size='large'>
					LOGIN
				</Button>
				<Button type='text' size='large'>
					SING UP
				</Button>
				{/* </Space> */}
			</Row>
			<Row>
				<Col xs={24} md={24} lg={24} xl={32} flex='auto'>
					<div className={styles.footer__logo}>LOST & FOUND</div>
				</Col>
			</Row>
			{/* <Col xs = {4} sm = {16} md = {16} lg = {16} xl = {32}></Col>
            <Col xs = {4} sm = {16} md = {16} lg = {16} xl = {32}></Col> */}
			<Col></Col>
			<Row wrap justify='end'>
				<Space align='baseline' direction='horizontal' size='large'>
					{/* <Col xs={6} sm={6} md={18} lg={24} xl={32} flex="auto"> */}
					<Button icon={<InstagramFilled spin={false} />} size='large'></Button>
					<Button icon={<FacebookFilled spin={false} />} size='large'></Button>
					{/* </Col> */}
				</Space>
			</Row>
			<br />
			<Row justify='end' wrap align='middle' className={styles.footer__address}>
				<Col>
					{/* <Space align='baseline' direction='horizontal' size='large'> */}
					<Text className={styles.footer__textAddress}>
						Thefinds4seekers@gmail.com
					</Text>
					<Text className={styles.footer__textAddress}>
						2027 TheFinds4Seekers, Inc. All rights reserved.
					</Text>
					{/* </Space> */}
				</Col>
			</Row>
		</Footer>
	)
}
