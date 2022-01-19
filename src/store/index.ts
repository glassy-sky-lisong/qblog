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
      setLoginCookie(state) {
        Cookies.set('loginer', 'true', {
          expires: '3d',
          httpOnly: false,
          path: '/'
        })
      },
      clearLoginCookie(state) {
        Cookies.has('loginer') && Cookies.remove('loginer')
      },
      setLoginSession(state) {
        SessionStorage.set('loginer', true)
      },
      clearLoginSession(state) {
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
      logout({ commit, state }) {
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
          )
        }
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
