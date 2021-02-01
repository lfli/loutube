// mv
export interface IMv {
    id: number;
    cover: string;
    name: string;
    playCount: number;
    briefDesc: string;
    desc: string;
    artistName: string;
    artistId: number;
    duration: number;
    mark: number;
    subed: boolean;
    artists: {
        id: number;
        name: number;
        alias: string[];
        transNames: string[];
    }[];
}
