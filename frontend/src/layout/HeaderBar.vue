<template>
    <v-app-bar title="Application bar">
        <v-btn @click="logout">logout</v-btn>
    </v-app-bar>
</template>

<script setup>
import { useAuthStore } from '@/store/AuthStore';
const authStore = useAuthStore();
const logout = () => {
    authStore.logout();
}
</script>