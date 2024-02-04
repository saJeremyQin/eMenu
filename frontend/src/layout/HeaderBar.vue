<template>
    <v-app-bar color="#25262d" class="app-bar">
      <v-container class="app-bar-container">
        <v-row align="center">
          <v-col>
            <v-img :src="iconImg" class="icon-img" />
          </v-col>
          <v-col class="btn-end">
            <v-btn @click="logout" class="logout-btn">Logout</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/store/AuthStore';
  import iconImg from '@/assets/icon.png';
  
  const authStore = useAuthStore();
  
  const logout = () => {
    authStore.logout();
  };
  </script>
  
  <style lang="scss" scoped>
  .app-bar-container {
    max-width: 100%;
  }
  
  .icon-img {
    width: 64px;
    height: 64px;
  }
  
  .btn-end {
    text-align: end;
  }
  </style>
  