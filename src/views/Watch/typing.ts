import { IArtistDetail, IArtistMv, IComment, IMv } from "@/typing";

export interface ISimiMvQueryParams {
    mvid: number;
}

export interface ISimiMvState {
    curTitle: string;
    queryParams: ISimiMvQueryParams;
}

export interface IMvUrlQueryParams {
    mvid: number;
}

export interface IMvUrlState {
    curTitle: string;
    queryParams: IMvUrlQueryParams;
}

export interface IMvDetailQueryParams {
    mvid: number;
}

export interface IMvDetailState {
    curTitle: string;
    queryParams: IMvDetailQueryParams;
}

export interface IArtistDetailQueryParams {
    id: number;
}

export interface IArtistDetailState {
    curTitle: string;
    queryParams: IArtistDetailQueryParams;
}

export interface IArtistMvQueryParams {
    id: number;
    limit: number;
}

export interface IArtistMvState {
    curTitle: string;
    queryParams: IArtistMvQueryParams;
    hasMore: boolean;
}

export interface ICommentMvQueryParams {
    id: number;
    limit: number;
}

export interface ICommentMvState {
    curTitle: string;
    queryParams: ICommentMvQueryParams;
}

export interface IMvLikedCountQueryParams {
    mvid: number;
}

export interface IMvLikedCountState {
    curTitle: string;
    queryParams: IMvLikedCountQueryParams;
}