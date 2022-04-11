<template v-uf='item.show'>
  <q-item-label
    header
    class="text-weight-bold text-uppercase"
    v-if='subtitle'
  >
    {{ subtitle }}
  </q-item-label>

  <template v-if='item.children && item.children.length > 0'>

      <q-expansion-item
        :icon="item.icon"
        :label="item.label"
        expand-separator
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="grey" :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </template>

        <q-list padding>
          <template v-for="(v, i) in item.children" :key="v.name + i">
            <q-item
              v-if='v.show'
              class="q-pl-lg"
              @click="$router.push(v.to || '/')"
              v-ripple
              clickable
            >
              <q-item-section avatar>
                <q-icon color="grey" :name="v.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ v.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-expansion-item>

  </template>

  <template v-else>

    <q-item v-ripple clickable @click="$router.push(item.to || '/')">
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
import { Nav } from './nav';


export type SlideItemType = PropType<Nav>

export default  defineComponent({
  name: 'SlideItem',
  props: {
    subtitle: String,
    item : {
      type: Object as SlideItemType,
      required: true
    },
  },
  setup () {
    return {}
  }
})
</script>


