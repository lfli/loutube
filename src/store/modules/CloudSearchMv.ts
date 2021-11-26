import { IMv } from "@/typing";
import { cloudsearchRequest } from "@/apis/requests/mv";

interface CloudSearchMvState {
    mvList: IMv[]
}

const state: CloudSearchMvState = {
    mvList: []
}

const getters = {
    mvList(state: CloudSearchMvState) {
        return state.mvList;
    }
}

const actions = {
    cloudsearchRequest(context: any, payload: { keywords: string, limit: number, loadMoreCount: number }) {
        return cloudsearchRequest(
            payload.keywords,
            payload.limit,
            payload.limit * payload.loadMoreCount
        ).then(result => {
            if (!result.result.mvs) {
                return false;
            } else {
                context.commit('cloudsearchRequest', result.result.mvs);
                return true;
            }
        })
    }
}

const mutations = {
    cloudsearchRequest(state: CloudSearchMvState, payload: any) {
        state.mvList.push(...payload);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}