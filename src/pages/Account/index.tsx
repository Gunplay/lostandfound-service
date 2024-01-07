import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { fetchAdsUser } from '../../redux/account/asyncActions';
import { AppState } from '../../redux/register/types';
import { RootState, useAppDispatch } from '../../redux/store';

interface UserAd {
	id: string;
	title: string;
	description: string;
	// Add more fields as needed
}

interface UserAdsProps {
	userData: AppState['userData'] | null;
}

const UserAds: React.FC<UserAdsProps> = ({ userData }) => {
	const dispatch = useAppDispatch();

	const { userAds } = useSelector((store: RootState) => store.account);

	useEffect(() => {
		dispatch(fetchAdsUser());
	}, [dispatch]);

	if (!userData) {
		return <Navigate to='/home' replace />;
	}

	return (
		<div style={{ backgroundColor: 'black' }}>
			<h2>User Ads</h2>
			{/* {loading && <p>Loading user ads...</p>}
			{error && <p>Error fetching user ads: {error.message}</p>} */}
			{userAds && (
				<div>
					{userAds.map((ad: UserAd) => (
						<div key={ad.id}>
							{/* Display ad information */}
							<p>{ad.title}</p>
							<p>{ad.description}</p>
							{/* Add more fields as needed */}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default UserAds;
