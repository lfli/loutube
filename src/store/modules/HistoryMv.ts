import { IMv } from "@/typing";

interface HistoryMvState {
    historyMvList: IMv[]
}

const state: HistoryMvState = { historyMvList: [] };

const getters = {

}

const actions = {
    addHistoryMv(context: any, payload: IMv) {
        context.commit('addHistoryMv', payload);
    }
}

const mutations = {
    addHistoryMv(state: HistoryMvState, payload: IMv) {
        state.historyMvList.unshift(payload);
        state.historyMvList = state.historyMvList.reduce<IMv[]>((prev, cur) => {
            for (const item of prev) {
                if (item.id === cur.id) {
                    return prev;
                }
            }
            return [...prev, cur];
        }, [])
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}