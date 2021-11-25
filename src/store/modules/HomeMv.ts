import { IMv } from "@/typing";
import { getMvListRequest } from "@/apis/requests/mv";

interface HomeMvState {
    mvList: IMv[]
}

const state: HomeMvState = { mvList: [] }

const getters = {
    mvList(state: HomeMvState) {
        return state.mvList;
    }
}

const actions = {
    getMvListRequest(context: any, payload: { limit: number, loadMoreCount: number }) { 
        return getMvListRequest(
            payload.limit,
            payload.limit * payload.loadMoreCount
        ).then(result => {
            context.commit('getMvListRequest', result.data);
        })
    }
}

const mutations = {
    getMvListRequest(state: HomeMvState, payload: any) {
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