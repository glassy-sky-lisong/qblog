<template>
  <q-item-label class="text-weight-bold text-uppercase q-item__label--header">
    subTitle
  </q-item-label>
  <q-item v-ripple clickable @click="$router.push('/')">
    <q-item-section avatar>
      <q-icon color="grey" :name="link0.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ link0.label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang='ts'>
import { navProp } from 'src/layouts/navData'
import { defineComponent, PropType } from 'vue'

type SlideGropItem = PropType<navProp | navProp[]>

export default defineComponent({
  name:'SlideGrop',
  props: {
    subtitle: {
      type: String,
      required: false,
      default: 'notfound'
    },
    item: {
      type: String | Number,
    }
  }
})
</script>
