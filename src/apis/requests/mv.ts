import { ajaxGet } from "../ajax"
import { GET_ARTIST_DETAIL, GET_ARTIST_MV, GET_MV_ALL, GET_MV_DETAIL, GET_MV_URL, GET_SIMI_MV } from "../url";

const getMvListRequest = (limit: number, offset = 0) => {
    return ajaxGet(GET_MV_ALL, { limit, offset });
}

const getArtistDetailRequest = (id: number) => {
    return ajaxGet(GET_ARTIST_DETAIL, { id });
}

const getPopularNowListRequest = (limit: number, area = "全部", offset = 0) => {
    return ajaxGet(GET_MV_ALL, { limit, area, offset, order: "最热" });
}

const getMvDetailRequest = (mvid: number) => {
    return ajaxGet(GET_MV_DETAIL, { mvid });
}

const getSimiMvListRequest = (mvid: number) => {
    return ajaxGet(GET_SIMI_MV, { mvid });
}

const getMvUrlRequest = (id: number) => {
    return ajaxGet(GET_MV_URL, { id });
}

const getArtistMvRequest = (id: number, offset = 0) => {
    return ajaxGet(GET_ARTIST_MV, { id, offset });
}

export {
    getMvListRequest,
    getArtistDetailRequest,
    getPopularNowListRequest,
    getMvDetailRequest,
    getSimiMvListRequest,
    getMvUrlRequest,
    getArtistMvRequest
}
