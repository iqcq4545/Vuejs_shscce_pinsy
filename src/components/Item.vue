<template>
  <div class="page">

    <div v-if="type==='sale'" class='banner'>
      <swiper class='swiper' :options="swiperOption">
        <swiper-slide v-for="(item,i) in detail.productImages" :key="i">
          <img class="slide-image" :src="item.large" alt="" @click="previewImage($event)">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <div class="item">
      <div class='wrap'>
        <div class='row'>
          <div v-if="detail.priceView" class='price fwb'>
            <em class="cny">¥</em>
            <p class='int'>{{detail.priceView.split[0]}}</p>
            <p class="float">.{{detail.priceView.split[1]}}</p>
            <p class='unit'>/{{detail.unit}}</p>
          </div>
          <p class='subt'>{{detail.views}}次浏览</p>
        </div>

        <div class='row' style='margin:.08rem 0 0 0;'>
          <div class='titLe fwb'>
            <img class="type" :class="type" :src="require('../images/ico_'+type+'_'+detail.category+'.png')"></img>
            {{detail.title}}
          </div>
          <button class="share fs20 fr" open-type="share" @click="share()">
            <div class="hline"></div>
            <img class='ico' src="../images/btn_share.png"></img>分享
          </button>
        </div>

        <div v-if="detail.describe" class='row' style='margin:.18rem 0 0 0;'>
          <p id="desc" class="desc fs26" :class="seeMore">{{detail.describe}}</p>
        </div>
      </div>

      <div class='wrap'>
        <div v-if="type==='sale'" class='row'>
          <p class='tit'>剩余库存</p>
          <p class='txt'>{{detail.sku.total}} {{detail.unit}}</p>
          <p class='txt fr' style='color:#da9a46'>售出{{detail.sales+detail.sku.allocatedStock}}件</p>
        </div>

        <div v-if="type==='buy'" class='row'>
          <p class='tit'>意向数量</p>
          <p class='txt'>{{detail.total}} {{detail.unit}}</p>
        </div>

        <div class='wline'></div>
        <div class='row'>
          <p class='tit'>发货地址</p>
          <p class='txt'>上海</p>
        </div>
      </div>

      <div class='wrap'>
        <div class='row'>
          <p class='tit'>服　　务</p>
          <div class='txt'>
            <p class="txt">由</p>
            <p class='txt red fs26' style="margin: 0 .075rem">{{detail.store.name}}</p>
            <p class="txt">负责发货并提供售后服务</p>
          </div>
        </div>
      </div>

      <div class='wrap'>
        <img class='avatar' :src="detail.store.logo?detail.store.logo:'/images/psy_logo.png'"></img>
        <div class='usrInfo fr'>
          <p class='name fs26'>{{detail.store.name?detail.store.name:'拼上邮'}}</p>
          <p class="date fs20">发布于{{detail.createdDate}}</p>
        </div>

      </div>
    </div>

    <div class="botBtns" v-if="act!=='edit'">
      ​<router-link class="btn submit fl" v-if="type==='sale'" :to="'/orderConfirm?skuId='+detail.sku.id">
        我要购买</router-link>
      <a class="btn submit fl" v-if="type==='buy'" :href="'tel:'+detail.phoneNumber">一键通话</a>
    </div>

    <div class="botBtns" v-if="act==='edit'">
      ​<router-link class="btn submit fl" :to="'/pubitem?type='+type+'&id='+id+'&act=edit'">
        编辑商品</router-link>
    </div>
  </div>

