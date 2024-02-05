<template>
    <v-main class="main-section">
        <slot />
    </v-main>
</template>

<style lang="scss" scoped>
    .main-section {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
    }
</style>