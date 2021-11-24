import { createRouter, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home/index.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true,
      depth: 1
    }
  },
  {
    path: '/popular-now/:link',
    name: 'PopularNow',
    component: () => import(/* webpackChunkName: "about" */ '../views/PopularNow/index.vue'),
    props: true,
    meta: {
      title: '时下流行',
      keepAlive: true,
      depth: 1
    }
  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: () => import(/* webpackChunkName: "about" */ '../views/Subscription/index.vue'),
    meta: {
      title: '订阅内容',
      keepAlive: true,
      depth: 1
    }
  },
  {
    path: '/mediaLibrary',
    name: 'MediaLibrary',
    component: () => import(/* webpackChunkName: "about" */ '../views/MediaLibrary/index.vue'),
    meta: {
      title: '媒体库',
      depth: 1
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "about" */ '../views/History/index.vue'),
    meta: {
      title: '历史记录',
      depth: 1
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search/index.vue'),
    props: route => ({ keywords: route.query.q }),
    meta: {
      title: '搜索',
      keepAlive: true,
      depth: 1
    }
  },
  {
    path: '/watch/:mvid',
    name: 'Watch',
    component: () => import(/* webpackChunkName: "about" */ '../views/Watch/index.vue'),
    props: true,
    meta: {
      title: '观看',
      depth: 2
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "about" */ '../views/Notfound/index.vue'),
    meta: {
      title: '404',
      depth: 2
    }
  }
]

export default function (history: any) {
  return createRouter({
    history,
    routes
  })
}
