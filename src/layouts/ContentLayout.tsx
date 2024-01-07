import { Content } from 'antd/es/layout/layout';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { FooterPanel, HeaderPanel, LayoutForForm } from '../components';
import Account from '../pages/Account';
import { CardsPage } from '../pages/CardsPage/CardPage';
import HomePage from '../pages/HomePage/HomePage';
import ListSearchAds from '../pages/ListSearchAds';
import { MainManualLostAndFound } from '../pages/MainManualLostAndFound';
import SingleCardPage from '../pages/SingleCardPage';
import { fetchAdsUser } from '../redux/account/asyncActions';
import { AppState } from '../redux/register/types';
import { useAppDispatch } from '../redux/store';

const contentStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	backgroundColor: 'white',
	position: 'relative',
};

interface ContentLayoutProps {
	userData: AppState['userData'] | null;
}

// Extract the logic to a custom hook
// const useAuthenticatedRoute = (userData: AppState['userData'] | null) => {
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		if (!userData) {
// 			navigate('/');
// 		}
// 	}, [userData, navigate]);
// };

// Use ContentLayoutProps as the prop type
const ContentLayout: React.FC<ContentLayoutProps> = ({ userData }) => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	// Use the custom hook to check authentication
	// useAuthenticatedRoute(userData);

	useEffect(() => {
		dispatch(fetchAdsUser());
	}, [dispatch]);
	// <Navigation />;
	return (
		<Content style={contentStyle}>
			{location.pathname !== '/formlostandfound' && <HeaderPanel />}
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/manual' element={<MainManualLostAndFound />} />
				<Route path='/cards' element={<CardsPage />} />
				<Route path='/ad' element={<SingleCardPage />} />
				<Route path='/list' element={<ListSearchAds />} />
				<Route path='/formlostandfound' element={<LayoutForForm />} />
				<Route path='/account' element={<Account userData={userData} />} />
				<Route path='*' element={<p>There's nothing here: 404!</p>} />
			</Routes>
			{location.pathname !== '/formlostandfound' && <FooterPanel />}
		</Content>
	);
};

// const Navigation = () => (
// 	<nav>
// 		<Link to='/'>Home</Link>
// 		<Link to='/manual'>Manual</Link>
// 		<Link to='/cards'>Cards</Link>
// 		<Link to='/ad'>Ad</Link>
// 		<Link to='/formlostandfound'>Formlostandfound</Link>
// 		<Link to='/account'>Account</Link>
// 	</nav>
// );
export default ContentLayout;
