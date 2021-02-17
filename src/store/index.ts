import { createStore } from 'vuex';
import HistoryMv from './modules/HistoryMv';
import Subscription from './modules/Subscription';
import LikedMv from './modules/LikedMv';

export default createStore({
  modules: {
    HistoryMv,
    Subscription,
    LikedMv
  }
})
