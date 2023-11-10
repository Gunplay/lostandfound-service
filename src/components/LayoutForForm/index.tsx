import { HomeTwoTone } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import FormLostFound from '../../pages/FormLostFound'
import styles from './LayoutForForm.module.scss'

export const LayoutForForm = () => {
	return (
		<div className={styles.wrapper}>
			<Row justify='center' className={styles.btn__home}>
				<Col>
					<Button size='large' icon={<HomeTwoTone />}>
						<Link to='/'>HOME</Link>
					</Button>
				</Col>
			</Row>
			<Row justify='center'>
				<Col>
					<FormLostFound />
				</Col>
			</Row>
		</div>
	)
}
