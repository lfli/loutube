import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home/index.vue';

const routes: Array<RouteRecordRaw> = [
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
      keepAlive: true,
      depth: 1
    }
  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: () => import(/* webpackChunkName: "about" */ '../views/Subscription/index.vue'),
    meta: {
      keepAlive: true,
      depth: 1
    }
  },
  {
    path: '/mediaLibrary',
    name: 'MediaLibrary',
    component: () => import(/* webpackChunkName: "about" */ '../views/MediaLibrary/index.vue'),
    meta: {
      depth: 1
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "about" */ '../views/History/index.vue'),
    meta: {
      depth: 1
    }
  },
  {
    path: '/search/:keywords',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search/index.vue'),
    props: true,
    meta: {
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
      depth: 2
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "about" */ '../views/Notfound/index.vue'),
    meta: {
      depth: 2
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
