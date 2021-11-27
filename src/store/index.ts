import { createStore } from 'vuex';
import HistoryMv from './modules/HistoryMv';
import Subscription from './modules/Subscription';
import LikedMv from './modules/LikedMv';
import TopProgressBar from './modules/TopProgressBar';
import HomeMv from './modules/HomeMv';
import PopularNowMv from './modules/PopularNowMv';
import CloudSearchMv from './modules/CloudSearchMv';
import WatchMv from './modules/WatchMv';

export default createStore({
  modules: {
    HistoryMv,
    Subscription,
    LikedMv,
    TopProgressBar,
    HomeMv,
    PopularNowMv,
    CloudSearchMv,
    WatchMv
  }
})
