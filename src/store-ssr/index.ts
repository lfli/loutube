import { createStore } from 'vuex';
import HistoryMv from '../store/modules/HistoryMv';
import Subscription from '../store/modules/Subscription';
import LikedMv from '../store/modules/LikedMv';
import TopProgressBar from '../store/modules/TopProgressBar';
import HomeMv from '../store/modules/HomeMv';
import PopularNowMv from '../store/modules/PopularNowMv';
import CloudSearchMv from '../store/modules/CloudSearchMv';
import WatchMv from '../store/modules/WatchMv';

export default function () {

  // 必须重置各项数据，否者会共享这些命名空间下的 state
  HistoryMv.state.historyMvList = [];
  Subscription.state.artistList = [];
  LikedMv.state.likedMvList = [];
  TopProgressBar.state.start = false;
  HomeMv.state.mvList = [];
  PopularNowMv.state.mvList = [];
  CloudSearchMv.state.mvList = [];
  WatchMv.state = {
    simiMvList: [],
    artistMvList: [],
    likedCount: 0,
    mv: null,
    artistDetail: null,
    commentMv: {
      hotComments: [],
      comments: [],
      total: 0,
      more: false,
    },
    mvUrl: '',
    mvUrlErrorMsg: ''
  }

  const store = createStore({
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

  try {
    if (window && (window as any).__INITIAL_STATE__) {
      store.replaceState((window as any).__INITIAL_STATE__);
    }
  } catch (error) {
    console.log('有一个错', error.message);
  }


  return store;

}
