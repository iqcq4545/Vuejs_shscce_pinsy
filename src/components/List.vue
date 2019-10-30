<template>
  <div class="page">
    <div class="seachWrap">
      <div class="seachInput">
        <img class="searchIco" src="../images/search.png" />
        <form action="javascript:return true">
          <input type="text" class="p" v-model="searchKeyword" :placeholder="hotKeyword" @keyup.enter="searchEnter" />
        </form>
        <!-- <img class="speechIco" src="../images/btn_yysr.png"></img> -->
      </div>
    </div>

    <div class="container list" :class="listType">

      <div class="rank">

        <div class="tabType">
          <p class="type" :class="listType=='sale' && 'on'" v-on:click="changeList('sale')">出售</p>
          <p class="type" :class="listType=='buy' && 'on'" v-on:click="changeList('buy')">求购</p>
        </div>

        <div class="tabSale" v-show="listType==='sale'">

          <div class="rankTab fl">
            <p class="tab" :class="order=='DATE_DESC' && 'on'" v-on:click="changeOrder('DATE_DESC')">最新发布</p>
            <p class="tab" :class="order=='HITS_DESC' && 'on'" v-on:click="changeOrder('HITS_DESC')">最多浏览</p>
            <p class="tab" :class="order=='SALES_DESC' && 'on'" v-on:click="changeOrder('SALES_DESC')">最热成交</p>
            <!-- <p class="tab" :class="order=='SCORE_DESC' && 'on'" v-on:click="changeOrder('SCORE_DESC')">信用最高</p> -->
          </div>

          <div class="rankBtn fl">
            <p class="btn" :class="category[listType]=='' && 'on'" v-on:click="changeCategory('')">全部</p>
            <p class="btn" :class="category[listType]=='1' && 'on'" v-on:click="changeCategory('1')">邮票</p>
            <p class="btn" :class="category[listType]=='2' && 'on'" v-on:click="changeCategory('2')">硬币</p>
            <p class="btn" :class="category[listType]=='3' && 'on'" v-on:click="changeCategory('3')">纸钞</p>
          </div>

        </div>

        <div class="tabBuy" v-show="listType==='buy'">

          <div class="rankBtn fl">
            <p class="btn" :class="category[listType]=='' && 'on'" v-on:click="changeCategory('')">全部</p>
            <p class="btn" :class="category[listType]=='stamp' && 'on'" v-on:click="changeCategory('stamp')">邮票</p>
            <p class="btn" :class="category[listType]=='coin' && 'on'" v-on:click="changeCategory('coin')">硬币</p>
            <p class="btn" :class="category[listType]=='bill' && 'on'" v-on:click="changeCategory('bill')">纸钞</p>
          </div>

        </div>

        <div class="rankItem sale" v-show="listType==='sale'">

          <div v-for="(item,i) in saleList" :key="i" class="row">
            ​<router-link :to="'/item?id='+item.id+'&type=sale'">
              <div class="rankImg">
                <img class="image" :src="item.thumbnail"></img>
              </div>
              <div class="rankTxt fr">
                <div class="tit fwb">{{item.name}}</div>
                <img class="type"
                  :src="require('../images/ico_sale_'+saleCategory[item.productCategory.id]+'.png')"></img>
                <div class="amount">
                  <div class="price fwb">
                    <em class="cny">¥</em>
                    <p class="int">{{item.priceView.split[0]}}</p>
                    <p class="float">.{{item.priceView.split[1]}}</p>
                    <p class="unit">/{{item.unit?item.unit:''}}</p>
                  </div>
                  <p class="sales">售出{{item.sales+item.defaultSku.allocatedStock}}件</p>
                </div>
              </div>
            </router-link>
          </div>

        </div>

        <div class="rankItem buy" v-show="listType==='buy'">

          <div v-for="(item,i) in buyList" :key="i" class="row">
            ​<router-link :to="'/item?id='+item.id+'&type=buy'">

              <div class="tit fwb">{{item.wantBuyInfo}}</div>
              <img class="type" :src="require('../images/ico_buy_'+item.wantBuyType+'.png')"></img>
              <div class="amount">
                <p class="bid fs20">意向价格</p>
                <div class="price fwb">
                  <em class="cny">¥</em>
                  <p class="int">{{item.intentionalPriceView.split[0]}}</p>
                  <p class="float">.{{item.intentionalPriceView.split[1]}}</p>
                  <p class="unit">/{{item.unit?item.unit:''}}</p>
                </div>
                <p class="sales">购得0件</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>

  import {
    recursionData,
    fmtPrice,
    analyTrend,
    addToArray,
    rmFromArray,
    compareArray,
  } from '../utils/util';

  export default {
    name: 'List',
    inject: ["reload"],
    data() {
      return {
        hotKeyword: "猴年邮票",
        searchKeyword: undefined,
        listType: "sale",
        order: "DATE_DESC",
        saleList: [],
        buyList: [],
        category: {
          "sale": undefined,
          "buy": undefined
        },
        saleCategory: {
          "1": "stamp",
          "2": "coin",
          "3": "bill"
        },
        pageNumber: {
          "sale": 0,
          "buy": 0,

        },
        maximum: {
          "sale": undefined,
          "buy": undefined,
        },
        isLoading: false
      }
    },

    created() {
      var that = this;
      that.listType = that.$route.query.type || "sale";
      that.searchKeyword = that.$route.query.search || "";
      window.addEventListener("scroll", function (e) {
        if (((e.target.documentElement.scrollTop || e.target.body.scrollTop) + e.target.documentElement.clientHeight) > (e.target.body.clientHeight - 1)) {
          that.loadNextPage();
        }
      });
    },

    mounted() {
      this.loadProductListAll();
      this.loadBuyListAll();
      console.log(this.$AppData.global());
    },
    updated() {
      console.log("updated");
    },
    methods: {
      loadProductListAll() {
        var reqData = {
          orderType: this.order,
          productCategoryId: this.category.sale,
          keyword: this.searchKeyword || "",
          pageNumber: this.pageNumber.sale,
          pageSize: 10
        }
        if (this.searchKeyword) {
          this.$ReqList.getProductSearch(reqData).then((res) => {
            if (res.data.length) {
              Array.prototype.push.apply(this.saleList, res.data);
              this.parseData(this.saleList, ["price"], "View", "saleList");
              res.data.length < 10 ? this.maximum.sale = this.pageNumber.sale : this.pageNumber.sale += 1;
            }
            else {
              this.maximum.sale = this.pageNumber.sale;
            }
            this.isLoading = false;
          });
        } else {
          this.$ReqList.getProductListAll(reqData).then((res) => {
            if (res.data.length) {
              Array.prototype.push.apply(this.saleList, res.data);
              this.parseData(this.saleList, ["price"], "View", "saleList");
              res.data.length < 10 ? this.maximum.sale = this.pageNumber.sale : this.pageNumber.sale += 1;
            }
            else {
              this.maximum.sale = this.pageNumber.sale;
            }
            this.isLoading = false;
          });
        }
      },

      loadBuyListAll() {
        var reqData = {
          wantBuyType: this.category.buy,
          wantBuyInfo: this.searchKeyword || "",
          pageNumber: this.pageNumber.buy,
          pageSize: 10
        }
        this.$ReqList.getBuyListAll(reqData).then((res) => {
          if (res.data.rows.length) {
            Array.prototype.push.apply(this.buyList, res.data.rows);
            this.parseData(this.buyList, ["intentionalPrice"], "View", "buyList");
            res.data.rows.length < 10 ? this.maximum.buy = this.pageNumber.buy : this.pageNumber.buy += 1;
          }
          else {
            this.maximum.buy = this.pageNumber.buy;
          }
          this.isLoading = false;
        });
      },

      parseData(data, key, field, dataKey) {
        var list = recursionData(data, key, {
          a: fmtPrice,
        }, {
            a: field,
          });
        data = list;
        this.$set(data, 0, list[0]);
      },

      changeList(type) {
        this.listType = type;
      },

      changeCategory(category) {
        this.category[this.listType] = category;
        if (this.listType === "sale") {
          this.pageNumber.sale = 1;
          this.saleList = [];
          this.loadProductListAll();
        } else {
          this.pageNumber.buy = 1;
          this.buyList = [];
          this.loadBuyListAll();
        }
      },

      changeOrder(order) {
        this.order = order
        this.pageNumber.sale = 1;
        this.saleList = [];
        this.loadProductListAll();
      },

      searchEnter(e) {
        this.$router.push({ path: "/list", query: { type: this.listType, search: e.target.value } });
        this.searchKeyword = e.target.value;
        this.reload();
      },

      loadNextPage() {
        if ((this.pageNumber[this.listType] === this.maximum[this.listType]) || this.isLoading) {
          return false;
        }
        this.isLoading = true;
        if (this.listType === "sale") {
          this.loadProductListAll();
        }
        else {
          this.loadBuyListAll();
        }
      }
    }
  }
</script>

<style scoped>
  @import "../css/list.css";
  @import "../css/list_style.css";
</style>