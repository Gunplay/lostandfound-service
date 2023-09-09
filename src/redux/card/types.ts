export interface CardData {
    address: string;
    categoryName: string;
    createdAt: string;
    photo: string;
    title: string;
    typeId: number;
    _id: string;
    checked: boolean;
}

// export interface CardProps<S, N> {
//     checked: boolean;
//     cardInfo: CardData<string, number, Array<any>>;
// }

export enum Status {
    LOADING = "loading",
    SUCCESS = "completed",
    ERROR = "error",
}

export interface CardSliceState {
    items: CardData[];
    status: Status;
}
