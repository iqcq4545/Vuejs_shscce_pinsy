import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import List from "@/components/List";
import Item from "@/components/Item";
import Info from "@/components/Info";
import Publish from "@/components/Publish";
import PubItem from "@/components/PubItem";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: "/static/h5/",
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/list/",
      name: "List",
      component: List
    },
    {
      path: "/item/",
      name: "Item",
      component: Item
    },
    {
      path: "/info/",
      name: "Info",
      component: Info
    },
    {
      path: "/publish/",
      name: "Publish",
      component: Publish
    },
    {
      path: "/pubitem/",
      name: "PubItem",
      component: PubItem
    }
  ]
})
