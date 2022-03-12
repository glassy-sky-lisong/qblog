<template>
  <q-page padding>
    <div class='text-h5 q-mt-md q-mb-lg'>
      添加文章
    </div>
    <div class='row'>
      <div class='col-md-8 col-xs-12'>
        <q-item-label class='q-mb-md'>文章标题</q-item-label>
        <q-input outlined v-model='articleTitleValue' class='q-mb-lg' style='font-size: 1.3rem'></q-input>
        <q-item-label class='q-mb-md'>文章描述</q-item-label>
        <q-input outlined v-model='articleDescriptionValue' type='textarea' style='font-size: 1.3rem' class='q-mb-lg' autogrow></q-input>
      </div>
      <div class='col-md-4 col-xs-12 q-pa-md'>
        <div class='row column q-pa-md items-center' style='width: 80%; height:100%;'>
          <q-btn stretch class='q-mb-md' color='primary' @click='popCardValue = true'>发布文章</q-btn>
        </div>
      </div>
    </div>
    <pop-card
      title='发布文章'
      v-model='popCardValue'
      @save='postArticle'
      :loading='cardLoading'
      loading-label='正在发布，请稍后'
      submit-label='发布文章'
    >
      <q-list class='q-pa-sm'>
        <q-item>
          <q-item-section>
            <q-item-label overline>
              文章分类
            </q-item-label>
            <q-item-label class='q-py-sm'>
              <simple-select v-model='categoryGroup' :lazy-loading='categoryLazyLoading' ></simple-select>
            </q-item-label>
          </q-item-section>
        </q-item>
<!--        <q-item>-->
<!--          <q-item-section>-->
<!--            <q-item-label overline>-->
<!--              文章标签-->
<!--            </q-item-label>-->
<!--            <q-item-label class=' q-py-sm'>-->
<!--               <simple-select ></simple-select>-->
<!--            </q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
        <q-item>
          <q-item-section>
            <q-item-label overline>
              是否发布：
            </q-item-label>
            <q-radio v-model='isDraft' val='0' label='草稿'></q-radio>
            <q-radio v-model='isDraft' val='1' label='发布'></q-radio>
          </q-item-section>
        </q-item>
      </q-list>
    </pop-card>
    <v-md-editor v-model='contentValue' height='600px'></v-md-editor>
  </q-page>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref } from 'vue'
import { useQuasar } from 'quasar'
import PopCard from '../../components/PopCard/PopCard.vue';
import SimpleSelect from '../../components/SimpleSelect/SimpleSelect.vue';
import { PostProp } from './tableData';
import { useStore, isdefaultUser } from 'src/store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'addArticle',
  components: { SimpleSelect, PopCard,  },
  setup () {
    const contentValue = ref('')
    const isFullScreen = ref(false)
    const $q = useQuasar()
    const store = useStore()
    const articleTitleValue = ref('')
    const articleDescriptionValue = ref('')
    const popCardValue = ref(false)
    const categoryGroup: Ref<string[]> = ref([])
    const isDraft = ref('0')
    const router = useRouter()

    const cardLoading = ref(false)

    const demo = () => {
      const obj: PostProp = {
        articleName: '',
        articleStatus: 0,
        authorId: 0,
        authorName: '',
        category: '',
        content: '',
        createTime: '',
        lastTime: '',
        description: '',
        id: 0
      }
      if(isdefaultUser(store.state)) {
        void store.dispatch('logout').then(
          () => {
            void router.push('/login')
          }
        )
      }

      console.log(categoryGroup.value.length)

      obj.content = contentValue.value
      obj.articleName = articleTitleValue.value
      obj.description = articleDescriptionValue.value
      obj.articleStatus = Number(isDraft.value)
      obj.category = categoryGroup.value.length > 0 ? categoryGroup.value.reduce((pre, item) => pre === '' ? pre + item : pre + ',' + item) : ''
      obj.authorId = store.getters.currentUser.id
      obj.authorName = store.getters.currentUser.username
      obj.createTime = (new Date()).getTime()
      obj.lastTime = (new Date()).getTime()
      console.log(obj)

      void store.dispatch('addArticle', obj).then(
        res => {
          switch(res) {
            case '文章已存在':
              $q.notify({
                type: 'negative',
                message: res,
                position: 'top'
              })
              break
            case '添加成功':
              $q.notify({
                type: 'info',
                message: '发布成功',
                position: 'top'
              })
              break
            default:
              $q.notify({
                type: 'negative',
                message: '发布失败',
                position: 'top'
              })
              break
          }
        }
      ).catch((err: string) => $q.notify({
        type: 'negative',
        message: `发布失败, 失败原因: ${err}`,
        position: 'bottom',
        actions: [
          {
            label: 'Yes',
            color: 'white',
            handle: () => console.log('123')
          }
        ]
      }))
    }

    const postArticle = () => {
      console.log('postArticle')
      cardLoading.value = true

      setTimeout(() => {
        demo()

        cardLoading.value = false

        categoryGroup.value = []
        popCardValue.value = false

      }, 2000)
    }

    const categoryLazyLoading = (): Promise<string[]> => store.dispatch('fetchAllCategory')

    return { contentValue, isFullScreen, articleTitleValue, articleDescriptionValue, popCardValue, postArticle, categoryGroup, cardLoading, isDraft, categoryLazyLoading }
  }
})
</script>
