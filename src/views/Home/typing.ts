import { IMv } from "@/typing";

export interface IQueryParams {
    area?: string;
    order?: string;
    limit: number;
    offset?: number;
}

export interface IState {
    curTitle: string;
}