import { Col, Row, Typography } from 'antd'
import React from 'react'

import styles from './MainManualLostAndFound.module.scss'
const { Title, Paragraph, Text, Link } = Typography

export const MainManualLostAndFound: React.FC = () => {
	const textList = [
		'Enter lost or found item details (e.g., item lost or found, category, photos, date, time, etc',
		'Review details entered and submit the lost or found item report.',
		'Receive an email with your user dashboard login and account information.',
		'Within the dashboard you can print fliers of the submitted lost or found item.',
		'Receive notifications when newly submitted items match the details on your entry.',
	]

	return (
		<div className={styles.wrapper}>
			<div className={styles.main__manual}>
				<Typography>
					<Row justify='center'>
						<Col>
							<Title>Online Lost and Found</Title>
						</Col>
					</Row>
					<Row justify='center'>
						<Col xs={16} sm={16} md={20} lg={20} xl={22}>
							<Paragraph className={styles.main__manualText}>
								Lostings Online Lost and Found is a unique platform that
								incorporates a dynamic lost and found matching system for
								individual users, accompanied by a Lost and Found Inventory
								Management Software for businesses. Our approach is unique
								compared to traditional lost and found methods, however, the
								intention is still to reunite items lost or found with their
								respective owners.
							</Paragraph>
						</Col>
					</Row>
					<Row justify='center'>
						<Col xs={18} sm={18} md={20} lg={20} xl={22}>
							<Paragraph className={styles.main__manualText}>
								The multi-level lost and found platform for individual users
								allows them to easily view, report, describe, and categorize
								lost or found items. Additionally users can add location
								information, upload photos, provide more in-depth details, and
								print fliers for local awareness. The matching system gives
								users the ability to receive up-to-date email notifications and
								system alerts of matching or similar lost or found items. The
								system works with individuals reporting lost or found items,
								along with businesses registered to use the lost and found
								inventory management software.
								<Text strong>
									along with businesses registered to use the lost and found
									inventory management software.
								</Text>
							</Paragraph>
						</Col>
					</Row>

					<Row justify='center'>
						<Col xs={18} sm={18} md={20} lg={20} xl={22}>
							<Paragraph className={styles.main__manualText}>
								"Our goal is to provide individual users and businesses with the
								tools necessary for an effective and efficient online lost and
								found."
							</Paragraph>
						</Col>
					</Row>

					<Row justify='center'>
						<Col>
							<Title level={2}>Step-By-Step Process</Title>
						</Col>
					</Row>
					<Row justify='center'>
						<Col>
							<Paragraph code={false} className={styles.main__manualText}>
								<ul>
									{textList.map(text => (
										<li key={text}>{text}</li>
									))}
								</ul>
							</Paragraph>
						</Col>
					</Row>
				</Typography>
			</div>
		</div>
	)
}
