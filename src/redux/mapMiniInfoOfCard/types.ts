export interface TypeMiniInfo {
	address: string;
	categoryName: string;
	createdAt: string;
	photo: string;
	title: string;
	typeId: number;
	_id: string;
}

export enum Status {
	IDLE = 'idle',
	LOADING = 'loading',
	SUCCESS = 'completed',
	ERROR = 'error',
}
