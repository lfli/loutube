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

// 艺人
export interface IArtistDetail {
    id: number;
    name: string;
    cover: string;
    briefDesc: string;
}

// 获取歌手 mv 返回数据类型
export interface IArtistMv {
    id: number;
    name: string;
    artistName: string;
    imgurl16v9: string;
    cover: string;
    duration: string;
    playCount: string;
    publishTime: string;
}