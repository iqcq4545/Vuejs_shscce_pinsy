<template>
  <div class="toast" v-show="toastShow">
    {{toastText}}
  </div>
</template>

<script>
  export default {
    name: 'toast',
    data() {
      return {
        toastText,
        icon: "none",
        duration: duration
      }
    },
    mounted() {

    },
    methods: {
      
    },
    props : ['toastText'],
  }
</script>

<style scoped>
    .wrap{
      position: fixed;
      left: 50%;
      top:50%;
      background: rgba(0,0,0,.35);
      padding: 10px;
      border-radius: 5px;
      transform: translate(-50%,-50%);
      color:#fff;
    }
  </style>
