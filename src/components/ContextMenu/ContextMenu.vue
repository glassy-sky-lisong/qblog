<template>
  <q-menu touch-position context-menu>
    <q-list dense style="min-width: 100px">
      <c-menu-item label="Open..." ></c-menu-item>
      <!-- <q-item clickable v-close-popup>
        <q-item-section>Open...</q-item-section>
      </q-item>
      <q-item clickable v-close-popup>
        <q-item-section>New</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable>
        <q-item-section>Preferences</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>

        <q-menu anchor="top end" self="top start">
          <q-list>
            <q-item v-for="n in 3" :key="n" dense clickable>
              <q-item-section>Submenu Label</q-item-section>
              <q-item-section side>
                <q-icon name="keyboard_arrow_right" />
              </q-item-section>
              <q-menu auto-close anchor="top end" self="top start">
                <q-list>
                  <q-item v-for="n in 3" :key="n" dense clickable>
                    <q-item-section>3rd level Label</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup>
        <q-item-section>Quit</q-item-section>
      </q-item> -->
    </q-list>
  </q-menu>
</template>

<script lang="ts">
import CMenuItem from 'src/components/ContextMenu/MenuItem.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContextMenu',
  components: { CMenuItem }
});
</script>
