import { OptionsProp } from '../utils/router';

export interface Tab {
  name: string;
  icon: string;
  label: string;
  show: boolean;
  children: Tab[]
}

export const tabs: OptionsProp[] = [
  {
    name: 'articleManagement',
    component: () => import('src/layouts/MainLayout.vue'),
    icon: 'folder',
    label: '文章管理',
    path: '/article',
    show: true,
    children: [
      {
        name: 'addArticle',
        component: () => import('src/pages/ArticleManagement/AddArticle.vue'),
        icon: 'create',
        label: '添加文章',
        path: 'add',
        show: true
      },
      {
        name: 'editorArticle',
        icon: 'gesture',
        label: '修改文章',
        path: 'editor/:name',
        component: () => import('src/pages/ArticleManagement/EditorArticle.vue'),
        show: false
      },
      {
        name: 'test3',
        icon: 'thumb_up_alt',
        label: 'Liked videos',
        path: 'test3',
        component: () => import('src/pages/Test/test3.vue'),
        show: true
      },
      {
        name: 'allArticle',
        icon: 'list_alt',
        label: '全部文章',
        path: 'all',
        component: () => import('src/pages/ArticleManagement/AllArticle.vue'),
        show: true
      }
    ],
  },
  {
    name: 'test2',
    icon: 'whatshot',
    label: 'Trending',
    path: '/test2',
    component: import('src/pages/Test/test2.vue'),
    show: true
  },
  {
    name: 'test1',
    icon: 'subscriptions',
    label: 'Subscriptions',
    path: '/test1',
    component: import('src/pages/Test/test1.vue'),
    show: true
  }
]

