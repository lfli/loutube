import { IMv } from "@/typing";

export interface ICloudsearchQueryParams {
    keywords: string;
}

export interface ICloudsearchState {
    curTitle: string;
    queryParams: ICloudsearchQueryParams;
    mvList: IMv[];
}