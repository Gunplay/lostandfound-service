import { Button, DatePicker, Form, Input, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpLoadImage } from '../../components';
import {
	setAdataDataLostOrFound,
	setAdataDescription,
	setCheckMap,
} from '../../redux/form/slice';
import { RootState } from '../../redux/store';

import { yupSyncStepSecond } from './validatorForm';

const { TextArea } = Input;

const SecondStepFrom: React.FC = () => {
	const dispatch = useDispatch();
	const { checkMap, location } = useSelector(
		(store: RootState) => store.form.adData
	);
	const selectedAddress = location.address;
	const {
		description,
		lostOrFoundAt,
		typeId,
		location: { address },
	} = useSelector((store: RootState) => store.form.adData);

	const dateValue: Dayjs | undefined = lostOrFoundAt
		? dayjs(lostOrFoundAt)
		: undefined;

	const onHandleDatePicker = (date: Dayjs | null) => {
		if (date) {
			dispatch(setAdataDataLostOrFound(date.toISOString()));
		}
	};

	return (
		<>
			{!checkMap && (
				<>
					<Form.Item
						name='description'
						label='Description'
						rules={[yupSyncStepSecond]}
					>
						<TextArea
							style={{ resize: 'none' }}
							showCount
							maxLength={200}
							value={description}
							onChange={e => dispatch(setAdataDescription(e.target.value))}
							placeholder={
								typeId === 1
									? 'Tell us more about your LOST...'
									: 'Tell us more about your FOUND...'
							}
						/>
					</Form.Item>

					<Form.Item
						name='photos'
						rules={[]}
						label={
							typeId === 2
								? 'Choose photos of your found:'
								: 'Choose photos of your lost:'
						}
					>
						<UpLoadImage />
					</Form.Item>

					<Tooltip title='Choose it on the map above and change it if it is not correct:'>
						<Form.Item
							name='place'
							label={
								typeId === 1
									? 'Place where it was lost:'
									: 'Place where it was found:'
							}
						>
							<Button
								onClick={() => {
									dispatch(setCheckMap(checkMap));
								}}
							>
								Go To the Map
							</Button>
							<div>
								{selectedAddress && `${selectedAddress.substring(0, 20)} . . .`}
							</div>
						</Form.Item>
					</Tooltip>

					<Form.Item
						name='date'
						rules={[yupSyncStepSecond]}
						label={
							typeId === 1
								? 'Date when it was lost:'
								: 'Date when it was found:'
						}
					>
						<DatePicker value={dateValue} onChange={onHandleDatePicker} />
					</Form.Item>
				</>
			)}
		</>
	);
};

export default SecondStepFrom;
