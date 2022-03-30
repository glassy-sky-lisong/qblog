<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1 main-layout" ref='layoutRef'>
    <q-header elevated class="bg-white text-grey-8 q-py-xs">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-btn flat no-caps no-wrap v-if="$q.screen.gt.xs">
          <q-icon :name="fabYoutube" color="red" size="28px" />
          <q-toolbar-title shrink class="q-ml-xs">YouTube</q-toolbar-title>
        </q-btn>

       <breadcrumbs />

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap">
          <q-input
            dense
            outlined
            square
            v-model="search"
            placeholder="YouTube"
            class="bg-white col"
          />
          <q-btn
            icon="search"
            class="YL__toolbar-input-btn"
            color="grey-3"
            text-color="grey-8"
            unelevated
          />
        </div>

        <div class="q-gutter-sm row items-center no-wrap q-pl-md">
          <q-btn round dense flat class="grey-8" icon="video_call" v-if="$q.screen.gt.sm">
            <q-tooltip>Create a video or post</q-tooltip>
          </q-btn>
          <q-btn round dense flat class="grey-8" icon="apps" v-if="$q.screen.gt.sm">
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat class="grey-8" icon="message" v-if="$q.screen.gt.sm">
            <q-tooltip>Messages</q-tooltip>
          </q-btn>
          <q-btn round dense flat class="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>2</q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
            <q-menu>
              <q-list>
                <q-item clickable  @click='settings = true'>
                  <q-item-section avatar>
                    <q-icon name="settings" />
                  </q-item-section>
                  <q-item-section>
                    设置
                  </q-item-section>
                  <q-item-section side>
                  </q-item-section>
                </q-item>
                <q-item clickable  @click='confirm = true'>
                  <q-item-section avatar>
                    <q-icon name="settings" />
                  </q-item-section>
                  <q-item-section>
                    注销账号
                  </q-item-section>
                  <q-item-section side>
                  </q-item-section>
                </q-item>
                <q-item clickable @click.once='logout'>
                  <q-item-section avatar>
                    <q-icon name="settings" />
                  </q-item-section>
                  <q-item-section>
                    退出登录
                  </q-item-section>
                  <q-item-section side>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>

      <q-separator class="grey-3" />

      <tag-view ref='tabViewRef' ></tag-view>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2" :width="240">
      <q-scroll-area class="fit" :thumb-style="{ 'border-radius': '5px', 'background-color': 'rgba(144, 147, 153, 0.9)', width: '3px', height: '50px', top: '0px' }" >

          <slide-group>
            <slide-item :item='links1' @add-tab='(el) => $refs.tabViewRef.addTab(el)'></slide-item>
            <q-separator class="q-my-md" />
            <slide-item :item='links2' @add-tab='(el) => $refs.tabViewRef.addTab(el)' />
            <q-separator class="q-mt-md q-mb-xs" />
            <slide-item subtitle='More for YouTube' :item='links3' @add-tab='(el) => $refs.tabViewRef.addTab(el)' ></slide-item>
            <q-separator class="q-my-md" />
            <slide-item :item='links4' @add-tab='(el) => $refs.tabViewRef.addTab(el)' ></slide-item>
          </slide-group>

      </q-scroll-area>
    </q-drawer>

    <q-page-container>
        <router-view v-slot='{ Component }'>
          <keep-alive>
            <component :is='Component'></component>
          </keep-alive>
        </router-view>
    </q-page-container>

    <pop-card
      title='我是标题'
      v-model='settings'
      @save='close => close()'
    >
      <simple-list>
        <simple-item
          caption-label='基本信息'
          left-label='头像'
          btn-label='上传'
          btn-class='q-my-auto'
          :btn-style='{ height: "1rem" }'
        >
          <q-avatar sizes='lg' style='width: 4rem; height: 4rem;flex: 1;'>
            <q-img width='4rem' height='4rem' :src='currentUser.avatar' sizes='lg'></q-img>
          </q-avatar>
        </simple-item>
        <simple-item left-label='用户名'>
          {{ currentUser.username }}
        </simple-item>
        <simple-item left-label='密码' btn-label='修改' @btn-click='onBtnClick'>
          {{ currentUser.password }}
        </simple-item>
        <simple-item left-label='性别'>
          {{ currentUser.gender }}
        </simple-item>
        <simple-item left-label='生日'>
          {{ currentUser.birthday }}
        </simple-item>
        <simple-item left-label='电子邮箱' btn-label='修改'>
          {{ currentUser.email }}
        </simple-item>
      </simple-list>
    </pop-card>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">您确定要注销账号吗？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="手滑了" color="primary" v-close-popup />
          <q-btn flat label="我确定" color="primary" v-close-popup @click='cancelHandle' />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script lang="ts">
import { fabYoutube } from '@quasar/extras/fontawesome-v5'
import { nav0, nav1, nav2, nav3, nav4 } from './navData'
import TagView from 'src/components/TagView/TagView.vue'
import Breadcrumbs from 'src/components/Breadcrumbs/Breadcrumbs.vue'
import SlideItem from 'src/components/SlideGrop/SlideItem.vue'
import SlideGroup from 'src/components/SlideGrop/SlideGroup.vue';
import PopCard from 'src/components/PopCard/PopCard.vue';
import SimpleList from 'src/components/simepleList/simpleList.vue';
import SimpleItem from 'src/components/simepleList/simpleItem.vue';
import { useStore } from 'src/store/index';
import { defineComponent, ref, onMounted, computed, onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  name: 'MainLayout',
  components: { TagView, Breadcrumbs, SlideItem, SlideGroup, PopCard, SimpleList, SimpleItem },
  setup() {
    const leftDrawerOpen = ref(false)
    const search = ref('')
    const tagViewRef = ref(null)
    const router = useRouter()
    const store = useStore()
    const settings = ref(false)
    const currentUser = computed(() => store.getters.currentUser)
    const confirm = ref(false)


    const logout = () => {
      void store.dispatch('logout').then(
        res => {
          if (res) {
            void router.push('/login')
          } else {
            console.log('logout unknown error')
          }
        }
      ).catch(err => console.error(err))
    }

    const onBtnClick = () => {
      console.log('btn-click')
    }

    const getLoginedUser = () => {
      void axios.get('/api/user/current-user').then(
        res => {
          console.log(res.data)
          if (res.data.data) {
            store.commit('setUser', res.data.data)
          } else throw new Error('get LoginUser fail')
        }
      ).catch(err => console.error(err))
    }

    const cancelHandle = () => {
      console.log('cancel')
    }

    onMounted(() => {
      console.log('mounted')
      // getLoginedUser()
      void store.dispatch('fetchCurrentUser')
    })

    onUpdated(() => console.log('updated'))




    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      search,
      fabYoutube,
      link0: nav0,
      links1:nav1,
      links2: nav2,
      links3: nav3,
      links4: nav4,
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' }
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' }
      ],
      tagViewRef,
      logout,
      settings,
      onBtnClick,
      currentUser,
      confirm,
      cancelHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.YL {
  &__toolbar-input-container {
    min-width: 200px;
    width: 20%;
  }

  &__toolbar-input-btn {
    border-radius: 0;
    border-style: solid;
    border-width: 1px 1px 1px 0px;
    border-color: rgba(0, 0, 0, 0.24);
  }
}
</style>
