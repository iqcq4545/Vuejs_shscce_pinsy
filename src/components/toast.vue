<template>
  <div class="toast">
    {{toastText}} </div>
</template>

<script>
  export default {
    name: 'toast',
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    },
    props: ['toastText'],
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    float: left;
    background: rgba(0, 0, 0, .66);
    padding: .25rem .3rem;
    font-size: .28rem;
    line-height: .38rem;
    border-radius: .1rem;
    transform: translate(-50%, -50%);
    color: #fff;
  }
</style>