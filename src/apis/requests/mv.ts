import { ajaxGet } from "../ajax"
import { GET_ARTIST_DETAIL, GET_MV_ALL, GET_MV_DETAIL } from "../url";

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

export {
    getMvListRequest,
    getArtistDetailRequest,
    getPopularNowListRequest,
    getMvDetailRequest
}
