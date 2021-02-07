import { IMv } from "@/typing";

export interface IPopularNowQueryParams {
    area?: string;
    order?: string;
    limit: number;
    offset?: number;
}

export interface IPopularNowState {
    curTitle: string;
    queryParams: IPopularNowQueryParams;
    mvList: IMv[];
}