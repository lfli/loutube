import { createStore } from 'vuex';
import WatchMv from './modules/WatchMv';
import HistoryMv from './modules/HistoryMv';

export default createStore({
  modules: {
    WatchMv,
    HistoryMv
  }
})
