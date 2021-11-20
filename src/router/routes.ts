import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/test1', component: ()=> import('pages/Test/test1.vue'), },
      { path: '/test2', component: ()=> import('pages/Test/test2.vue'), },
      { path: '/test3', component: ()=> import('pages/Test/test3.vue'), },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
