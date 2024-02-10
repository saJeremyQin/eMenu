<template>
  <v-navigation-drawer v-model="drawer" class="drawer">
    <v-list density="compact" :opened="opened" @update:opened="opened = $event.slice(-1)">
      <v-list-group v-for="item in menuItems" :key="'group_'+item.title" :value="item">
        <template v-slot:activator="{props}">
          <v-list-item  
            v-bind="props"
            :key="'item_'+item.title" 
            @click="selectItem(item.title, item.path)"
            :class="{'menu-item--selected': selectedItem === item.title}"
          >
            <router-link :to="{path: item.path}" class="menu-item__link">
              <v-icon :icon="item.icon" class="menu-item__icon"></v-icon>            
              <v-list-item-content  class="menu-item__content">
                {{ item.title }}
              </v-list-item-content>
            </router-link>
          </v-list-item>     
        </template>

        <v-list-item 
          v-for="subMenu in item.subMenuItems" 
          :key="subMenu" 
          class="menu-item"
          :class="{'menu-item--selected': selectedItem === subMenu.title}"
          @click="selectItem(subMenu.title, subMenu.path)"
          >
            <router-link :to="{path: subMenu.path}" class="menu-item__link">
              <v-icon :icon="subMenu.icon" class="menu-item__icon"></v-icon>            
              <v-list-item-content class="menu-item__content">
                {{ subMenu.title }}
              </v-list-item-content>
            </router-link>
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

const selectItem = (title, path) => {
  selectedItem.value = title;
  console.log('path is', path);
}

const menuItems = ref([
  {
    title: 'Home',
    path:'/home',
    icon:'mdi-home',
    active: true,
    subMenuItems:[],
  },
  {
    title: 'Dish Management',
    path:'/dishes',
    icon:'mdi-chili-hot',
    active: false,
    subMenuItems: [
      {
        title:'Dish Types',
        path:'/dishTypes',
        icon:'mdi-carrot'
      },
      {
        title:'Dishes',
        path:'/dishes',
        icon:'mdi-cake'
      }, 
      {
        title:'Create Dish',
        path:'/createDish',
        icon:'mdi-candy'
      },
    ],
  },
  {
    title: 'Waiter Management',
    path:'/waiters',
    icon:'mdi-account-box-outline',
    active: false,
    subMenuItems: [
      {
        title:'Waiters',
        path:'/waiters',
        icon:'mdi-account-tie'
      }, 
      {
        title:'Create Waiter',
        path:'/createWaiter',
        icon:'mdi-account-edit'
      }],
  },
  {
    title: 'Restaurant',
    path:'/restaurantInfo',
    icon:'mdi-table-chair',
    active: false,
    subMenuItems: [
      {
        title:'Restaurant Info',
        path:'/restaurantInfo',
        icon:'mdi-silverware'
      }],
  },
]);

</script>


<style lang="scss" scoped>
.drawer {
  background-color: #3a3d48;
}

.menu-item {
  &__content {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
    padding-left: 8px; 
    color: #fbfbfc; 
    text-decoration: none; 
  }

  &--selected {
    background-color: #429488 !important;
    color: #fff !important;
    text-decoration: none;
  }

  &__icon {
    color: #fbfbfc;
  }

  &__link {
    text-decoration: none; // 移除链接的下划线
  }
}
</style>
