import { RouteRecordRaw } from 'vue-router';
import { tabs } from 'src/layouts/navData';
import { initRoutes, lRoutes, rRoutes } from 'src/utils/router'

initRoutes(tabs)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    name: 'home',
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'index', meta: { tab: { label: '主页', icon: 'home', name: 'index', } } },
      ...rRoutes
    ],
  },
  ...lRoutes,
  {
    path: '/login',
    component: () => import('pages/Login/Login.vue'),
    name: 'login'
  },
  {
    path: '/registry',
    component: () => import('pages/Registry/Registry.vue'),
    name: 'registry'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
