<template>
  <q-item v-ripple>
    <q-item-section>
      <q-item-label v-if='captionLabel' caption>{{ captionLabel }}</q-item-label>
      <q-item-label class='row q-pl-md'>
        <div style='width: 8rem;margin-top: auto; margin-bottom: auto;font-size: 1.2em;'>
          {{ leftLabel }}
        </div>
        <div class='q-my-auto' style='flex: 1;max-width: 18.6rem;text-overflow: ellipsis;overflow: hidden;'>
          <slot></slot>
        </div>
        <q-btn
          v-if='btnLabel && btnLabel !== ""'
          :label='btnLabel'
          :size='sizes'
          :style='btnStyle'
          :class='btnClass'
          @click='$emit("btnClick")'
          class='q-ml-md'
        ></q-btn>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'simpleItem',
  emits: [ 'btnClick' ],
  props: {
    leftLabel: {
      type: String,
      default: () => ''
    },
    btnLabel: {
      type: String,
      default: () => ''
    },
    captionLabel: {
      type: String,
    },
    btnStyle: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => ({})
    },
    btnClass: String,
    sizes: {
      type: String as PropType< 'md' | 'lg' | 'xl' | 'xs' | 'sm' >,
      default: () => 'sm'
    }
  }
})
</script>
