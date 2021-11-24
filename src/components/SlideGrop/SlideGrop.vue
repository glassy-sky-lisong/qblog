<template>
  <q-item-label
    class="text-weight-bold text-uppercase q-item__label--header"
    v-if='subtitle'
  >
    {{ subtitle }}
  </q-item-label>

  <template v-if='Array.isArray(item)'>
    <q-item
      v-ripple
      clickable
      v-for='(v, i) in item'
      :key='i + v.label'
      @click="$router.push('/')"
    >
      <q-item-section avatar>
        <q-icon color="grey" :name="item.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>item.label</q-item-label>
      </q-item-section>
    </q-item>
  </template>
  <template v-else>
    <q-item v-ripple clickable @click="$router.push('/')">
      <q-item-section avatar>
        <q-icon color="grey" :name="item.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>item.label</q-item-label>
      </q-item-section>
    </q-item>
  </template>
</template>

<script lang='ts' >
import { defineComponent, PropType } from 'vue';
import { navProp } from '../../layouts/navData';

export type SlideGropType = PropType<navProp | navProp[]>

export default  defineComponent({
  name: 'SlideGrop',
  props: {
    subtitle: String,
    item : [Object, Array] as SlideGropType,
  },
  setup (props) {
    console.log(props.item, props.subtitle)
    return {}
  }
})
</script>


