<template>
  <q-item-label class="text-weight-bold text-uppercase q-item__label--header">
    subTitle
  </q-item-label>
  <q-item v-ripple clickable @click="$router.push('/')">
    <q-item-section avatar>
      <q-icon color="grey" name="123" />
    </q-item-section>
    <q-item-section>
      <q-item-label>123</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang='ts'>
import { navProp } from 'src/layouts/navData'
import { defineComponent, defineProps, onMounted } from 'vue'

interface SlideGropProp {
  subtitle?: string;
  item?: navProp | navProp[]
}

export default defineComponent({
  name:'SlideGrop',
  setup () {
    const props = defineProps<SlideGropProp>()

    onMounted(() => {
       console.log(props.subtitle, props.item)
    })

    return {
      props
    }

  }
})
</script>
