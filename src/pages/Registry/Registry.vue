<template>
  <div class='row justify-center items-center web_bg'>
    <q-form>
      <q-card bordered class='q-px-lg q-py-xl' style='width: 500px;'>
        <q-card-section>
          <div class='text-h4 text-center'>注册账号</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model='username'
            name='username'
            label='用户名'
          ></q-input>
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
        <q-card-section class='row'>
          <div class='q-my-auto text-weight-bold q-mr-md' style='font-size: 1rem;'>性别:</div>
          <q-radio v-model='gender' val='0' class='q-mr-md'>男</q-radio>
          <q-radio v-model='gender' val='1'>女</q-radio>
        </q-card-section>
        <q-card-section>
          <q-date v-model='birthday' name='birthday'></q-date>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Registry',
  setup() {
  //  refs
    const username = ref("");
    const password = ref("");
    const repassword = ref("");
    const gender = ref("");
    const birthday = ref("");

    return { username, password, repassword, gender, birthday };
  }
})
</script>

<style lang='sass'>
.web_bg
  background: url(~assets/web_bg.webp)
  height: 100vh
  background-repeat: no-repeat
  background-position: center
  background-size: cover
</style>
