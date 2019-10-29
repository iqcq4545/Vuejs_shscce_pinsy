<template>
  <div id="app">
    <router-view v-if="isReload"></router-view>
    <tabbar></tabbar>
    <toast v-if="toastOption.isShow" :toastText="toastOption.text"></toast>
  </div>
</template>

<script>
  import tabbar from '@/components/tabbar';
  import toast from '@/components/toast';

  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload,
        toast: this.toast
      }
    },
    data() {
      return {
        isReload: true,
        toastOption: { text: "123", icon: "", duration: undefined, isShow: false }
      }
    },
    components: {
      tabbar: tabbar,
      toast: toast
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
      },
      toast(option) {
        var that = this, k = ["text", "icon"];
        clearTimeout(that.toastOption.duration);
        for (var i in k) {
          that.toastOption[k[i]] = option[k[i]];
        }
        option.duration > 0 ? that.toastOption.isShow = true : undefined;
        that.toastOption.duration = setTimeout(function () { that.toastOption.isShow = false }, option.duration)
      },
    }
  }
</script>

<style>
  @import "./css/app.css";
</style>