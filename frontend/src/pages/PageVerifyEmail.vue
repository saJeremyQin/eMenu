<template>
    <!-- <v-card>
        <v-card-title>
            You haven't verified your email. To use eMenu, it needs to be verified.
        </v-card-title>
        <v-btn>Go to mailbox</v-btn>
    </v-card> -->
    <v-container class="container">
      <v-row class="row-style">
        <v-col cols="6">
          <v-card color="#385F73" theme="dark" class="card-position">
            <v-card-title class="text-h5">
              Verify Email
            </v-card-title>
            <v-card-subtitle>You haven't verified your email. To use eMenu, it needs to be verified..</v-card-subtitle>
            <v-card-actions>
              <v-btn variant="text" @click="openMailBox">
                Go to mailbox
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          color="deep-purple-accent-4"
          elevation="24"
          class="snackbar-position"
          position="fixed"
        >
          {{ messageText }}
        </v-snackbar>
      </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import auth from '@/firebase';
import eventBus from '@/utils/eventBus';
const messageText = ref();
const snackbar = ref(false);

const openMailBox = () => {
    const userEmail = auth.currentUser.email;
    const domain = userEmail.split('@')[1];
    const mailBoxUrl = `https://${domain}`;
    window.location.href = mailBoxUrl;
}

eventBus.on('verification-email-sent', (text) => {
  messageText.value=text;
  snackbar.value=true;
})
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.row-style {
    justify-content: center;
    align-items: center;
}

.card-position {
  position: relative;
}
.snackbar-position {
  position: fixed; 
  top: 20px; 
  left: 50%; 
  transform: translateX(-50%);;
}
</style>