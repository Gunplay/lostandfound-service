import React from 'react';

import { Form, Input, Select } from 'antd';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { useDispatch, useSelector } from 'react-redux';
import {
	setAdataEmail,
	setAdataFirstName,
	setAdataLastName,
	setAdataPhoneMainUpdate,
	setAdataPhonePrefixUpdate,
} from '../../redux/form/slice';
import { RootState } from '../../redux/store';
import { yupSyncStepThirdStepSchema } from './validatorForm';
const { Option } = Select;

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

const ThirdStepForm: React.FC = () => {
	const dispatch = useDispatch();
	const { firstname, lastname, email, phone } = useSelector(
		(store: RootState) => store.form.adData.user
	);
	const aDataChecked = useSelector(
		(store: RootState) => store.form.adData.checked
	);

	const handlePhoneChange = (
		value: string,
		data: any,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		dispatch(setAdataPhonePrefixUpdate(data.countryCode));
		dispatch(setAdataPhoneMainUpdate(value));
	};
	// const prefixSelector = (
	//     <Form.Item name="prefix" rules={[yupSyncStepThirdStepSchema]} noStyle>
	//         <Select style={{ width: 70 }} onChange={handlePhonePrefixChange}>
	//             <Option value="+380">+380</Option>
	//             <Option value="+360">+360</Option>
	//         </Select>
	//     </Form.Item>
	// );

	return (
		<>
			<Form.Item
				name='firstname'
				label='First Name'
				tooltip='What do you want others to call you?'
				//rules={[{ required: true, message: "Please input your nickname!", whitespace: true }]}
				rules={[yupSyncStepThirdStepSchema]}
			>
				<Input
					value={firstname}
					onChange={e => dispatch(setAdataFirstName(e.target.value))}
				/>
			</Form.Item>

			<Form.Item
				name='lastname'
				rules={[yupSyncStepThirdStepSchema]}
				label='Last Name'
				tooltip='What do you want others to call you?'
				// rules={[{ required: true, message: "Please input your nickname!", whitespace: true }]}
			>
				<Input
					value={lastname}
					onChange={e => dispatch(setAdataLastName(e.target.value))}
				/>
			</Form.Item>

			<Form.Item
				rules={[yupSyncStepThirdStepSchema]}
				name='phone'
				label='Phone Number'
			>
				<PhoneInput
					value={phone}
					inputProps={{
						name: 'phone',
						required: true,
					}}
					preferredCountries={['us', 'ua']}
					onChange={handlePhoneChange}
					containerClass='phone-input-container'
					inputClass='phone-input'
					placeholder='Phone'
					//fluid
				/>
			</Form.Item>
			<Form.Item
				name='email'
				rules={[yupSyncStepThirdStepSchema]}
				label='E-mail'
			>
				<Input
					value={email}
					onChange={e => dispatch(setAdataEmail(e.target.value))}
				/>
			</Form.Item>
		</>
	);
};

export default ThirdStepForm;
