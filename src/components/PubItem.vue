<template>
  <div class="publish">
    <form id="form" v-if="type==='sale'">
      <div class="wrap" style="border-top:1px solid #f6f4f1">
        <div class="row radio">
          <label class="label">
            <p class="req">*</p>商品分类
          </label>
          <input class="hide" name="productCategoryId" v-model="sale.productCategoryId" />
          <p class="item" :class="sale.productCategoryId=='1' && 'on'" id="stamp"
            @click="radioBtn('sale.productCategoryId','1')">
            邮票</p>
          <p class="item" :class="sale.productCategoryId=='2' && 'on'" id="coin"
            @click="radioBtn('sale.productCategoryId','2')">
            钱币</p>
          <p class="item" :class="sale.productCategoryId=='3' && 'on'" id="bill"
            @click="radioBtn('sale.productCategoryId','3')">
            纸钞</p>
        </div>
      </div>
      <div class="wrap">
        <div class="row">
          <label class="label">
            <p class="req">*</p>商品标题
          </label>
          <input name="name" placeholder="带入商品标题，可自行修改" v-model="sale.name" />
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
              <img class="image" :src="sale.thumbnail[i]"></img>
              <input class="hide" :name="'productImages['+i+'].source'" v-model="item.source" />
              <input class="hide" :name="'productImages['+i+'].thumbnail'" v-model="item.thumbnail" />
              <input class="hide" :name="'productImages['+i+'].large'" v-model="item.large" />
              <input class="hide" :name="'productImages['+i+'].medium'" v-model="item.medium" />
              <input class="hide" :name="'['+i+'].order'" v-model="i" />
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
          <input type="number" name="sku.price" placeholder="输入您期望的商品单价" v-model="sale.sku.price" />
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
          <p class="item" :class="sale.express=='1' && 'on'" @click="radioBtn('sale.express','1')">包邮</p>
          <p class="item" :class="sale.express=='2' && 'on'" @click="radioBtn('sale.express','2')">不包邮</p>
          <input class="hide" name="express" v-model="sale.express" />
        </div>
      </div>
      <div class="wrap">
        <div class="row">
          <label class="label">
            <p class="req">*</p>有效期
          </label>
          <select v-if="sale.vaildTime" class="date" name="vaildTime" v-model="sale.vaildTime">
            <option v-for="(item,i) in expiryList" :value="item.date">{{item.day}}</option>
          </select>
          <p class="tip">天</p>
        </div>
      </div>
      <div class="wrap">
        <div class="row">
          <label class="label">
            <p class="req">*</p>发货时间
          </label>
          <input type="number" name="latestShippedTime" placeholder="输入发货时间" value="1" />
          <p class="tip">天</p>
        </div>
        <div class="wline"></div>
        <div class="row">
          <label class="label">
            <p class="req"></p>商品描述
          </label>
          <textarea name="caption" placeholder="可以描述您的商品品相、快递情况和其他，不超过300字" v-model="sale.caption"></textarea>
        </div>
      </div>
      <a class="submit" @click="submit($event)">一键发布</a>
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
          <input class='hide' name="wantBuyType" v-model="buy.wantBuyType" />
          <p class="item" :class="buy.wantBuyType=='stamp' && 'on'" @click="radioBtn('buy.wantBuyType','stamp')">邮票</p>
          <p class="item" :class="buy.wantBuyType=='coin' && 'on'" @click="radioBtn('buy.wantBuyType','coin')">钱币</p>
          <p class="item" :class="buy.wantBuyType=='bill' && 'on'" @click="radioBtn('buy.wantBuyType','bill')">纸钞</p>
        </div>
      </div>
      <div class='wrap'>
        <div class='row'>
          <label class='label'>
            <p class='req'>*</p>商品标题
          </label>
          <input name="wantBuyInfo" placeholder="带入商品标题，可自行修改" v-model="buy.wantBuyInfo" />
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
          <input type="number" name="totalNum" placeholder="输入求购的数量" v-model="buy.totalNum" />
        </div>
        <div class='wline'></div>
        <div class="row radio">
          <label class="label">
            <p class="req">*</p>快递
          </label>
          <p class="item" :class="buy.express=='1' && 'on'" @click="radioBtn('buy.express','1')">包邮</p>
          <p class="item" :class="buy.express=='2' && 'on'" @click="radioBtn('buy.express','2')">不包邮</p>
          <input class='hide' name="express" v-model="buy.express" />
        </div>
      </div>
      <div class='wrap'>
        <div class="row">
          <label class="label">
            <p class="req">*</p>有效期
          </label>
          <select v-if="buy.vaildTime" class="date" name="vaildTime" v-model="buy.vaildTime">
            <option v-for="(item,i) in expiryList" :value="item.date">{{item.day}}</option>
          </select>
          <p class="tip">天</p>
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
          <textarea name="describeInfo" placeholder="可以描述您的商品品相、快递情况和其他，不超过300字" v-model="buy.describeInfo"></textarea>
        </div>
      </div>
      <input class="hide" name="wantBuyInfoId" v-model="id" v-if="act==='edit'" />
      <input class='hide' name="userName" v-model="userInfo.nickName" />
      <input class='hide' name="userPic" v-model="userInfo.headImgUrl" />
      <input class='hide' name="userMobile" value="" />
      <a class="submit" @click="submit($event)">一键发布</a>
    </form>
  </div>
</template>


