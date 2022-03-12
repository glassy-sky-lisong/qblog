<template>
  <teleport to='body'>
    <q-card v-if='modelValue' :style='{ "min-width": $q.screen.lt.sm ? "80vw" : "50vw" }' style='position: fixed;z-index: 2001;top: 50%; left: 50%; transform: translate(-50%, -50%);overflow: hidden;'>
      <q-card-section class='row justify-end' style='margin-top: -16px;margin-right: -16px;padding-bottom: 0; background-color: rgba(211,217,227,0.56);line-height: 2.5;' >
        <div class='text-secondary' style='font-weight: 600;margin-top: auto; margin-bottom: auto;flex: 1;text-align: center;'>
          {{ title }}
        </div>
        <q-btn-group flat>
          <slot name='icon1'></slot>
          <slot name='icon2'></slot>
          <q-btn icon='close' size='sm' @click='onClose'></q-btn>
        </q-btn-group>
      </q-card-section>
      <q-card-section class='q-mt-md' >
        <q-scroll-area :style='{ height: height, "min-height": minHeight, } '>
          <slot>
            此处内容为空
          </slot>
        </q-scroll-area>
      </q-card-section>
      <q-card-section class='row justify-center'>
        <q-btn :label='submitLabel === "" ? "保存配置" : submitLabel' @click='$emit("save", onClose)'></q-btn>
      </q-card-section>
      <q-inner-loading
        :showing='loading'
        :label='loadingLabel'
        color='primary'
      >
      </q-inner-loading>
    </q-card>
  </teleport>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PopCard',
  props: {
    title: {
      type: String,
      default: () => ''
    },
    height: {
      type: String,
      default: () => '200px'
    },
    minHeight: {
      type: String,
        default: () => '360px'
    },
    modelValue: {
      type: Boolean,
      default: () => false
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    loadingLabel: {
      type: String,
      default: () => ''
    },
    submitLabel: {
      type: String,
      default: () => ''
    }
  },
  emits: [ 'save', 'update:modelValue' ],
  setup(props, { emit }) {

    const $q = useQuasar()

    const onClose = () => {
      emit('update:modelValue', false)
    }

    return { onClose, $q }
  }
})
</script>
