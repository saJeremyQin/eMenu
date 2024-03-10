
<template>
  <div class="home-wrapper">
    <h1>{{userFireBaseState}}</h1>
  </div>
</template>

<script setup>
import auth from '@/firebase';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../store/AuthStore';
import fetchClient from '@/utils/fetchClient';

const userFireBaseState = ref();
const userStore = useAuthStore();

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const emailConfirmed = urlParams.get('confirm_email');
  console.log('this is url parameter of emailConfirmed:'+emailConfirmed);
  if(emailConfirmed) {
    userStore.resetAuthorizationHeader();
  }
  userFireBaseState.value = auth.currentUser.emailVerified;
  if(auth.currentUser.emailVerified !== userStore.contentfulVerified) {
    // can be put in if emailConfirmed?
    await fetchClient.put('/api/users/updateVerified', {
      verified: userFireBaseState.value,
    });
    userStore.setContentfulVerified(userFireBaseState.value);
    console.log(userStore.contentfulVerified);
  }
})

</script>

<style scoped>
</style>
