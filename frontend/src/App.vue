<template>
  <component :is="$route.meta.layout || 'div'">
    <router-view />
  </component>
</template>

<script setup>
import { useAuthStore } from './store/AuthStore';
import { onBeforeMount } from 'vue';

const authStore = useAuthStore();

onBeforeMount(() => {
  authStore.setUserFromFirebase();
})
</script>

<style>

</style>
