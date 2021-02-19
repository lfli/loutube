
interface TopProgressBarState {
    start: boolean
}

const state: TopProgressBarState = {
    start: false
}

const getters = {
    isStart: (state: TopProgressBarState) => {
        return state.start;
    }
}

const actions = {
    pleaseStart(context: any) {
        context.commit('pleaseStart');
    },
    pleaseEnd(context: any) {
        context.commit('pleaseEnd');
    }
}

const mutations = {
    pleaseStart(state: TopProgressBarState) {
        state.start = true;
    },
    pleaseEnd(state: TopProgressBarState) {
        state.start = false;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}