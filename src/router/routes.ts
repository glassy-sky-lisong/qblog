import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ],
    meta: { title: '主页', icon: 'home' }
  },
  {
    path: '/article',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'all', component: () => import('pages/ArticleManagement/AllArticle.vue'),meta: { title: '全部文章', icon: 'list_alt' } },
      { path: 'add', component: ()=> import('pages/ArticleManagement/AddArticle.vue'), meta: { title: '添加文章', icon: 'create' } },
      { path: 'test2', component: ()=> import('pages/Test/test2.vue'), meta: { title: 'Subscriptions', icon: 'subscriptions' } },
      { path: 'test3', component: ()=> import('pages/Test/test3.vue'), meta: { title: 'Liked videos', icon: 'thumb_up_alt' } },
    ],
    meta: {
      icon: 'folder',
      title: 'Folder'
    }
  },
  {
    path: '/login',
    component: () => import('pages/Login/Login.vue'),
    name: 'Login'
  },
  {
    path: '/registry',
    component: () => import('pages/Registry/Registry.vue'),
    name: 'Registry'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
