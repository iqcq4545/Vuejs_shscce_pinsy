<template>
  <div class="publish">
    <form id="form" v-if="type==='sale'">
      <div class="wrap" style="border-top:1px solid #f6f4f1">
        <div class="row radio">
          <label class="label">
            <p class="req">*</p>商品分类
          </label>
          <input class="hide" name="productCategoryId" v-model="productCategoryId" />
          <p class="item" :class="productCategoryId=='1' && 'on'" id="stamp" @click="radioBtn('productCategoryId','1')">
            邮票</p>
          <p class="item" :class="productCategoryId=='2' && 'on'" id="coin" @click="radioBtn('productCategoryId','2')">
            钱币</p>
          <p class="item" :class="productCategoryId=='3' && 'on'" id="bill" @click="radioBtn('productCategoryId','3')">
            纸钞</p>
        </div>
      </div>
      <div class="wrap">
        <div class="row">
          <label class="label">
            <p class="req">*</p>商品标题
          </label>
          <input name="name" placeholder="带入商品标题，可自行修改" v-model.trim="sale.title" />
        </div>
      </div>
      <div class="wrap">
        <div class="row">
          <label class="label">
            <p class="req">*</p>上传图片
          </label>
        </div>
        <div class="wline"></div>
        <div class="row">
          <div class="previewImage">
            <div class="wrapImage" v-if="previewImage.length>0" v-for="(item,i) in previewImage">
              <img class="image" :src="item.thumbnail"></img>
              <input class="hide" :name="'productImages['+i+'].source'" v-model="item.source" />
              <input class="hide" :name="'productImages['+i+'].thumbnail'" v-model="item.thumbnail" />
              <input class="hide" :name="'productImages['+i+'].large'" v-model="item.large" />
              <input class="hide" :name="'productImages['+i+'].medium'" v-model="item.medium" />
              <input class="hide" :name="'['+i+']'.order" v-model="index" />
              <img class="rmImage" src="../images/btn_choose_error.png" @click="rmImage(i)"></img>
            </div>
            <div class="wrapImage">
              <input class="inputImg" type="file" multiple="true" accept="image/*" @change="chooseImage($event)" />
              <p class="plus">＋</p>
              <p class="desc">照片/视频</p>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="row">
          <label class="label">
            <p class="req">*</p>单价
          </label>
          <input type="number" name="sku.price" placeholder="输入您期望的商品单价" v-model="sale.price" />
        </div>
        <div class="wline"></div>
        <div class="row">
          <label class="label">
            <p class="req">*</p>单位
          </label>
          <input name="unit" placeholder="选择商品单位" v-model="sale.unit" />
        </div>
        <div class="wline"></div>
        <div class="row">
          <label class="label">
            <p class="req">*</p>库存
          </label>
          <input type="number" name="sku.stock" placeholder="输入库存数量" v-model="sale.sku.stock" />
        </div>
        <div class="wline"></div>
        <div class="row radio">
          <label class="label">
            <p class="req">*</p>快递
          </label>
          <p class="item" :class="express=='1' && 'on'" @click="radioBtn('express','1')">包邮</p>
          <p class="item" :class="express=='2' && 'on'" @click="radioBtn('express','2')">不包邮</p>
          <input class="hide" name="express" v-model="express" />
        </div>
      </div>
      <div class="wrap">
        <div class="row">
          <label class="label">
            <p class="req">*</p>有效期
          </label>
          <input class="hide" name="vaildTime" v-model="expiryDate" />
          <p class='tip' style='left:275rpx'>天</p>
        </div>
      </div>
      <div class="wrap">
        <div class="row">
          <label class="label">
            <p class="req">*</p>发货时间
          </label>
          <input type="number" name="latestShippedTime" placeholder="输入发货时间" value="1" />
          <p class='tip' style="left:275rpx">天</p>
        </div>
        <div class="wline"></div>
        <div class="row">
          <label class="label">
            <p class="req"></p>商品描述
          </label>
          <textarea name="caption" placeholder="可以描述您的商品品相、快递情况和其他，不超过300字" v-model="sale.describe"></textarea>
        </div>
      </div>
      <a class="submit" @click="submitSale($event)">一键发布</a>
      <input class="hide" name="productId" v-model="id" v-if="act==='edit'" />
      <input class="hide" name="isMarketable" value="true" />
      <input class="hide" name="isList" value="true" />
      <input class="hide" name="isTop" value="false" />
      <input class="hide" name="isDelivery" value="true" />
      <input class="hide" name="type" value="GENERAL" />
      <input class="hide" name="sku.maxCommission" value="0" />
      <input class="hide" name="sku.isDefault" value="true" />
    </form>

    <form id="form" v-if="type==='buy'">
      <div class='wrap' style='border-top:1px solid #f6f4f1'>
        <div class='row radio'>
          <label class='label'>
            <p class='req'>*</p>商品分类
          </label>
          <input class='hide' name="wantBuyType" v-model="wantBuyType" />
          <p class="item" :class="wantBuyType=='stamp' && 'on'" @click="radioBtn('wantBuyType','stamp')">邮票</p>
          <p class="item" :class="wantBuyType=='coin' && 'on'" @click="radioBtn('wantBuyType','coin')">钱币</p>
          <p class="item" :class="wantBuyType=='bill' && 'on'" @click="radioBtn('wantBuyType','bill')">纸钞</p>
        </div>
      </div>
      <div class='wrap'>
        <div class='row'>
          <label class='label'>
            <p class='req'>*</p>商品标题
          </label>
          <input name="wantBuyInfo" placeholder="带入商品标题，可自行修改" v-model="buy.title" />
        </div>
      </div>

      <div class='wrap'>
        <div class='row'>
          <label class='label'>
            <p class='req'>*</p>意向单价
          </label>
          <input name="intentionalPrice" placeholder="输入您期望的商品单价" v-model="buy.intentionalPrice" />
        </div>
        <div class='wline'></div>
        <div class='row'>
          <label class='label'>
            <p class='req'>*</p>单位
          </label>
          <input name="unit" placeholder="选择商品单位" v-model="buy.unit" />
        </div>
        <div class='wline'></div>
        <div class='row'>
          <label class='label'>
            <p class='req'>*</p>求购数量
          </label>
          <input type="number" name="totalNum" placeholder="输入求购的数量" v-model="buy.total" />
        </div>
        <div class='wline'></div>
        <div class="row radio">
          <label class="label">
            <p class="req">*</p>快递
          </label>
          <p class="item" :class="express=='1' && 'on'" @click="radioBtn('express','1')">包邮</p>
          <p class="item" :class="express=='2' && 'on'" @click="radioBtn('express','2')">不包邮</p>
          <input class='hide' name="express" v-model="express" />
        </div>
      </div>
      <div class='wrap'>
        <div class="row">
          <label class="label">
            <p class="req">*</p>有效期
          </label>
          <input class='date' v-model="expiryDate" />
          <input class='hide' name="vaildTime" v-model="expiryDate" />
          <p class='tip' style="left:275rpx">天</p>
        </div>
        <div class='wline'></div>
        <div class='row'>
          <label class='label'>
            <p class='req'>*</p>收货地址
          </label>
          <input name="" placeholder="选择收货地址" />
        </div>
      </div>
      <div class='wrap'>
        <div class='row'>
          <label class='label'>
            商品描述</label>
          <textarea name="describeInfo" placeholder="可以描述您的商品品相、快递情况和其他，不超过300字" v-model="buy.describe"></textarea>
        </div>
      </div>
      <input class="hide" name="wantBuyInfoId" v-model="id" v-if="act==='edit'" />
      <input class='hide' name="userName" v-model="userInfo.nickName" />
      <input class='hide' name="userPic" v-model="userInfo.headImgUrl" />
      <input class='hide' name="userMobile" value="" />
      <a class="submit" @click="submitBuy($event)">一键发布</a>
    </form>
  </div>
