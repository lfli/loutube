import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/popular-now',
    name: 'PopularNow',
    component: () => import(/* webpackChunkName: "about" */ '../views/PopularNow/index.vue')
  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: () => import(/* webpackChunkName: "about" */ '../views/Subscription/index.vue')
  },
  {
    path: '/mediaLibrary',
    name: 'MediaLibrary',
    component: () => import(/* webpackChunkName: "about" */ '../views/MediaLibrary/index.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "about" */ '../views/History/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
