import { createStore } from 'vuex';
import HistoryMv from './modules/HistoryMv';
import Subscription from './modules/Subscription';

export default createStore({
  modules: {
    HistoryMv,
    Subscription
  }
})
