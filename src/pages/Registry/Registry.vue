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
            :rules='[ val => !!val || "用户名不能为空", val => !haveSpecialCharacter(val) || "用户名不可以带有特殊字符" ]'
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
            style='width: 50%;'
            mask='####-##-##'
            :rules='[ val => !!val || "请选择日期", val => isbirthday(val) || "非法的日期格式" ]'
            aria-placeholder='请选择日期'
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale"  v-close-popup>
                  <q-date v-model="birthday" mask="YYYY-MM-DD" >
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
          <q-input
            v-model='email'
            name='email'
            label='电子邮箱'
            :rules='[val => !!val || "邮箱不能为空", val => isEmail(val) || "非法的邮箱格式"]'
          ></q-input>
        </q-card-section>
        <q-card-section>
          <q-input
            :type='pwdVisibility ? "text" : "password"'
            v-model='password'
            name='password'
            label='密码'
            :rules='[ val => !!val || "密码不可以是空值", val => validPassword(val) || "密码长度8-18，包括字母、数字，字母区分大小写", ]'
            aria-placeholder='密码长度8-18，包括字母、数字，字母区分大小写'
          >
            <template v-slot:append>
              <q-icon
                @click='pwdVisibility = !pwdVisibility'
                :name='pwdVisibility ? "visibility" : "visibility_off"'
                style='cursor: pointer'
              ></q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input
            :type='repwdVisibility ? "text" : "password"'
            v-model='repassword'
            label='确认密码'
            :rules='[ val => !!val || "你还没有确认密码", val => (!!password && val === password) || "密码与二次确认不一致" ]'
            aria-placeholder='请再输入一遍密码'
          >
            <template v-slot:append>
              <q-icon
                @click='repwdVisibility = !repwdVisibility'
                :name='repwdVisibility ? "visibility" : "visibility_off"'
                style='cursor: pointer;'
              ></q-icon>
            </template>
          </q-input>
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
import { useRouter } from 'vue-router'
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
    const birthday = ref('2000-01-01');
    const email = ref('');
    const visible = ref(false);
    const pwdVisibility = ref(false);
    const repwdVisibility = ref(false);
    const $q = useQuasar();
    const router = useRouter();

    //vars
    const { haveSpecialCharacter, isbirthday, isEmail, validPassword } = validation

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
          const n1 = $q.notify({
            message: '注册成功',
            position: 'center',
            color: 'primary',
          })

          setTimeout(() => {
            n1();
            void router.push('/login');
          }, 500)
        }, 3000)

      } else {
        console.log('evt target is null')
      }
    }

    const getCurrentDate = () => {
      console.log('123')
    }
    return { username, password, repassword, gender, birthday, email, visible, onSubmit, getCurrentDate, haveSpecialCharacter, isbirthday, isEmail, pwdVisibility, repwdVisibility, validPassword };
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