<script>
  import {
    formatTime
  } from '../utils/util.js';

  export default {
    name: 'publish',
    inject: ["toast"],
    data() {
      return {
        type: "sale",
        id: undefined,
        act: undefined,
        previewImage: [],
        expiryList: [],
        sale: {
          name: undefined,
          productCategoryId: "1",
          productCategory: undefined,
          thumbnail: [],
          productImages: [{ source: undefined }],
          views: undefined,
          sku: {
            price: undefined,
            stock: undefined,
            allocatedStock: undefined,
            total: undefined,
          },
          express: "1",
          sales: undefined,
          createdDate: undefined,
          category: undefined,
          unit: undefined,
          store: {},
          vaildTime: undefined,
          shelvesTime: undefined,
        },

        buy: {
          id: undefined,
          createdDate: undefined,
          lastModifiedDate: undefined,
          wantBuyInfo: undefined,
          wantBuyType: "stamp",
          intentionalPrice: undefined,
          unit: undefined,
          totalNum: undefined,
          vaildTime: undefined,
          describeInfo: undefined,
          member: {
            id: undefined,
            createdDate: undefined,
            lastModifiedDate: undefined,
            username: undefined,
            mobile: undefined,
            name: undefined,
            userPic: undefined,
            displayName: undefined
          },
          express: "1",
          userName: undefined,
          userMobile: undefined,
          userPic: undefined,
          hits: undefined,
          shelves: undefined,
        },
        region: {},
        userInfo: {},
        isSubmit: false
      }
    },
    created() {
      this.type = this.$route.query.type || "sale";
      this.id = this.$route.query.id || "";
      this.act = this.$route.query.act || "";
      this.dateList([7, 14, 30, 90, 180]);
    },

    mounted() {
      this.userInfo = this.$AppData.global().userInfo;
      if (this.id){
        this.detail = this.$AppData.global().detail;
        for(var i in this.detail){
          this[this.type][i] = this.detail[i];
        }
      }
      console.log(this.detail)
      this.validate();
    },
    methods: {
      dateList(ary) {
        var date = new Date().getTime();
        this.sale.shelvesTime = formatTime(new Date(), "-").substr(0, 10);
        for (var i in ary) {
          this.expiryList[i] = {
            date: formatTime(new Date(date + 86400000 * ary[i]), "-").substr(0, 10),
            day: ary[i]
          }
        }
        this[this.type].vaildTime = this.expiryList[0].date;
      },
      radioBtn(name, value) {
        eval("this." + name + "='" + value + "'");
      },
      select() {

      },

      submit(e) {
        var type = this.type;
        if (!this.isSubmit) {
          this.isSubmit = true;
          if (!this.$Validate.checkForm(this[type])) {
            this.toast({ text: this.$Validate.errorList[0].msg, duration: 2000 });
            this.isSubmit = false;
            return false;
          }
          var data = new FormData(document.getElementById("form"));
          if (type === "sale") {
            this.$ReqPublish.submitSale(data).then((res) => {
              this.submitted(res);
            });
          }
          else {
            this.$ReqPublish.submitBuy(data).then((res) => {
              this.submitted(res);
            });
          }
        }
        else {
          this.toast({ text: "正在发布中，请勿重复提交", duration: 2000 });
        }
      },

      submitted(res) {
        this.isSubmit = false;
        var text = "发布成功";
        if (res.status == 200) {
          this.$router.push({ path: '/info' + this.type });
        }
        else {
          text = "发布失败" + res.data.message;
        }
        this.toast({ text: text, duration: 2000 });
      },

      chooseImage(e) {
        var that = this,
          files = e.target.files;
        for (var i = 0; i < files.length; i++) {
          var reader = new FileReader();
          reader.onload = function (e) {
            that.sale.thumbnail.push(this.result);
          }
          reader.readAsDataURL(files[i]);
          var data = new FormData();
          data.append('file', files[i], files[i].name);
          data.append('file_id', i);
          this.$ReqPublish.uploadImg(data).then((res) => {
            this.sale.productImages.length && !this.sale.productImages[0].source ? this.sale.productImages.splice(0, 1) : null;
            this.previewImage.push(res.data);
            this.sale.productImages.push(res.data);
          });
        }
      },

      rmImage(i) {
        this.previewImage.splice(i, 1);
        this.sale.productImages.splice(i, 1);
        this.sale.thumbnail.splice(i, 1);
      },
      validate() {
        var rule = {
        }, message = {
        }
        if (this.type === "sale") {
          rule = {
            "name": {
              required: true,
            },
            "productImages[0].source": {
              required: true,
            },
            "sku.price": {
              required: true,
              number: true,
            },
            "unit": {
              required: true,
            },
            "sku.stock": {
              required: true,
              digits: true
            },
            "caption": {
              required: true,
            },
          }
          message = {
            "name": {
              required: "请输入商品标题",
            },
            "productImages[0].source": {
              required: "请上传商品图片",
            },
            "sku.price": {
              required: "请输入商品单价",

            },
            "unit": {
              required: "请输入商品单位",
            },
            "sku.stock": {
              required: "请输入库存数量",
            },
            "caption": {
              required: "请输入商品描述",
            }
          }
        }
        else {
          rule = {
            "wantBuyInfo": {
              required: true,
            },
            "intentionalPrice": {
              required: true,
              number: true,
            },
            "unit": {
              required: true,
            },
            "totalNum": {
              required: true,
              digits: true
            },
            "describeInfo": {
              required: true,
            },
          }
          message = {
            "wantBuyInfo": {
              required: "请输入商品标题",
            },
            "intentionalPrice": {
              required: "请输入商品单价",
            },
            "unit": {
              required: "请输入商品单位",
            },
            "totalNum": {
              required: "请输入求购数量",
            },
            "describeInfo": {
              required: "请输入商品描述",
            }
          }
        }
        this.$Validate.init(rule, message);
      }
    }
  }
</script>


<style scoped>
  @import "../css/pubItem.css";
</style>