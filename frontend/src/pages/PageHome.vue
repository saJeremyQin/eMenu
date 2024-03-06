
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
  userFireBaseState.value = auth.currentUser.emailVerified;
  if(auth.currentUser.emailVerified !== userStore.contentfulVerified) {
    // console.log('emailVerified is ', auth.currentUser.emailVerified);
    const authToken = userStore.user?.idToken();
    console.log('authToken in pageLogin is', authToken);

    fetchClient.defaults.headers.common['Authorization']=`Bearer ${authToken}`;

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
