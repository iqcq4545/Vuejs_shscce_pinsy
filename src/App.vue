<template>
  <div id="app">
    <router-view v-if="isReload"></router-view>
    <tabbar></tabbar>

  </div>
</template>

<script>
  import tabbar from '@/components/tabbar';

  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isReload: true
      }
    },
    components: {
      "tabbar": tabbar
    },
    watch: {

    },
    mounted() {
      window.onresize = function () { fontSize() }
    },
    methods: {
      reload() {
        this.isReload = false;
        this.$nextTick(function () {
          this.isReload = true;
        })
      }
    }

  }
</script>

<style>
  @import "./css/app.css";
</style>