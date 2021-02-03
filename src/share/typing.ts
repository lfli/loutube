export interface IHeadParams {
    id: number;
}
export interface IHeadState {
    curTitle: string;
    queryParams: IHeadParams;
    head: string;
}

export interface IMvDescParams {
    mvid: number;
}
export interface IMvDescState {
    curTitle: string;
    queryParams: IMvDescParams;
    desc: string;
}