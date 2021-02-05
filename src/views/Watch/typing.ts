import { IMv } from "@/types";

export interface ISimiMvQueryParams {
    mvid: number;
}

export interface ISimiMvState {
    curTitle: string;
    queryParams: ISimiMvQueryParams;
    mvList: IMv[];
}