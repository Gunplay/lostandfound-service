import React from 'react'

import { EyeOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import styles from './ButtonViewResentPost.module.scss'
interface ButtonName {
	[key: string]: string
	btn1: string
	btn2: string
	btn3: string
}

const ButtonViewResentPost: React.FC = () => {
	return (
		<Space wrap>
			<a href='#viewrecentitems'>
				<Button
					type='default'
					className={styles.buttonTextSubmit}
					icon={<EyeOutlined />}
				>
					RECENT POSTS
				</Button>
			</a>
		</Space>
	)
}

export default ButtonViewResentPost
