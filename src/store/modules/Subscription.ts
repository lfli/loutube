import { IArtistDetail } from "@/typing";

interface SubscriptionState {
    artistList: IArtistDetail[];
}

const state: SubscriptionState = { artistList: [] }

const getters = {
    isSubscription: (state: SubscriptionState) => (id: number) => {
        return state.artistList.find(item => item.id === id);
    }
}

const actions = {
    subscriptionArtist(context: any, payload: IArtistDetail) {
        context.commit('subscriptionArtist', payload);
    },
    unsubscriptionArtist(context: any, payload: number) {
        context.commit('unsubscriptionArtist', payload);
    }
}

const mutations = {
    subscriptionArtist(state: SubscriptionState, payload: IArtistDetail) {
        state.artistList.unshift(payload);
        state.artistList = state.artistList.reduce<IArtistDetail[]>((prev, cur) => {
            for (const item of prev) {
                if (item.id === cur.id) {
                    return prev;
                }
            }
            return [...prev, cur];
        }, [])
    },
    unsubscriptionArtist(state: SubscriptionState, payload: number) {
        state.artistList = state.artistList.filter(item => item.id !== payload);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}