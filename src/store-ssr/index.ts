import { createStore } from 'vuex';
import HistoryMv from '../store/modules/HistoryMv';
import Subscription from '../store/modules/Subscription';
import LikedMv from '../store/modules/LikedMv';
import TopProgressBar from '../store/modules/TopProgressBar';
import HomeMv from '../store/modules/HomeMv';
import PopularNowMv from '../store/modules/PopularNowMv';
import CloudSearchMv from '../store/modules/CloudSearchMv';

export default function () {

  // 必须重置各项数据，否者会共享这些命名空间下的 state
  HistoryMv.state.historyMvList = [];
  Subscription.state.artistList = [];
  LikedMv.state.likedMvList = [];
  TopProgressBar.state.start = false;
  HomeMv.state.mvList = [];
  PopularNowMv.state.mvList = [];
  CloudSearchMv.state.mvList = [];

  const store = createStore({
    modules: {
      HistoryMv,
      Subscription,
      LikedMv,
      TopProgressBar,
      HomeMv,
      PopularNowMv,
      CloudSearchMv
    }
  })

  try {
    if (window && (window as any).__INITIAL_STATE__) {
      store.replaceState((window as any).__INITIAL_STATE__);
    }
  } catch (error) {
    console.log('有一个错', error.message);
  }


  return store;

}
