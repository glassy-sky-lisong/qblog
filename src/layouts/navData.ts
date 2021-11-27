import { fabYoutube } from '@quasar/extras/fontawesome-v5'

export interface navProp {
  icon: string;
  label: string;
  to?: string;
  children?: navProp[]
}

export interface tabProp extends navProp {
  name?: string;
}

export const nav0: navProp = {
  icon: 'home',
  label: 'Home',
  to: '/'
}

export const nav1: Array<navProp> = [
  { icon: 'home', label: '主页', to: '/' },
  { icon: 'folder', label: '文章管理', children: [  { icon: 'whatshot', label: 'Trending', to: '/article/test1' }, { icon: 'subscriptions', label: 'Subscriptions', to: '/article/test2' }, { icon: 'thumb_up_alt', label: 'Liked videos', to: '/article/test3' }, { icon: 'home', label: '全部文章', to: '/article/all' } ] },
  { icon: 'whatshot', label: 'Trending', to: '/' },
  { icon: 'subscriptions', label: 'Subscriptions', to: '/' },
]

export const nav2: Array<navProp> = [
  { icon: 'folder', label: 'Library', to: '/' },
  { icon: 'restore', label: 'History', to: '/' },
  { icon: 'watch_later', label: 'Watch  later', to: '/' },
  { icon: 'thumb_up_alt', label: 'Liked videos', to: '/' }
]

export const nav3: Array<navProp> = [
  { icon: fabYoutube, label: 'YouTube Premium', to: '/' },
  { icon: 'local_movies', label: 'Movies & Shows', to: '/' },
  { icon: 'videogame_asset', label: 'Gaming', to: '/' },
  { icon: 'live_tv', label: 'Live', to: '/' }
]

export const nav4: Array<navProp> = [
  { icon: 'settings', label: 'Settings', to: '/' },
  { icon: 'flag', label: 'Report history', to: '/' },
  { icon: 'help', label: 'Help', to: '/' },
  { icon: 'feedback', label: 'Send feedback', to: '/' }
]

