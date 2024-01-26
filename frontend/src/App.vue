<template>
  <component :is="$route.meta.layout || 'div'">
    <router-view />
  </component>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

</style>
