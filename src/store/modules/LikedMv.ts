import { IMv } from "@/typing";

interface LikedMvState {
    likedMvList: IMv[]
}

const state: LikedMvState = { likedMvList: [] }

const getters = {
    isLikedMv: (state: LikedMvState) => (id: number) => {
        return state.likedMvList.find(item => item.id === id);
    }
}

const actions = {
    addLikedMv(context: any, payload: IMv) {
        context.commit('addLikedMv', payload);
    },
    removeLikedMv(context: any, payload: IMv) {
        context.commit('removeLikedMv', payload);
    }
}

const mutations = {
    addLikedMv(state: LikedMvState, payload: IMv) {
        state.likedMvList.unshift(payload);
    },
    removeLikedMv(state: LikedMvState, payload: IMv) {
        state.likedMvList = state.likedMvList.filter(item => item.id !== payload.id);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}