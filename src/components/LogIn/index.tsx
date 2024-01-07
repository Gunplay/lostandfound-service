import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
	logOut,
	login,
	setІsLoginAuthModalMode,
} from '../../redux/register/slice';
import { RootState, useAppDispatch } from '../../redux/store';
import API from '../../utils/API';
import { toastSuccess } from '../../utils/toastrConfig';

interface LoginData {
	email: string;
	password: string;
}

export const LogIn: React.FC = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState<LoginData>({
		email: '',
		password: '',
	});
	const { userData, token, isLoginAuthModalMode } = useSelector(
		(store: RootState) => store.register
	);
	console.log('isLoginAuthModalMode', isLoginAuthModalMode);
	const dispatch = useAppDispatch();
	const [clientReady, setClientReady] = useState<boolean>(false);

	useEffect(() => {
		setClientReady(true);
	}, []);

	const handleChangeForm = () => {
		dispatch(setІsLoginAuthModalMode(isLoginAuthModalMode));
	};
	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setLoginData(prevLoginData => ({
			...prevLoginData,
			[name]: value,
		}));
	};

	const onSubmitLogin = async () => {
		const { email, password } = loginData;

		try {
			const response = await API.post('/auth/login', { email, password });
			dispatch(login({ user: response.data.user, token: response.data.token }));
			await toastSuccess('You have been successfully logged in');
			console.log('Login successful:', response.data);
			navigate('/account');
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	const onLogOut = () => {
		setLoginData({ email: '', password: '' });
		dispatch(logOut(null));
	};
	return (
		<Row justify='center' align='middle'>
			<Col xs={24} sm={16} md={12} lg={12} xl={12}>
				<Form
					form={form}
					name='horizontal_login'
					layout='vertical'
					onFinish={onSubmitLogin}
				>
					<Form.Item
						rules={[{ required: true, message: 'Please input your email!' }]}
					>
						<Input
							name='email'
							prefix={<UserOutlined className='site-form-item-icon' />}
							value={loginData.email}
							onChange={onChangeInput}
							placeholder='Email'
						/>
					</Form.Item>

					<Form.Item
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input
							name='password'
							prefix={<LockOutlined className='site-form-item-icon' />}
							value={loginData.password}
							onChange={onChangeInput}
							type='password'
							placeholder='Password'
						/>
					</Form.Item>

					<Row justify='center' gutter={6}>
						<Col>
							{!userData ? (
								<Form.Item shouldUpdate>
									{() => (
										<Button
											type='primary'
											htmlType='submit'
											disabled={
												!clientReady ||
												!form.isFieldsTouched(true) ||
												!!form
													.getFieldsError()
													.filter(({ errors }) => errors.length).length
											}
										>
											Log in
										</Button>
									)}
								</Form.Item>
							) : (
								<Form.Item shouldUpdate>
									{() => (
										<Button type='primary' danger onClick={onLogOut}>
											Log out
										</Button>
									)}
								</Form.Item>
							)}
						</Col>
						<Col>
							<Form.Item shouldUpdate>
								{() => (
									<Button type='default' onClick={handleChangeForm}>
										New to us? Sign Up
									</Button>
								)}
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	);
};
