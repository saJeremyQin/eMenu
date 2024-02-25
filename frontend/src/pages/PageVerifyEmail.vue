<template>
    <!-- <v-card>
        <v-card-title>
            You haven't verified your email. To use eMenu, it needs to be verified.
        </v-card-title>
        <v-btn>Go to mailbox</v-btn>
    </v-card> -->
    <v-container>
      <v-row class="row-style">
        <v-col cols="6">
          <v-card color="#385F73" theme="dark">
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
    </v-container>
</template>

<script setup>
import auth from '@/firebase';
const openMailBox = () => {
    const userEmail = auth.currentUser.email;
    const domain = userEmail.split('@')[1];
    const mailBoxUrl = `https://${domain}`;
    window.location.href = mailBoxUrl;
}
</script>

<style lang="scss" scoped>
.row-style {
    justify-content: center;
    align-items: center;
}
</style>