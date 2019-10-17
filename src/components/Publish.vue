<template>

  <div class="page">
    <div class="container index">
      <div class='button'>
        ​<router-link to="/pubitem?type=sale">
          <div class='btnBox'>
            <img class="btnIco" src="../images/icon_fbcs.png"></img>
            <div class='txtBox'>
              <p class='tit'>发布出售</p>
              <p class='txt'>发布出售的商品</p>
            </div>
          </div>
        </router-link>
        ​<router-link to="/pubitem?type=buy">
          <div class='btnBox'>
            <img class="btnIco" src="../images/icon_fbqg.png"></img>
            <div class='txtBox'>
              <p class='tit'>发布求购</p>
              <p class='txt'>发布求购的商品</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>

  import {
  } from '../utils/util';

  export default {
    name: 'publish',
    data() {
      return {
        userInfo: {},
        region: {},
      }
    },
    mounted() {
    }
  }
</script>


<style scoped>
  @import "../css/publish.css";
</style>