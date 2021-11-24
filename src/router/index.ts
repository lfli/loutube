import { createRouter, createWebHistory } from 'vue-router';

import { routes } from '../router-ssr/index'

const router = createRouter({
  history: createWebHistory('loutube'),
  routes
})

export default router
