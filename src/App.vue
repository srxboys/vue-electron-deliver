<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive" :key="key"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    key () {
      const name = this.$route.name
      if (name) {
        return name + new Date()
      }
      return this.$route + new Date()
    }
  }
}
</script>

<style>
@import './assets/styles/index.css';
</style>