</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  import {
    formatTime,
    recursionData,
    fmtPrice,
    analyTrend,
    addToArray,
    rmFromArray,
    compareArray
  } from '../utils/util';

  export default {
    name: 'Item',
    data() {
      return {
        type: "sale",
        id: undefined,
        act: undefined,
        preImgList: [],
        detail: {
          productCategory: undefined,
          productImages: [],
          title: undefined,
          price: undefined,
          views: undefined,
          describe: undefined,
          sku: {
            id: undefined,
            stock: undefined,
            allocatedStock: undefined,
            total: undefined,
          },
          sales: undefined,
          createdDate: undefined,
          category: "stamp",
          unit: undefined,
          store: {},
        },
        saleCategory: {
          "1": "stamp",
          "2": "coin",
          "3": "bill"
        },
        submitURL: undefined,
        seeMore: undefined,
        swiperOption: {
          pagination: ".swiper-pagination",
          paginationClickable: true,
          autoplay: 2500,
          autoplayDisableOnInteraction: false,
          loop: true,
          onInit: function (e) {
            e.slideNext();
          }
        },
      }
    },

    created() {
      this.type = this.$route.query.type;
      this.id = this.$route.query.id;
      this.act = this.$route.query.act;
    },

    mounted() {
      if (this.$route.query.type === "sale") {
        this.$ReqItem.getHitsSale(this.id);
        this.getDetailSale();
      }
      else {
        this.$ReqItem.getHitsBuy(this.id);
        this.getDetailBuy();
      }
    },

    methods: {
      getDetailSale() {
        this.$ReqItem.getDetailSale({
          id: this.$route.query.id,
          act: this.$route.query.act || ""
        }).then((res) => {
          var createDate = formatTime(new Date(res.data.defaultSku.createdDate), "-"),
            data = {
              productImages: res.data.productImages,
              productCategoryId: res.data.productCategory.id,
              title: res.data.name,
              price: res.data.price,
              views: res.data.hits + 1,
              describe: res.data.caption,
              isMarketable: res.data.isMarketable,
              sku: {
                id: res.data.defaultSku.id,
                stock: res.data.defaultSku.stock,
                allocatedStock: res.data.defaultSku.allocatedStock,
                total: res.data.defaultSku.stock - res.data.defaultSku.allocatedStock,
              },
              sales: res.data.sales,
              createdDate: createDate.substr(0, 10) + " " + createDate.substr(11, 8),
              category: this.saleCategory[res.data.productCategory.id],
              unit: res.data.unit,
              store: {
                name: res.data.store.name,
                logo: res.data.store.logo,
                createDate: formatTime(new Date(res.data.store.createdDate), "-").substr(0, 10)
              }
            },
            data = recursionData(data, ["price"], {
              a: fmtPrice,
            }, {
                a: "View",
              });
          this.detail = data;
          res.data.priceView = data.priceView;
          this.$AppData.global({ detail: res.data });
          this.wxjssdkInit();
          for (var i in this.detail.productImages) {
            this.preImgList.push(this.detail.productImages[i].source);
          }
        });
      },
      getDetailBuy() {
        this.$ReqItem.getDetailBuy({
          id: this.$route.query.id,
          act: this.$route.query.act || ""
        }).then((res) => {
          var createDate = new Date(res.data.createdDate).toISOString(),
            data = {
              productImages: [],
              title: res.data.wantBuyInfo,
              price: res.data.intentionalPrice,
              views: res.data.hits + 1,
              describe: res.data.describeInfo,
              total: res.data.totalNum,
              createdDate: createDate.substr(0, 10) + " " + createDate.substr(11, 8),
              category: res.data.wantBuyType,
              unit: res.data.unit,
              store: {
                name: res.data.userName,
                logo: res.data.userPic
              },
              phoneNumber: res.data.member.mobile
            }
          data = recursionData(data, ["price"], {
            a: fmtPrice,
          }, {
              a: "View",
            });
          this.detail = data;
          res.data.priceView = data.priceView;
          this.$AppData.global({ detail: res.data });

        });
      },

      wxjssdkInit() {
        this.$ReqIndex.signature({
          url: window.location.href.split("#")[0]
        }).then((res) => {
          this.$wx.config({
            debug: false,
            appId: res.data.data.appid,
            timestamp: res.data.data.timestamp,
            nonceStr: res.data.data.nonceStr,
            signature: res.data.data.signature,
            jsApiList: ["previewImage", "updateAppMessageShareData", "updateTimelineShareData"]
          });
          this.$wx.ready(() => {
            this.share();
          });
        });
      },
      share() {
        var imgUrl = this.detail.productImages[0].thumbnail,
          shareData = {
            title: this.detail.title,
            desc: this.detail.describe,
            link: window.location.href.split("#")[0],
            imgUrl: imgUrl.replace(/http/g, "https"),
            success: function () {
            }
          };
        this.$wx.updateAppMessageShareData(shareData);
        this.$wx.updateTimelineShareData(shareData);
      },

      previewImage(e) {
        var that = this;
        that.$wx.previewImage({
          current: that.preImgList[e.target.parentElement.dataset.swiperSlideIndex],
          urls: that.preImgList
        });
      }
    }
  }
</script>

<style scoped>
  @import "../css/item.css";
</style>