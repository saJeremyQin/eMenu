<template>
    <v-layout class="rounded rounded-md">
      <header-bar />
      <v-container>
        <nav-drawer />
        <main-section>
          <router-view />
        </main-section>
      </v-container>
    </v-layout>
</template>

<script setup>
import HeaderBar from './HeaderBar.vue';
import NavDrawer from './NavDrawer.vue';
import MainSection from './MainSection.vue';
</script>