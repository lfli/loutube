export interface IHeadParams {
    id: number;
}

export interface IHeadState {
    curTitle: string;
    queryParams: IHeadParams;
    head: string;
}