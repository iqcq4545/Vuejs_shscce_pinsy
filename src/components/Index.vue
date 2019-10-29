<template>
  <div class="page">
    <div class='seachWrap'>
      <div class="seachInput">
        <img class='searchIco' src="../images/search.png" />
        <form action="javascript:return true">
          <input type="text" class="p" v-model="searchKeyword" :placeholder="hotKeyword" @keyup.enter="searchEnter" />
        </form>
        <!-- <img class='speechIco' src='../images/btn_yysr.png'></img> -->
      </div>
    </div>

    <div class="container index">
      <div class='banner'>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,i) in banner" :key="i">
            <img class="slide-image" :src="item.imagePath" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

      <div class="button">
        <div class="btnBox">
          <router-link to="/infoSale">
            <div class="txtBox">
              <p class="tit fwb">出售</p>
              <p class="txt">查看出售商品</p>
            </div>
            <img class="btnIco fr" src="../images/icon_index_sale.png"></img>
          </router-link>

        </div>
        <div class='btnBox fr'>
          <router-link to="/infoBuy">
            <div class="txtBox">
              <p class="tit fwb">求购</p>
              <p class="txt">查看求购商品</p>
            </div>
            <img class='btnIco fr' src='../images/icon_index_buy.png'></img>
          </router-link>

        </div>
      </div>

      <div class='indices'>
        <div class='tiTle'>
          <p>指数行情</p>
        </div>
        <div class='conTent' v-if="goodsIndex.stampIndex">
          <ul class='ul'>
            <li class="li" :class="goodsIndex.stampChangeTrend">
              <p class='r1'>邮票指数</p>
              <p class='r2 fwb'>{{goodsIndex.stampIndexView.float}}</p>
              <p class='r3'>{{goodsIndex.stampChangeTrend==="rise"?"+":""}}{{goodsIndex.stampChangeView.float}}%</p>
            </li>
            <li class="li" :class="goodsIndex.coinChangeTrend">
              <p class='r1'>硬币指数</p>
              <p class='r2 fwb'>{{goodsIndex.coinIndexView.float}}</p>
              <p class='r3'>{{goodsIndex.stampChangeTrend==="rise"?"+":""}}{{goodsIndex.stampChangeView.float}}%</p>
            </li>
            <li class="li" :class="goodsIndex.billChangeTrend">
              <p class='r1'>纸钞指数</p>
              <p class='r2 fwb'>{{goodsIndex.billIndexView.float}}</p>
              <p class='r3'>{{goodsIndex.stampChangeTrend==="rise"?"+":""}}{{goodsIndex.stampChangeView.float}}%</p>
            </li>
          </ul>
        </div>
      </div>

      <div class='rank' onscroll="scroll">
        <div class='rankTab'>
          <p class='tab' :class="rankType=='sale' && 'on'" v-on:click="changeRank('sale')">出售</p>
          <p class='tab' :class="rankType=='buy' && 'on'" v-on:click="changeRank('buy')">求购</p>
          ​<router-link :to="'/list?type='+rankType">
            <p class='seeMore fr'>查看更多 ></p>
          </router-link>
        </div>

        <div v-show="rankType=='sale'" class="rankItem sale">
          <div v-for="(item,i) in saleList" :key="i" class="row">
            ​<router-link :to="'/item?id='+item.id+'&type=sale'">
              <div class='rankImg'>
                <img class='image' :src="item.thumbnail"></img>
              </div>
              <div class='rankTxt fr'>
                <div class='tit fwb'>{{item.name}}</div>
                <img class="type" :src="require('../images/ico_sale_'+category[item.productCategory.id]+'.png')"></img>
                <div class='amount'>
                  <div class='price fwb'>
                    <em class="cny">¥</em>
                    <p class='int'>{{item.priceView.split[0]}}</p>
                    <p class="float">.{{item.priceView.split[1]}}</p>
                    <p class='unit'>/{{item.unit?item.unit:''}}</p>
                  </div>
                  <p class='sales'>售出{{item.sales+item.defaultSku.allocatedStock}}件</p>
                </div>
              </div>
            </router-link>

          </div>
        </div>

        <div v-show="rankType=='buy'" class="rankItem buy">
          <div v-for="(item,i) in buyList" :key="i" class="row">
            ​<router-link :to="'/item?id='+item.id+'&type=buy'">

              <div class='tit fwb'>{{item.wantBuyInfo}}</div>
              <img class="type" :src="require('../images/ico_buy_'+item.wantBuyType+'.png')"></img>
              <div class='amount'>
                <p class='bid fs20'>意向价格</p>
                <div class='price fwb'>
                  <em class="cny">¥</em>
                  <p class='int'>{{item.intentionalPriceView.split[0]}}</p>
                  <p class="float">.{{item.intentionalPriceView.split[1]}}</p>
                  <p class='unit'>/{{item.unit?item.unit:''}}</p>
                </div>
                <p class='sales'>购得0件</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  import {
    recursionData,
    fmtPrice,
    analyTrend,
    addToArray,
    rmFromArray,
    compareArray,
  } from '../utils/util';


  export default {
    name: 'Index',
    inject: ["reload", "toast"],
    data() {
      return {
        hotKeyword: "猴年邮票",
        searchKeyword: undefined,
        banner: [],
        goodsIndex: {},
        rankType: "sale",
        saleList: [],
        buyList: [],
        category: {
          "1": "stamp",
          "2": "coin",
          "3": "bill"
        },
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
        pageNumber: {
          "sale": 1,
          "buy": 1,
        },
        maximum: {
          "sale": undefined,
          "buy": undefined,
        }
      }
    },
    created() {
      var that = this;
      that.$route.query.code == 11001 ? that.$router.push({ path: "/register" }) : undefined;
      window.addEventListener("scroll", function (e) {
        if ((document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight > (document.body.clientHeight - 1)) {
          that.loadNextPage();
        }
      });
    },
    computed: {

    },
    mounted() {
      this.$ReqIndex.getGoodsindex().then((res) => {
        var data = recursionData(res.data.data, ["billIndex", "coinIndex", "stampIndex", "billChange", "coinChange", "stampChange"], {
          a: fmtPrice,
        }, {
            a: "View",
          });
        for (var i in data) {
          if (i === "billChange" || i === "coinChange" || i === "stampChange") {
            data[i + "Trend"] = (data[i]) < 0 ? "fall" : "rise";
          }
        }
        this.goodsIndex = data;
      });

      this.$ReqIndex.getBannerList().then((res) => {
        this.banner = res.data.data;
      });

      this.$ReqIndex.getUserInfo().then((res) => {
        var userInfo = JSON.parse(res.data.userJson);
        this.$AppData.global({ userInfo: userInfo });
      });

      this.loadProductListAll();
      this.loadBuyListAll();

      this.$ReqIndex.getAddrList().then((res) => {
        this.$AppData.global({ addrList: res.data });
      });

    },
    methods: {
      changeRank(type) {
        this.rankType = type;
      },
      searchEnter(e) {
        this.$AppData.global({ searchKeyword: e.target.value });
        this.$router.push({ path: "/list", query: { type: this.rankType, search: e.target.value } })
      },
      loadProductListAll() {
        this.$ReqIndex.getProductListAll({
          pageNumber: this.pageNumber.sale,
          pageSize: 10
        }).then((res) => {
          if (res.data.length) {
            var list = recursionData(res.data, ["price"], {
              a: fmtPrice,
            }, {
                a: "View",
              });
            Array.prototype.push.apply(this.saleList, list);
            this.$set(this.saleList, this.pageNumber.sale * 10 - 10, list[0]);
          } else {
            this.maximum.sale = this.pageNumber.sale;
          }
        });
      },
      loadBuyListAll() {
        this.$ReqIndex.getBuyListAll({
          pageNumber: this.pageNumber.buy,
          pageSize: 10
        }).then((res) => {
          if (res.data.rows.length) {
            var list = recursionData(res.data.rows, ["intentionalPrice"], {
              a: fmtPrice,
            }, {
                a: "View",
              });
            Array.prototype.push.apply(this.buyList, list);
            this.$set(this.buyList, (this.pageNumber.buy - 1) * 10, list[0]);
          } else {
            this.maximum.buy = this.pageNumber.buy;
          }
        });
      },
      loadNextPage() {
       // console.log(this.rankType, this.pageNumber[this.rankType], this.maximum[this.rankType])
        if (this.pageNumber[this.rankType] === this.maximum[this.rankType]) {
          return false;
        }
        this.pageNumber[this.rankType] += 1;
        if (this.rankType === "sale") {
          this.loadProductListAll();
        }
        else {
          this.loadBuyListAll();
        }
      }
    },
  }
</script>

<style scoped>
  @import "../css/index.css";
  @import "../css/list_style.css";
</style>