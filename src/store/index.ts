import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex'

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
  username: '',
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

export default store(function (/* { ssrContext } */) {

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
      }
    },
    getters: {
      currentUser(state) {
        return state.currentUser;
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
