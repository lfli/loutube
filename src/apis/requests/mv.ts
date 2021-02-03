import { ajaxGet } from "../ajax"
import { GET_ARTIST_DETAIL, GET_MV_ALL } from "../url";

const getMvListRequest = (limit: number, offset = 0) => {
    return ajaxGet(GET_MV_ALL, { limit, offset });
}

const getArtistDetailRequest = (id: number) => {
    return ajaxGet(GET_ARTIST_DETAIL, { id });
}

export {
    getMvListRequest,
    getArtistDetailRequest
}
