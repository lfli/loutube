import { IMv } from "@/typing";

export interface ICloudsearchQueryParams {
    keywords: string;
    limit: number;
}

export interface ICloudsearchState {
    curTitle: string;
    queryParams: ICloudsearchQueryParams;
}