<template>
  <q-separator v-if='separator' />
  <q-item clickable class=''>
    <q-item-section style='flex-direction: row;justify-content: flex-start;align-items: center;'>
      <q-icon name='' tag='span' class='q-mr-xs' />
      <span>{{ label }}</span>
    </q-item-section>
    <q-item-section v-if='icon' avatar>
      <q-icon :name='icon'></q-icon>
    </q-item-section>

    <q-menu
      anchor="top end"
      self="top start"
    >
      <q-list  dense style='min-width: 220px; width: 100%;'>
        <slot></slot>
      </q-list>
    </q-menu>
  </q-item>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExtendMenuItem',
  props: {
    label: String,
    icon: {
      type: String,
      required: false,
    },
    separator: {
      type: Boolean,
      required: false,
    },
  }
})
</script>
