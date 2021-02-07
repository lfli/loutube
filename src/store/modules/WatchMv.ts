import { IMv } from "@/typing";
import { getMvDetailRequest } from "@/apis/requests/mv";

interface WatchMvState {
    id: number;
    name: string;
    artistId: number;
    artistName: string;
    playCount: number;
    publishTime: string;
}

const state: WatchMvState = {
    id: -1,
    name: '',
    artistId: -1,
    artistName: '',
    playCount: -1,
    publishTime: ''
}

const getters = {}

const actions = {
    async setWatchMv(context: any, payload: IMv) {
        const { data } = await getMvDetailRequest(payload.id);
        context.commit('setWatchMv', { ...payload, publishTime: data.publishTime });
    },
    clearWatchMv(context: any) {
        context.commit('clearWatchMv');
    }
}

const mutations = {
    setWatchMv(state: WatchMvState, payload: IMv & { publishTime: string }) {
        state.id = payload.id;
        state.name = payload.name;
        state.artistId = payload.artistId;
        state.artistName = payload.artistName;
        state.playCount = payload.playCount;
        state.publishTime = payload.publishTime;
    },
    clearWatchMv(state: WatchMvState) {
        state.id = -1;
        state.name = '';
        state.artistId = -1;
        state.artistName = '';
        state.playCount = -1;
        state.publishTime = '';
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}