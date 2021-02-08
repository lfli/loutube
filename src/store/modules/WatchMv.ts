import { IMv } from "@/typing";
import { getMvDetailRequest } from "@/apis/requests/mv";

interface WatchMvState {
    id: number;
    name: string;
    artistId: number;
    artistName: string;
    playCount: number;
    publishTime: string;
    desc: string;
}

const state: WatchMvState = {
    id: -1,
    name: '',
    artistId: -1,
    artistName: '',
    playCount: -1,
    publishTime: '',
    desc: ''
}

const getters = {
    getArtistId(state: WatchMvState) {
        return state.artistId;
    }
}

const actions = {
    async setWatchMv(context: any, payload: IMv) {
        const { data } = await getMvDetailRequest(payload.id);
        context.commit('setWatchMv', { ...payload, publishTime: data.publishTime, desc: data.desc });
    },
    clearWatchMv(context: any) {
        context.commit('clearWatchMv');
    }
}

const mutations = {
    setWatchMv(state: WatchMvState, payload: IMv & { publishTime: string, desc: string }) {
        state.id = payload.id;
        state.name = payload.name;
        state.artistId = payload.artistId;
        state.artistName = payload.artistName;
        state.playCount = payload.playCount;
        state.publishTime = payload.publishTime;
        state.desc = payload.desc;
    },
    clearWatchMv(state: WatchMvState) {
        state.id = -1;
        state.name = '';
        state.artistId = -1;
        state.artistName = '';
        state.playCount = -1;
        state.publishTime = '';
        state.desc = '';
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}