import { createStore } from 'vuex';
import HistoryMv from '../store/modules/HistoryMv';
import Subscription from '../store/modules/Subscription';
import LikedMv from '../store/modules/LikedMv';
import TopProgressBar from '../store/modules/TopProgressBar';

export default function () {
  return createStore({
    modules: {
      HistoryMv,
      Subscription,
      LikedMv,
      TopProgressBar
    }
  })
}
