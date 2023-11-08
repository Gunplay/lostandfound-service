import { HomeTwoTone } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import FormLostFound from '../../pages/FormLostFound'
import styles from './LayoutForForm.module.scss'

export const LayoutForForm = () => {
	return (
		<div className={styles.wrapper}>
			<Button size='large' icon={<HomeTwoTone />}>
				<Link to='/'>HOME</Link>
			</Button>
			<FormLostFound />
		</div>
	)
}
