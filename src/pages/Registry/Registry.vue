<template>
  <div class='row justify-center items-center web_bg'>
    <q-form @submit='onSubmit'>
      <q-card bordered class='q-px-lg q-py-xl' style='width: 500px;'>
        <q-card-section>
          <div class='text-h4 text-center'>注册账号</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model='username'
            name='username'
            label='用户名'
            :rules='[ val => !!val || "用户名不能为空", val => true || "用户名不可以带有特殊字符" ]'
          ></q-input>
        </q-card-section>
        <q-card-section class='row'>
          <div class='q-my-auto q-mr-xl' style='font-size: 1rem;'>性别:</div>
          <q-radio v-model='gender' val='0' class='q-mr-md'>男</q-radio>
          <q-radio v-model='gender' val='1'>女</q-radio>
        </q-card-section>
        <q-card-section class='row'>
          <div class='q-my-auto q-mr-xl' style='font-size: 1rem;'>出生年月日： </div>
          <q-input
            filled
            v-model="birthday"
            name='birthday'
            style='width: 50%'
            :rules='[ val => !!val || "日期不能为空", val => val === "请选择日期" || "请点击此按钮选择日期" ]'
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="birthday" mask="YYYY-MM-DD" v-close-popup>
                    <div class="row items-center justify-end">
                      <q-btn label="获取当前日期" color="primary" flat @click='getCurrentDate' />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input v-model='email' name='email' label='电子邮箱'></q-input>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model='password'
            name='password'
            label='密码'
          ></q-input>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model='repassword'
            label='确认密码'
          ></q-input>
        </q-card-section>
        <q-card-section style='display: none;'>
          <q-input model-value='user' name='role' label='用户权限'></q-input>
        </q-card-section>
        <q-card-section class='q-mt-md row justify-center'>
          <q-btn
            type='submit'
           label='提交'
           color='info'
           size='lg'
           class='q-px-lg'
          >
          </q-btn>
        </q-card-section>
        <q-inner-loading
          :showing="visible"
        >
          <q-spinner-gears size="50px" color="primary" />
          <div class='text-teal q-mt-xl' style='font-size: 1.3rem;'>正在注册请等待...</div>
        </q-inner-loading>
      </q-card>
    </q-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar'
import validation from 'src/utils/validation'

export default defineComponent({
  name: 'Registry',
  setup() {
  //  refs
    const username = ref('');
    const password = ref('');
    const repassword = ref('');
    const gender = ref('0');
    const birthday = ref('请选择日期');
    const email = ref('');
    const visible = ref(false);
    const $q = useQuasar();

    //vars
    const { haveSpecialCharacter } = validation

    console.log(haveSpecialCharacter('~target'))

    //methods
    const onSubmit = (evt: Event) => {
      if (evt.target) {
        const formData = new FormData(evt.target as HTMLFormElement);
        for(let i of formData.entries()) {
          console.log(i)
        }

        visible.value = true
        setTimeout(() => {
          visible.value = false;
          $q.notify({
            message: '注册成功',
            position: 'center',
            color: 'primary'
          })
        }, 3000)

      } else {
        console.log('evt target is null')
      }
    }

    const getCurrentDate = () => {
      console.log('123')
    }
    return { username, password, repassword, gender, birthday, email, visible, onSubmit, getCurrentDate, haveSpecialCharacter };
  }
})
</script>

<style lang='sass'>
.web_bg
  background: url(~assets/web_bg.webp)
  height: 150vh
  background-repeat: no-repeat
  background-position: center
  background-size: cover
</style>
