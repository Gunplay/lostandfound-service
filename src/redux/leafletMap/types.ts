export interface TypeAdsPoints {
	dataPoints: {
		points: {
			typeId: number;
			lat: number;
			lng: number;
			adId: string;
		}[];
		status: string;
	};
}
export interface TypeMiniInfo {
	
}
export enum Status {
	IDLE = 'idle',
	LOADING = 'loading',
	SUCCESS = 'completed',
	ERROR = 'error',
}
