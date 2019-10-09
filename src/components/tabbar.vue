<template>
  <div v-if="selected" class="tabbar">
    <ul>
      <li v-for="(item,i) in tabbar.list" :style="'width:'+100/tabbar.list.length+'%'">
        ​<router-link :to="item.pagePath">
          <img :src="require('../images/'+(i==selected?item.selectedIconPath:item.iconPath))"></img>
          <p :style="'color:'+(i==selected?tabbar.selectedColor:tabbar.color)">{{item.text}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'tabbar',
    data() {
      return {
        "selected": undefined,
        "tabbar": {
          "color": "#999590",
          "selectedColor": "#d1a265",
          "backgroundColor": "#fff",
          "list": [
            {
              "text": "首页",
              "pagePath": "/",
              "iconPath": "tab_index.png",
              "selectedIconPath": "tab_index_selected.png",
            },
            {
              "text": "商城",
              "pagePath": "/list",
              "iconPath": "tab_shop.png",
              "selectedIconPath": "tab_shop_selected.png",
            },
            {
              "text": "我要发布",
              "pagePath": "/publish",
              "iconPath": "tab_publish.png",
              "selectedIconPath": "tab_publish_selected.png",

            },
            {
              "text": "我的",
              "pagePath": "/info",
              "iconPath": "tab_mine.png",
              "selectedIconPath": "tab_mine_selected.png",
            }
          ]
        }
      }
    },
    mounted() {
      this.match();
    },
    watch: {
      $route(to, from) {
        this.match();
      }
    },
    methods: {
      match() {
        console.log(this.$route.path, "this.$route.path")
        for (var i in this.tabbar.list) {
          var item = this.tabbar.list[i]
          if (item.pagePath === this.$route.path) {
            return this.selected = i;
          }
        }
        this.selected = undefined;
      }
    },
  }
</script>