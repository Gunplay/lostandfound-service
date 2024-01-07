import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface ModalWrapperProps {
	children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
	const { isLoginAuthModalMode } = useSelector(
		(store: RootState) => store.register
	);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button type='primary' onClick={showModal}>
				Admin
			</Button>
			<Modal
				title={isLoginAuthModalMode ? 'Log-in to your account' : 'Sign Up'}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				{children}
				{/* <p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p> */}
			</Modal>
		</>
	);
};
