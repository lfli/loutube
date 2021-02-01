import { ajaxGet } from "../ajax"
import { GET_MV_ALL } from "../url";

const getMvListRequest = (limit: number) => {
    return ajaxGet(GET_MV_ALL, { limit });
}

export {
    getMvListRequest
}
