<template>
  <v-navigation-drawer v-model="drawer" temporary class="drawer">
    <v-list density="compact" :opened="opened" @update:opened="opened = $event.slice(-1)">
      <v-list-group v-for="item in menuItems" :key="'group_'+item.title" :value="item" prepend-icon="mdi-home">
        <template v-slot:activator="{props}">
          <v-list-item  
            v-bind="props"
            :key="'item_'+item.title" 
            :title="item.title"
            class="menu-item"
            :class="{'selected':selectedItem === item.title}"
            @click="selectItem(item.title, item.path)"
          >
          </v-list-item>     
        </template>

        <v-list-item 
          v-for="subMenu in item.subMenuItems" 
          :key="subMenu" 
          :title="subMenu.title" 
          prepend-icon="mdi-bat"
          class="menu-item"
          :class="{'selected':selectedItem === subMenu.title}"
          @click="selectItem(subMenu.title, subMenu.path)"
        >
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
const drawer = ref(true);
const opened = ref([]);
const selectedItem = ref(null);

const selectItem = (title, path) => {
  selectedItem.value = title;
  router.push({
    path: path
  })
}

const menuItems = ref([
  {
    title: 'Home',
    path:'/home',
    active: true,
    subMenuItems:[],
  },
  {
    title: 'Dish Management',
    path:'/about',
    active: false,
    subMenuItems: [
      {
        title:'Dish Types',
        path:'/about'
      },
      {
        title:'Dishes',
        path:'/about',
      }, 
      {
        title:'Create Dish',
        path:'/about',
      },
    ],
  },
  {
    title: 'Waiter Management',
    path:'/about',
    active: false,
    subMenuItems: [
      {
        title:'Waiters',
        path:'/about',
      }, 
      {
        title:'Create Waiter',
        path:'/about',
      }],
  },
  {
    title: 'Restaurant',
    path:'/about',
    active: false,
    subMenuItems: [
      {
        title:'Restaurant Info',
        path:'/about'
      }],
  },
]);

</script>

<style scoped>
.drawer {
  background-color: #3a3d48;
  color: #fbfbfc;
}

:deep(.menu-item) {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
  cursor: pointer;
  padding-left: 2px; /* Adjust the gap between icon and text */
}

.selected {
  background-color: #429488 !important;
  color: #fff !important;
}
</style>
