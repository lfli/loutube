import { IArtistDetail, IArtistMv, IMv } from "@/typing";

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

export interface IMvDetailQueryParams {
    mvid: number;
}

export interface IMvDetailState {
    curTitle: string;
    queryParams: IMvDetailQueryParams;
    mv: IMv | null;
}

export interface IArtistDetailQueryParams {
    id: number;
}

export interface IArtistDetailState {
    curTitle: string;
    queryParams: IArtistDetailQueryParams;
    artistDetail: IArtistDetail;
}

export interface IArtistMvQueryParams {
    id: number;
    limit: number;
}

export interface IArtistMvState {
    curTitle: string;
    queryParams: IArtistMvQueryParams;
    mvList: IArtistMv[];
    hasMore: boolean;
}