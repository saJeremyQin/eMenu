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
              @click="selectItem(item.title)"
          ></v-list-item>
        </template>

        <v-list-item 
          v-for="subMenu in item.subMenuItems" 
          :key="subMenu" 
          :title="subMenu.title" 
          prepend-icon="mdi-bat"
          class="menu-item"
          :class="{'selected':selectedItem === subMenu.title}"
          @click="selectItem(subMenu.title)"
        >
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
const drawer = ref(true);
const opened = ref([]);
const selectedItem = ref(null);

const selectItem = (value) => {
  selectedItem.value = value;
}

const menuItems = ref([
  {
    title: 'Home',
    active: true,
    subMenuItems:[],
  },
  {
    title: 'Dish Management',
    active: false,
    subMenuItems: [
      {
        title:'Dish Types',
      },
      {
        title:'Dishes',
      }, 
      {
        title:'Create Dish',
      },
    ],
  },
  {
    title: 'Waiter Management',
    active: false,
    subMenuItems: [
      {
        title:'Waiters',
      }, 
      {
        title:'Create Waiter',
      }],
  },
  {
    title: 'Restaurant',
    active: false,
    subMenuItems: [
      {
        title:'Restaurant Info',
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
