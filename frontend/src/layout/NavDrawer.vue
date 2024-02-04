<template>
    <v-navigation-drawer class="drawer">
      <v-list>
        <v-list-item-group v-for="(item, index) in menuItems" :key="index">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="menu-title">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-list-item v-for="(childItem, childIndex) in item.children" :key="childIndex" v-on="on">
                <v-list-item-content>
                  <v-list-item-title>{{ childItem.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-list></v-list> 
          </v-menu>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script setup>
const menuItems = [
  {
    text: 'Home',
    children: [
      { text: 'Dashboard' },
      { text: 'Profile' },
    ],
  },
  {
    text: 'Dish Management',
    children: [
      { text: 'Dish Types' },
      { text: 'Dishes' },
      { text: 'Create Dish' },
    ],
  },
  {
    text: 'Waiter Management',
    children: [
      { text: 'Waiters' },
      { text: 'Create Waiter' },
    ],
  },
  {
    text: 'Restaurant',
    children: [
      { text: 'Restaurant Info' },
    ],
  },
];

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
}
.v-menu {
  margin-left: 20px;
}
</style>

 

