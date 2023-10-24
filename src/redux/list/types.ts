export enum Status {
    LOADING = "loading",
    SUCCESS = "completed",
    ERROR = "error",
}

export interface CardData {
    address: string;
    categoryName: string;
    createdAt: string;
    photo: string;
    title: string;
    typeId: number;
    _id: string;
    checked: boolean;
    subName: string;
}
