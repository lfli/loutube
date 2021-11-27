import { IArtistDetail, IArtistMv, IMv } from "@/typing";
import {
    getSimiMvListRequest,
    getArtistMvRequest,
    getPopularNowListRequest,
    getMvDetailInfoRequest,
    getMvDetailRequest,
    getArtistDetailRequest,
    getCommentMvRequest,
    getMvUrlRequest
} from "@/apis/requests/mv";

interface WatchMvState {
    simiMvList: IMv[];
    artistMvList: IMv[];
    likedCount: number;
    mv: IMv | null;
    artistDetail: IArtistDetail | null;
    commentMv: {
        hotComments: [],
        comments: [],
        total: number,
        more: boolean,
    },
    mvUrl: string,
    mvUrlErrorMsg: string
}

const state: WatchMvState = {
    simiMvList: [],
    artistMvList: [],
    likedCount: 0,
    mv: null,
    artistDetail: null,
    commentMv: {
        hotComments: [],
        comments: [],
        total: 0,
        more: false,
    },
    mvUrl: '',
    mvUrlErrorMsg: ''
}

const getters = {
    simiMvList(state: WatchMvState) {
        return state.simiMvList;
    },
    artistMvList(state: WatchMvState) {
        return state.artistMvList;
    },
    likedCount(state: WatchMvState) {
        return state.likedCount;
    },
    mv(state: WatchMvState) {
        return state.mv;
    },
    artistDetail(state: WatchMvState) {
        return state.artistDetail
    },
    commentMv(state: WatchMvState) {
        return state.commentMv;
    },
    mvUrl(state: WatchMvState) {
        return state.mvUrl;
    },
    mvUrlErrorMsg(state: WatchMvState) {
        return state.mvUrlErrorMsg
    }
}

const actions = {
    getSimiMvListRequest(context: any, payload: { mvid: number }) {
        return getSimiMvListRequest(payload.mvid).then(async result => {
            context.commit('getSimiMvListRequest', result.mvs);
        })
    },
    getArtistMvRequest(context: any, payload: { id: number, offset: number }) {
        return getArtistMvRequest(payload.id, payload.offset).then(result => {
            result.mvs = result.mvs.map((mv: IArtistMv) => {
                mv.cover = mv.imgurl16v9;
                return mv;
            });
            context.commit('getArtistMvRequest', result.mvs);
            return result.hasMore;
        })
    },
    getPopularNowListRequestForArtistMv(context: any, payload: { popularNowLimit: number, popularNowLoadMoreCount: number }) {
        return getPopularNowListRequest(
            payload.popularNowLimit,
            "全部",
            payload.popularNowLimit * payload.popularNowLoadMoreCount
        ).then(result => {
            context.commit('getArtistMvRequest', result.data);
        })
    },
    getMvDetailInfoRequest(context: any, payload: { mvid: number }) {
        return getMvDetailInfoRequest(
            payload.mvid
        ).then(result => {
            context.commit('getMvDetailInfoRequest', result.likedCount);
        });
    },
    getMvDetailRequest(context: any, payload: { mvid: number }) {
        return getMvDetailRequest(
            payload.mvid
        ).then(result => {
            context.commit('getMvDetailRequest', result.data);
        })
    },
    getArtistDetailRequest(context: any, payload: { id: number }) {
        return getArtistDetailRequest(
            payload.id
        ).then(result => {
            context.commit('getArtistDetailRequest', result.data.artist);
        })
    },
    getCommentMvRequest(context: any, payload: { id: number, limit: number, commentMvLoadMoreCount: number }) {
        return getCommentMvRequest(
            payload.id,
            payload.limit,
            payload.limit * payload.commentMvLoadMoreCount
        ).then(result => {
            const { total, more, comments, hotComments } = result;
            context.commit('getCommentMvRequest', { total, more, comments, hotComments });
        })
    },
    getMvUrlRequest(context: any, payload: { id: number }) {
        return getMvUrlRequest(payload.id).then(result => {
            let tempMvUrl = "";
            let tempMvUrlErrorMsg = "";
            if (result.data.code == 200) {
                tempMvUrl = result.data.url;
            } else {
                tempMvUrlErrorMsg = result.data.msg;
            }

            context.commit('getMvUrlRequest', { mvUrl: tempMvUrl, mvUrlErrorMsg: tempMvUrlErrorMsg })
        })
    }
}

const mutations = {
    getSimiMvListRequest(state: WatchMvState, payload: any) {
        state.simiMvList.push(...payload);
    },
    getArtistMvRequest(state: WatchMvState, payload: any) {
        state.artistMvList.push(...payload);
    },
    getMvDetailInfoRequest(state: WatchMvState, payload: any) {
        state.likedCount = payload;
    },
    getMvDetailRequest(state: WatchMvState, payload: any) {
        state.mv = payload;
    },
    getArtistDetailRequest(state: WatchMvState, payload: any) {
        state.artistDetail = payload;
    },
    getCommentMvRequest(state: WatchMvState, payload: { total: number, more: boolean, comments: [], hotComments: [] }) {
        if (payload.hotComments) {
            state.commentMv.hotComments.push(...payload.hotComments);
        }
        if (payload.comments) {
            state.commentMv.comments.push(...payload.comments);
        }
        state.commentMv.total = payload.total;
        state.commentMv.more = payload.more;
    },
    getMvUrlRequest(state: WatchMvState, payload: { mvUrl: string, mvUrlErrorMsg: string }) {
        state.mvUrl = payload.mvUrl;
        state.mvUrlErrorMsg = payload.mvUrlErrorMsg;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}