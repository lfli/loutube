import { IArtistMv } from "@/typing";

export interface IArtistMvQueryParams {
    id: number;
    offset: number;
}

export interface IArtistMvState {
    curTitle: string;
    queryParams: IArtistMvQueryParams;
    mvList: IArtistMv[];
}