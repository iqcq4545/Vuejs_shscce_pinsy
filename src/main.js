// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App';
import router from './router';
import qs from 'qs';
import lrz from 'lrz';

import wx from 'weixin-js-sdk';

import { AppData } from './utils/AppData';

import { wxValidate } from "./utils/wxValidate.js";

import { ReqIndex } from './api/index';
import { ReqList } from './api/list';
import { ReqItem } from './api/item';
import { ReqPublish } from './api/publish';

Vue.prototype.$ReqIndex = ReqIndex;
Vue.prototype.$ReqList = ReqList;
Vue.prototype.$ReqItem = ReqItem;
Vue.prototype.$ReqPublish = ReqPublish;

Vue.prototype.$qs = qs;

Vue.prototype.$AppData = AppData;

Vue.prototype.$Validate = wxValidate;

Vue.prototype.$wx = wx;

Vue.prototype.$lrz = lrz;

Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);

Vue.prototype.getViewportSize = function () {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});