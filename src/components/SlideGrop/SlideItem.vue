<template>
  <q-item-label
    header
    class="text-weight-bold text-uppercase"
    v-if='subtitle'
  >
    {{ subtitle }}
  </q-item-label>

  <template v-if='Array.isArray(item)'>

    <template  v-for='(v, i) in item' :key='i + v.label'>

      <q-expansion-item
        v-if="v.children"
        :icon="v.icon"
        :label="v.label"
        expand-separator
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="grey" :name="v.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ v.label }}</q-item-label>
          </q-item-section>
        </template>

        <q-list padding>
          <q-item
            v-for="(c, n) in v.children"
            :key="c.label + n"
            class="q-pl-lg"
            @click.stop='$emit("add-tab", c)'
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="c.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ c.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <q-item
        v-ripple
        clickable
        v-else
        @click="v.to !== '/' ? $emit('add-tab', v) : $router.push('/')"
      >
        <q-item-section avatar>
          <q-icon color="grey" :name="v.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ v.label }}</q-item-label>
        </q-item-section>
      </q-item>

    </template>


  </template>

  <template v-else>

    <q-item v-ripple clickable @click="item.to !== '/' ? $emit('add-tab', item) : $router.push('/')">
      <q-item-section avatar>
        <q-icon color="grey" :name="item.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ item.label }}</q-item-label>
      </q-item-section>
    </q-item>

  </template>

</template>

<script lang='ts' >
import { defineComponent, PropType } from 'vue';
import { navProp } from '../../layouts/navData';

export type SlideItemType = PropType<navProp | navProp[]>

export default  defineComponent({
  name: 'SlideItem',
  props: {
    subtitle: String,
    item : [Object, Array] as SlideItemType,
  },
  emits: [ 'add' ],
  setup (props) {
    console.log(props.item, props.subtitle)
    return {}
  }
})
</script>


