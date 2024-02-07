<template>
  <component :is="$route.meta.layout || 'div'">
    <router-view />
  </component>
</template>

<script setup>
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
  // authStore.setUserFromFirebase();
  // onAuthStateChanged(auth, (user) => {
  //   console.log('user in app.vue is ', user);
  //   authStore.setUser(user);
  //   if (router.isReady() && router.currentRoute.value.path === '/login') {
  //       router.push('/home')
  //   }
  // })
})
</script>

<style>

</style>
