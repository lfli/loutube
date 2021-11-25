import { createStore } from 'vuex';
import HistoryMv from '../store/modules/HistoryMv';
import Subscription from '../store/modules/Subscription';
import LikedMv from '../store/modules/LikedMv';
import TopProgressBar from '../store/modules/TopProgressBar';
import HomeMv from '../store/modules/HomeMv';

export default function () {

  const store = createStore({
    modules: {
      HistoryMv,
      Subscription,
      LikedMv,
      TopProgressBar,
      HomeMv
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
