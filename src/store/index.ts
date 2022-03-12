import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex'
import axios from 'src/axios'
import { router } from 'src/router'
import { date, Cookies, SessionStorage } from 'quasar'
import { PostProp } from '../pages/ArticleManagement/tableData';

const { formatDate } = date

// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface UserProps {
  id: number;
  username: string;
  password: string;
  gender: number;
  birthday: string;
  email: string;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  role: string;
  roleId: number;
  authorities: { authority: string; }[];
  avatar: string;
  roleLabel: string;
}

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  currentUser: UserProps
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

const defaultUser: UserProps = {
  id: -1,
  username: '游客',
  password: '',
  gender: -1,
  birthday: '1999-01-01',
  email: '',
  enabled: false,
  accountNonExpired: false,
  accountNonLocked: false,
  credentialsNonExpired: false,
  role: 'ROLE_anonymous',
  roleId: -1,
  authorities: [],
  avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
  roleLabel: '游客'
}

export const isdefaultUser = (state: StateInterface) => {
  return state.currentUser.username === defaultUser.username
}

export const isLogin = (state: StateInterface) => {
  return  Cookies.has('loginer') || SessionStorage.has('loginer')
}

export default store(function (/* { ssrContext } */)  {

  const Store = createStore<StateInterface>({
    modules: {
      // example
    },
    state: {
      currentUser: defaultUser
    },
    mutations: {
      setCurrentUser(state, user: UserProps) {
        state.currentUser = user;
      },
      clearCurrentUser(state) {
        state.currentUser = defaultUser;
      },
      setUser(state, data: any) {
        const newUser: UserProps = {
          id: data.id ? data.id : -1,
          username: data.username,
          password: data.password ? data.password : '',
          gender: data.gender ? data.gender : 0,
          birthday: data.birthday ? formatDate(data.birthday, 'YYYY-MM-DD') : '1999-01-01',
          email: data.email ? data.email : '',
          enabled: data.enabled ? data.enabled : false,
          accountNonLocked: data.accountNonLocked ? data.accountNonLocked : false,
          accountNonExpired: data.accountNonExpired ? data.accountNonExpired : false,
          credentialsNonExpired: data.credentialsNonExpired ? data.credentialsNonExpired : false,
          authorities: data.authorities ? data.authorities : [],
          role: data.role ? data.role : '',
          roleId: data.roleId ? data.roleId : 0,
          avatar: data.avatar ? data.avatar : 'https://cdn.quasar.dev/img/boy-avatar.png',
          roleLabel: data.roleLabel ? data.roleLabel : '游客'
        }
        Store.commit('setCurrentUser', newUser)
      },
      setLoginCookie() {
        Cookies.set('loginer', 'true', {
          expires: '3d',
          httpOnly: false,
          path: '/'
        })
      },
      clearLoginCookie() {
        Cookies.has('loginer') && Cookies.remove('loginer')
      },
      setLoginSession() {
        SessionStorage.set('loginer', true)
      },
      clearLoginSession() {
        SessionStorage.has('loginer') && SessionStorage.remove('loginer')
      }
    },
    getters: {
      currentUser(state) {
        return state.currentUser;
      }
    },
    actions: {
      login({ commit, state }, formData: FormData) {
        return new Promise((resolve, reject) => {
          if (isLogin(state)) {
            //  todo
            resolve(true);
          } else {
            void axios.post('/api/login', formData).then(
              (res) => {
                console.log(res)
                if (res.data) {
                  console.log(res.data)
                  commit('setUser', res.data)
                  formData.get('remember-me') === '1' ? commit('setLoginCookie') : commit('setLoginSession')
                  resolve(true);
                } else {
                  throw new Error('not find user data');
                }
              }
            ).catch(
              err => {
                reject(err);
              }
            )
          }
        })
      },
      logout({ commit }) {
        return new Promise((resolve) => {
            commit('clearLoginCookie')
            commit('clearLoginSession')
            commit('clearCurrentUser')
            resolve(true);
        })
      },
      fetchCurrentUser({ commit, state, dispatch }) {
        if (isdefaultUser(state)) {
          void axios.get('/api/user/current-user').then(
            res => {
              console.log(res.data)
              if (/未登录/.test(res.data)) {
                void dispatch('logout').then( res => res && void router.push('/login'))
              } else if (res.data) {
                commit('setUser', res.data.data)
              } else {
                console.log(res.data)
              }
            }
          ).catch(err => {})
        }
      },
      fetchAllArticle() {
        return new Promise((resolve, reject) => {
          void axios.get('/api/article/all').then(
            res => {
              if(typeof res.data.data === 'string' && /未登录/.test(res.data.data)) {
                reject(res.data.data)
              }
              if (typeof res.data.data) {
                resolve(res.data.data)
              }
            }
          ).catch(err => {})
        })
      },
      deleteArticleByNames({}, names: string[]) {
        return new Promise((resolve, reject) => {
          void axios.post('/api/article/delete/s', names).then(
            res => {
              if (!/失败/.test(res.data)) {
                resolve(res.data)
              } else {
                reject(res.data)
              }
            }
          ).catch(err => {})
        })
      },
      addArticle({}, article: PostProp) {
        return new Promise((resolve, reject) => {
          void axios.post('/api/article/add', article).then(
            res => {
              console.log(res.data)
              if (res.data.errors.length > 0) {
                reject((res.data.errors as Array<string>).toString())
              } else if (/已存在/.test(res.data.data)) {
                resolve('文章已存在')
              } else if (/异常/.test(res.data.data)) {
                reject(res.data.data)
              } else {
                resolve('添加成功')
              }
            }
          ).catch(err => reject(err))
        })
      },
      fetchAllCategory({}) {
        return new Promise((resolve, reject) => {
          axios.get('/api/category/all').then(
            res => {
              if (Array.isArray(res.data.data)) {
                const categories = (res.data.data as Array<{ id: number; categoryName: string }>).map(item => item.categoryName)
                resolve(categories)
              } else {
                reject('data not a Array')
              }
            }
          ).catch(err => reject(err))
        })
      },
      getArticleByName({}, name: string) {
        return new Promise((resolve, reject) => {
          axios.get('/api/article/name/'+ name.trim()).then(
            res => {
              if (res.data.data.id) {
                resolve(res.data.data)
              } else if (/不存在/.test(res.data.data)) {
                reject('文章不存在')
              } else if (res.data.errors.length > 0) {
                const errors = (res.data.errors as Array<string>).reduce((prev, item) => prev === '' ? item : prev + ',' + item , '')
                reject(errors)
              } else {
                reject('未知异常')
              }
            }
          ).catch(err => reject(err))
        })
      },
      getArticleById({}, id: number) {
        return new Promise((resolve, reject) => {
          axios.get(`/api/article/id/${id}`).then(
            res => {
              if(res.data.data) {
                resolve(res.data.data)
              } else if (res.data.errors.length >= 1 && res.data.errors[0] !== '') {
                reject((res.data.errors as Array<string>).toString())
              }
            }
          ).catch(err => reject(err))
        })
      },
      updateArticleById({}, options: {id: number; article: Partial<PostProp> }) {
        return new Promise((resolve, reject) => {
          axios.post(`/api/article/edit/id/${options.id}`, options.article).then(
            res => {
              if(/成功/.test(res.data.data)) {
                resolve('更新成功')
              } else if(res.data.errors.length >=1 && res.data.errors[0] !== '') {
                reject((res.data.errors as Array<string>).toString())
              }
            }
          ).catch(err => reject(err))
        })
      },
      editUserPwd({}, options: { id: number; password: string }) {
        return new Promise((resolve, reject) => {
          axios.post('/api/user/update', options).then(res => {
            if (/成功/.test(res.data.data)) {
              resolve('修改成功')
            } else if(/失败/.test(res.data.data)) {
              reject('修改失败')
            } else {
              reject('未知异常')
            }
          }).catch(err => reject(err))
        })
      },
      cancelAccount({ state }) {
        return new Promise((resolve, reject) => {
          if (isdefaultUser(state)) {
            reject('缺少权限')
          } else {
            axios.post('/api/user/forget', {
              userName: state.currentUser.username,
              email: state.currentUser.email
            }).then(
              res => {
                if (/不需要/.test(res.data.data)) {
                  resolve('账号已经重置过了')
                } else if (/失败/.test(res.data.data)) {
                  reject('重置失败')
                } else if (/成功/.test(res.data.data)) {
                  resolve('重置成功')
                } else {
                  reject('未知异常')
                }
              }
            ).catch(err => reject(err))
          }
        })
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  return Store;
})

export function useStore() {
  return vuexUseStore(storeKey)
}
