<template>
    <div class='row justify-center items-center web_bg'>
      <q-form style='max-width: 320px;' @submit='onSubmit'>
          <q-card bordered class='q-py-sm q-px-xl'>
            <q-card-section>
              <div class='text-h5 text-center'>登录</div>
            </q-card-section>
              <q-card-section class='text-center'>
                <q-input
                  clearable
                  clear-icon='close'
                  v-model='username'
                  name='username'
                  label='用户名'
                  aria-placeholder='UserName'
                  :disable='isSubmit ? true : false'
                  :rules='[ val => !!val || "用户名不能为空" ]'
                >
                  <template #prepend>
                    <q-icon name='contacts' />
                  </template>
                </q-input>
              </q-card-section>
              <q-card-section>
                <q-input
                  v-model='password'
                  name='password'
                  label='密码'
                  aria-placeholder='PassWord'
                  :type="isPwd ? 'password' : 'text'"
                  :disable='isSubmit ? true : false'
                  :rules='[ val => !!val || "密码不能为空" ]'
                >
                  <template v-slot:prepend>
                    <q-icon name='vpn_key' />
                  </template>

                  <template v-slot:append>
                    <q-icon
                      v-show='password.length > 0'
                      :name='isPwd ? "visibility_off" : "visibility"'
                      @click='isPwd = !isPwd'
                    />
                  </template>
                </q-input>
              </q-card-section>
              <q-card-section style='flex-direction: row;'>
                <q-checkbox v-model='remember' name='remember-me' label='记住密码' color='cyan' :disable='isSubmit ? true : false'  />
                <q-btn dense type='a' to='/registry' flat text-color='primary' size='xs' label='没账号，点击注册!'></q-btn>
              </q-card-section>
              <q-card-section class='row justify-around'>
                <q-btn type='submit' label='登录' :loading='isSubmit ? true : false' ></q-btn>
              </q-card-section>
          </q-card>
      </q-form>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useStore, isLogin } from 'src/store'
import { useQuasar } from 'quasar';

export default  defineComponent({
  name: 'Login',
  setup () {
    // reference ref
    const username = ref('')
    const password = ref('')
    const remember = ref(false)
    const isPwd = ref(true)
    const isSubmit = ref(false)
    const router = useRouter()
    const store = useStore()
    const $q = useQuasar()

    // components or dom ref
    const pwdRef = ref(null)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

    // methods
    const onSubmit = (evt: Event) => {
      if (evt.target) {
        const formData = new FormData(evt.target as HTMLFormElement)
        formData.set('remember-me', remember.value ? '1' : '0');
        // for (let i of formData.entries()) {
        //   console.log(i)
        // }
        isSubmit.value = true
        store.dispatch('login', formData).then(
          res => {
            if (res) {
              const notify = $q.notify({
                type: 'info',
                message: '登陆成功'
              })
              isSubmit.value = false;
              setTimeout(() => {
                notify()
                void router.push('/')
              }, 1500)
            } else {
              const notify = $q.notify({
                type: 'warn',
                message: '登陆失败'
              })
              setTimeout(() => {
                notify()
                void router.push('/login')
              }, 1500)
            }
          }
       ).catch(err => {
         console.error(err)
        })
      }
    }

    const autoLogin = () => {
      if(isLogin(store.state)) {
        const notify = $q.notify({
          type: 'primary',
          message: '检测到登录状态，自动登录中...'
        })
        setTimeout(() => { notify(); void router.push('/') }, 1500);
      }
    }

    onMounted(() => {
      autoLogin();
    })

    return { username, password, remember, isPwd, pwdRef, onSubmit, isSubmit }
  }
})
</script>

<style  lang='sass'>
.web_bg
  background: url(~assets/web_bg.webp)
  height: 100vh
  background-repeat: no-repeat
  background-position: center
  background-size: cover
</style>
