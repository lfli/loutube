import { ajaxGet } from "../ajax"
import { GET_ARTIST_DETAIL, GET_MV_ALL } from "../url";

const getMvListRequest = (limit: number) => {
    return ajaxGet(GET_MV_ALL, { limit });
}

const getArtistDetailRequest = (id: number) => {
    return ajaxGet(GET_ARTIST_DETAIL, { id });
}

export {
    getMvListRequest,
    getArtistDetailRequest
}
