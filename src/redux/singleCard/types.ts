export interface Card {
	actualTo: string;
	categoryId: string;
	createdAt: string;
	description: string;
	isApproved: boolean;
	location: {
		address: string;
		lat: number;
		lng: number;
	};
	lostOrFoundAt: string;
	photos: string[];
	subName: string;
	title: string;
	typeId: number;
	user: {
		email: string;
		firstname: string;
		isAdmin: boolean;
		lastname: string;
		phone: string;
		registeredAt: string;
	};
	_id: string;
}

export enum Status {
	IDLE = 'idle',
	LOADING = 'loading',
	SUCCESS = 'completed',
	ERROR = 'error',
}

export interface CardState {
	newAds: Card | null;
	status: Status.IDLE | Status.LOADING | Status.SUCCESS | Status.ERROR;
	error: string | null;
}
