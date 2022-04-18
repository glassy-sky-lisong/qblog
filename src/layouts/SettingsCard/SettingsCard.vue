<template>
  <pop-card
    title='我是标题'
    v-model='settings'
    @save='saveCard'
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
        {{ editUser.username }}
        <q-popup-edit v-model="editUser.username" buttons v-slot="scope" label-set='确定' label-cancel='取消'>
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
        </q-popup-edit>
      </simple-item>
      <simple-item left-label='密码' btn-label='修改'>
        ***************
        <q-popup-edit v-model="editUser.password" buttons v-slot="scope" label-set='确定' label-cancel='取消'>
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
        </q-popup-edit>
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
</template>

<script lang='ts'>
import { UserProps } from 'src/store'
import { defineComponent, ref, PropType, onMounted, watch } from 'vue'
import PopCard from 'components/PopCard/PopCard.vue'
import SimpleList from 'src/components/simepleList/simpleList.vue'
import SimpleItem from 'src/components/simepleList/simpleItem.vue'

export default defineComponent({
  name: 'Procard',
  components: { PopCard, SimpleList, SimpleItem },
  props: {
   currentUser: {
     type: Object as PropType<UserProps>,
     required: true
   }
  },
  emits: [ 'updateUser' ],
  setup(props) {
    const editUser = ref<Partial<UserProps>>({
      id: -1,
      username: '',
      password: '',
    })

    watch(editUser.value, (n, o) => {
      console.log(n, o)
    })

    onMounted(() => {
      editUser.value.id = props.currentUser.id
      editUser.value.username = props.currentUser.username
      editUser.value.password = props.currentUser.password
    })

    return {
      editUser,
      settings: ref(false)
    }
  },
  methods: {
    saveCard(close: Function) {
      this.$emit('updateUser', this.editUser)
      close()
    },
    openCard() {
      this.settings = true
    }
  }
})
</script>
