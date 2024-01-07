import { HomeTwoTone } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormLostFound from '../../pages/FormLostFound';
import LeafletMap from '../../pages/LeafletjsMap';
import { RootState } from '../../redux/store';
import styles from './LayoutForForm.module.scss';

const { Title } = Typography;
export const LayoutForForm = () => {
	const {
		checkMap,
		location: { address, lat, lng },
	} = useSelector((store: RootState) => store.form.adData);
	return (
		<div className={styles.wrapper}>
			<div
				className={!checkMap ? styles.wrapper__map : styles.wrapper__mapOnFocus}
			>
				<LeafletMap markerForPath='formPage' />
			</div>
			<div className={styles.form__wrapper}>
				<Row className={styles.btn__home}>
					<Col>
						<Button size='large' icon={<HomeTwoTone />}>
							<Link to='/'>HOME</Link>
						</Button>
					</Col>
				</Row>
				<Row>
					<Typography>
						{checkMap && (
							<>
								<Row>
									<Col>
										<span className={styles.text__spanlanLng}>
											lat: {lat} lng: {lng}
										</span>
									</Col>
								</Row>
								<div className={styles.text__coordinates}>
									<span className={styles.text__span}>
										Your coordinates are:
									</span>
									{address}
								</div>
							</>
						)}
					</Typography>
				</Row>
				<Row>
					<Col>
						<FormLostFound />
					</Col>
				</Row>
			</div>
		</div>
	);
};
