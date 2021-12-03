<template>
  <q-page>
    add article
<!--    <v-md-editor v-model='content' height='300px'></v-md-editor>-->
    <q-editor
      v-model='content'
      v-model:fullscreen='isFullScreen'
      :definitions='{
        save: {
          tip: "保存",
          icon: "save",
          label: "保存",
          handler: saveDoc,
        }
      }'
      :toolbar='[
        ["save"]
      ]'
    ></q-editor>
  </q-page>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
export default defineComponent({
  name: 'addArticle',
  setup () {
    const content = ref('')
    const isFullScreen = ref(false)
    const $q = useQuasar()

    const saveDoc = () => {
      console.log(content.value)
      $q.notify({
        message: '保存成功',
        icon: 'success'
      })
    }
    return { content, isFullScreen, saveDoc }
  }
})
</script>
