<template>
  <q-page padding>
    <div class='text-h5 q-mt-md q-mb-lg'>
      修改文章
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
          <q-btn stretch class='q-mb-md' color='primary' @click='popCardValue = true; categoryGroup = currentArticle.category.split(",");'>发布文章</q-btn>
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
<!--              <simple-select ></simple-select>-->
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

    <q-inner-loading :showing='editorLoading' :label='editorLabel'></q-inner-loading>
  </q-page>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref, onMounted  } from 'vue'
import SimpleSelect from '../../components/SimpleSelect/SimpleSelect.vue';
import PopCard from 'components/PopCard/PopCard.vue';
import { useQuasar } from 'quasar';
import { isdefaultUser, useStore } from '../../store';
import { PostProp } from './tableData';
import { useRouter, useRoute } from 'vue-router'
import { categoryToString } from 'src/utils/string'

export default defineComponent({
  name: 'EditorArticle',
  components: { SimpleSelect, PopCard,  },
  setup () {
    const isFullScreen = ref(false)
    const $q = useQuasar()
    const store = useStore()
    const currentArticle: Ref<PostProp> = ref({
      id: 0,
      articleName: '',
      authorId: 0,
      authorName: '',
      category: '',
      description: '',
      content: '',
      createTime: '',
      lastTime: '',
      articleStatus: 0,
    })
    const contentValue = ref(currentArticle.value.content)
    const articleTitleValue = ref(currentArticle.value.articleName)
    const articleDescriptionValue = ref(currentArticle.value.description)
    const popCardValue = ref(false)
    const categoryGroup: Ref<string[]> = ref(currentArticle.value.category.split(','))
    const isDraft = ref(currentArticle.value.articleStatus.toString())
    const router = useRouter()
    const route = useRoute()

    const cardLoading = ref(false)
    const editorLoading = ref(false)
    const editorLabel = ref('')


    const isDefaultArticle = () => {
      const temp = currentArticle.value
      if (temp.id === 0 &&
          temp.articleName === '' &&
          temp.authorId === 0 &&
          temp.authorName === '' &&
          temp.category === '' &&
          temp.description === '' &&
          temp.content === '' &&
          temp.createTime === '' &&
          temp.lastTime === '' &&
          temp.articleStatus === 0
      ) {
        return true
      } else {
        return false
      }
    }

    const demo = () => new Promise((resolve, reject) => {
      const obj: Partial<PostProp> = {}
      if(isdefaultUser(store.state)) {
        void store.dispatch('logout').then(
          () => {
            reject(false)
            void router.push('/login')
          }
        ).catch(err => {})
      }

      if(currentArticle.value.content  !== contentValue.value) {
        obj.content = contentValue.value
      }
      if(currentArticle.value.articleName !== articleTitleValue.value) {
        obj.articleName = articleTitleValue.value
      }
      if(currentArticle.value.description !== articleDescriptionValue.value) {
        obj.description = articleDescriptionValue.value
      }
      if(currentArticle.value.articleStatus !== Number(isDraft)) {
        obj.articleStatus = Number(isDraft.value)
      }
      if(currentArticle.value.category !== categoryToString(categoryGroup.value)) {
        obj.category = categoryToString(categoryGroup.value)
      }

      console.log(obj)

      void store.dispatch('updateArticleById', {
        id: currentArticle.value.id,
        article: obj
      }).then(
        res => {
          switch(res) {
            case '更新成功':
              $q.notify({
                type: 'info',
                message: '发布成功',
                position: 'top'
              })
              break
            default:
              $q.notify({
                type: 'negative',
                message: `发布失败: ${res as string}`,
                position: 'bottom'
              })
              break
          }
          resolve(true)
        }
      ).catch((err: string) => {
        $q.notify({
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
        });
        reject(false);
      })
    })

    const postArticle = () => {
      console.log('postArticle')
      cardLoading.value = true

      setTimeout(() => {
        demo().then(
          res => {
            if(res) {
              cardLoading.value = false

              categoryGroup.value = []
              popCardValue.value = false

              fetchArticleById(currentArticle.value.id,
                () => {
                  editorLoading.value = true
                  editorLabel.value = '正在拉取数据...'
                },
                () => {
                  editorLoading.value = false
                  editorLabel.value = ''
                }
              )
            } else {
              cardLoading.value = false

              categoryGroup.value = []
              popCardValue.value = false
            }
          }
        ).catch(() => {
          cardLoading.value = false

          categoryGroup.value = []
          popCardValue.value = false
        })

      }, 2000)
    }

    const categoryLazyLoading = (): Promise<string[]> => store.dispatch('fetchAllCategory')

    const fetchArticleByName = (articleName: string, before?: () => void, after?: () => void) => {
      before && before()
      store.dispatch('getArticleByName', articleName).then(
        res => {
          //  init
          currentArticle.value.id = res.id
          currentArticle.value.articleName = res.articleName
          currentArticle.value.authorId = res.authorId
          currentArticle.value.authorName = res.authorName
          currentArticle.value.description = res.description
          currentArticle.value.content = res.content
          currentArticle.value.category = res.category
          currentArticle.value.createTime = res.createTime
          currentArticle.value.lastTime = res.lastTime
          currentArticle.value.articleStatus = res.articleStatus

          articleTitleValue.value = currentArticle.value.articleName
          articleDescriptionValue.value = currentArticle.value.description
          contentValue.value = currentArticle.value.content
          isDraft.value = currentArticle.value.articleStatus.toString()
          categoryGroup.value = currentArticle.value.category.split(',')

          after && after()
        }
      ).catch(err => console.error(err))
    }

    const fetchArticleById = (id: number, before?: () => void, after?: () => void) => {
      before && before()
      store.dispatch('getArticleById', id).then(
        res => {
          //  init
          currentArticle.value.id = res.id
          currentArticle.value.articleName = res.articleName
          currentArticle.value.authorId = res.authorId
          currentArticle.value.authorName = res.authorName
          currentArticle.value.description = res.description
          currentArticle.value.content = res.content
          currentArticle.value.category = res.category
          currentArticle.value.createTime = res.createTime
          currentArticle.value.lastTime = res.lastTime
          currentArticle.value.articleStatus = res.articleStatus

          articleTitleValue.value = currentArticle.value.articleName
          articleDescriptionValue.value = currentArticle.value.description
          contentValue.value = currentArticle.value.content
          isDraft.value = currentArticle.value.articleStatus.toString()
          categoryGroup.value = currentArticle.value.category.split(',')

          after && after()
        }
      ).catch(err => console.error(err))
    }

    onMounted(() => {
      const param = route.params.name


      fetchArticleByName(param as string,
        () => {
          editorLoading.value = true
          editorLabel.value = '正在初始化页面'
        },
        () => {
        editorLoading.value = false
          editorLabel.value = ''
        }
      )
    })

    return { contentValue, isFullScreen, articleTitleValue, articleDescriptionValue, popCardValue, postArticle, categoryGroup, cardLoading, isDraft, categoryLazyLoading, currentArticle, editorLoading, editorLabel }
  }
})
</script>
