import { LoginOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { CreateNewUser } from '../CreateNewUser';
import { LogIn } from '../LogIn';
import { ModalWrapper } from '../ModalWrapper';

interface LogginAccBtnProps {
	style?: React.CSSProperties;
	classNames?: React.CSSProperties;
}

const ButtonLog: React.FC<LogginAccBtnProps> = ({ style, classNames }) => {
	const dispatch = useAppDispatch();
	const { isOpenAuthModal, isLoginAuthModalMode } = useSelector(
		(store: RootState) => store.register
	);
	console.log('isLoginAuthModalMode Check', isOpenAuthModal);
	const [loadings, setLoadings] = useState<boolean[]>([]);

	const enterLoading = (index: number) => {
		setLoadings(prevLoadings => {
			const newLoadings = [...prevLoadings];
			newLoadings[index] = true;
			return newLoadings;
		});

		setTimeout(() => {
			setLoadings(prevLoadings => {
				const newLoadings = [...prevLoadings];
				newLoadings[index] = false;
				return newLoadings;
			});
		}, 6000);
	};

	return (
		// <Space direction="horizontal" style={style}>
		<>
			<Space wrap>
				<ModalWrapper>
					{isLoginAuthModalMode ? <LogIn /> : <CreateNewUser />}
				</ModalWrapper>

				{/* <Button
					icon={<LoginOutlined />}
					loading={loadings[0]}
					onClick={e => {
						dispatch(setIsOpenAuthModal(isOpenAuthModal));
						enterLoading(0);
						console.log(e);
					}}
					style={{ backgroundColor: 'black', color: 'white' }}
					type='primary'
					size='middle'
				>
					Admin
				</Button> */}
				<Button
					icon={<LoginOutlined />}
					loading={loadings[0]}
					onClick={() => enterLoading(0)}
					type='primary'
					size='middle'
				>
					User
				</Button>
			</Space>
		</>
		// </Space>
	);
};

export default ButtonLog;