</template>


<script>
  import {
    toast,
    formatTime
  } from '../utils/util.js';

  export default {
    name: 'publish',
    data() {
      return {
        type: "sale",
        id: "",
        act: "",
        wantBuyType: "stamp",
        productCategoryId: "1",
        previewImage: [],

        express: "1",
        expiryDate: formatTime(new Date(), "-").substr(0, 10),
        sale: {
          productCategory: "",
          productImages: [],
          title: "",
          price: 0,
          views: 0,
          describe: "",
          sku: {
            stock: 0,
            allocatedStock: 0,
            total: 0,
          },
          sales: 0,
          createdDate: 0,
          category: "",
          unit: "",
          store: {}
        },


        buy: {
          "id": 0,
          "createdDate": 0,
          "lastModifiedDate": 0,
          "wantBuyInfo": "",
          "wantBuyType": "",
          "intentionalPrice": 0,
          "unit": "",
          "totalNum": 0,
          "vaildTime": "",
          "describeInfo": "",
          "listUrl": null,
          "member": {
            "id": 0,
            "createdDate": 0,
            "lastModifiedDate": 0,
            "username": "",
            "mobile": "",
            "name": "",
            "userPic": "",
            "displayName": ""
          },
          "userName": "",
          "userMobile": 0,
          "userPic": "",
          "hits": 0,
          "shelves": 0
        },
        region: {},

        userInfo: {},
      }
    },
    created() {
      this.type = this.$route.query.type || 'sale';
      this.id = this.$route.query.id || '';
      this.act = this.$route.query.act || '';
    },

    mounted() {
      this.userInfo = this.$AppData.global().userInfo;
    },
    methods: {
      radioBtn(name, value) {
        this[name] = value;
      },
      submitBuy(e) {
        var data = new FormData(document.getElementById("form"));
        this.$ReqPublish.submitBuy(data);
      },
      submitSale(e) {
        var data = new FormData(document.getElementById("form"));
        this.$ReqPublish.submitSale(data);
      },
      chooseImage(e) {
        var files = e.target.files;
        for (var i in files) {
          var data = new FormData();
          data.append('file', files[i], files[i].name);
          data.append('file_id', i);
          this.$ReqPublish.uploadImg(data).then((res) => {
            this.previewImage.push(res.data)
          });
        }
      }
    }
  }
</script>


<style scoped>
  @import "../css/pubItem.css";
</style>