import { IMv } from "@/typing";
import { getPopularNowListRequest } from "@/apis/requests/mv";

interface PopularNowMvState {
    mvList: IMv[]
}

const state: PopularNowMvState = { mvList: [] }

const getters = {
    mvList(state: PopularNowMvState) {
        return state.mvList;
    }
}

const actions = {
    getPopularNowList(context: any, payload: { limit: number, area: string, loadMoreCount: number }) {
        return getPopularNowListRequest(
            payload.limit,
            payload.area,
            payload.limit * payload.loadMoreCount
        ).then(result => {
            context.commit('getPopularNowList', result.data);
        })
    }
}

const mutations = {
    getPopularNowList(state: PopularNowMvState, payload: any) {
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