import { IMv } from "@/types";

export interface IQueryParams {
    area?: string;
    order?: string;
    limit: number;
    offset?: number;
}

export interface IState {
    curTitle: string;
    queryParams: IQueryParams;
    mvList: IMv[];
}