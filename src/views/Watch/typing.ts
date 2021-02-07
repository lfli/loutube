import { IMv } from "@/typing";

export interface ISimiMvQueryParams {
    mvid: number;
}

export interface ISimiMvState {
    curTitle: string;
    queryParams: ISimiMvQueryParams;
    mvList: IMv[];
}

export interface IMvUrlQueryParams {
    mvid: number;
}

export interface IMvUrlState {
    curTitle: string;
    queryParams: IMvUrlQueryParams;
    mvUrl: string;
}