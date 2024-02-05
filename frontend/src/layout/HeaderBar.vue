<template>
    <v-app-bar
        color="#25262d"
    >
        <template v-slot:prepend>
            <v-img :src="iconImg" class="icon-img" />
        </template>

        <v-app-bar-title>eMenu</v-app-bar-title>

        <template v-slot:append>
          <v-btn @click="logout">logout</v-btn>
        </template>
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
    margin-left: 20px;
}

.btn-end {
text-align: end;
}
</style>
  