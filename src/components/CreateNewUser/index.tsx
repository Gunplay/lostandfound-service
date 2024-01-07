import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { setІsLoginAuthModalMode } from '../../redux/register/slice';
import { RootState, useAppDispatch } from '../../redux/store';

const { Option } = Select;

interface DataNodeType {
	value: string;
	label: string;
	children?: DataNodeType[];
}

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

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

export const CreateNewUser: React.FC = () => {
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
	};
	const { isLoginAuthModalMode } = useSelector(
		(store: RootState) => store.register
	);
	const [clientReady, setClientReady] = useState<boolean>(false);
	// const [changeForm, setChangeForm] = useState(false);

	function handleChangeForm() {
		dispatch(setІsLoginAuthModalMode(isLoginAuthModalMode));
	}
	const prefixSelector = (
		<Form.Item name='prefix' noStyle>
			<Select style={{ width: 70 }}>
				<Option value='86'>+86</Option>
				<Option value='87'>+87</Option>
			</Select>
		</Form.Item>
	);

	const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

	const onWebsiteChange = (value: string) => {
		if (!value) {
			setAutoCompleteResult([]);
		} else {
			setAutoCompleteResult(
				['.com', '.org', '.net'].map(domain => `${value}${domain}`)
			);
		}
	};

	const websiteOptions = autoCompleteResult.map(website => ({
		label: website,
		value: website,
	}));

	return (
		<Form
			{...formItemLayout}
			form={form}
			name='register'
			onFinish={onFinish}
			initialValues={{
				residence: ['zhejiang', 'hangzhou', 'xihu'],
				prefix: '86',
			}}
			style={{ maxWidth: 600 }}
			scrollToFirstError
		>
			<Form.Item
				name='email'
				label='E-mail'
				rules={[
					{
						type: 'email',
						message: 'The input is not valid E-mail!',
					},
					{
						required: true,
						message: 'Please input your E-mail!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name='password'
				label='Password'
				rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name='confirm'
				label='Confirm Password'
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Please confirm your password!',
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error('The new password that you entered do not match!')
							);
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				name='fisrtName'
				label='fisrtName'
				tooltip='What do you want others to call you?'
				rules={[
					{
						required: true,
						message: 'Please input your nickname!',
						whitespace: true,
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name='lastName'
				label='lastName'
				tooltip='What do you want others to call you?'
				rules={[
					{
						required: true,
						message: 'Please input your nickname!',
						whitespace: true,
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name='phone'
				label='Phone Number'
				rules={[{ required: true, message: 'Please input your phone number!' }]}
			>
				<Input addonBefore={prefixSelector} style={{ width: '100%' }} />
			</Form.Item>
			<Row justify='center' gutter={16}>
				<Col>
					<Form.Item shouldUpdate>
						{() => (
							<Button
								type='primary'
								htmlType='submit'
								// disabled={
								// 	!clientReady ||
								// 	!form.isFieldsTouched(true) ||
								// 	!!form.getFieldsError().filter(({ errors }) => errors.length)
								// 		.length
								// }
							>
								Create an account
							</Button>
						)}
					</Form.Item>
				</Col>
				<Col>
					<Form.Item shouldUpdate>
						{() => (
							<Button
								type='default'
								htmlType='submit'
								onClick={handleChangeForm}
								// disabled={
								//   !clientReady ||
								//   !form.isFieldsTouched(true) ||
								//   !!form.getFieldsError().filter(({ errors }) => errors.length)
								//     .length
								// }
							>
								Already have an account? Log-in
							</Button>
						)}
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};
function dispatch(arg0: {
	payload: any;
	type: 'register/setІsLoginAuthModalMode';
}) {
	throw new Error('Function not implemented.');
}
