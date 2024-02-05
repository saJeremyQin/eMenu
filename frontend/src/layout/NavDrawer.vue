<template>
  <v-navigation-drawer v-model="drawer" temporary class="drawer">
    <v-list density="compact" :opened="opened" @update:opened="opened = $event.slice(-1)">
      <v-list-group v-for="item in menuItems" :key="'group_'+item.title" :value="item">
        <template v-slot:activator="{props}">
            <v-list-item
                v-bind="props"
                :key="'item_'+item.title" 
                :title="item.title"
            ></v-list-item>
        </template>

        <v-list-item v-for="subMenu in item.subMenuItems" :key="subMenu" :title="subMenu"></v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
const drawer = ref(true);
const opened = ref([]);

const menuItems = ref([
  {
    title: 'Home',
    active: true,
    subMenuItems:[],
  },
  {
    title: 'Dish Management',
    active: false,
    subMenuItems: ['Dish Types','Dishes', 'Create Dish'],
  },
  {
    title: 'Waiter Management',
    active: false,
    subMenuItems: ['Waiters', 'Create Waiter'],
  },
  {
    title: 'Restaurant',
    active: false,
    subMenuItems: ['Restaurant Info'],
  },
]);

</script>

<style scoped>
.drawer {
  background-color: #3a3d48;
  color: #fbfbfc;
}

.menu-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  cursor: pointer;
}

.selected {
  background-color: #429488 !important;
  color: #fff !important;
}
</style>
