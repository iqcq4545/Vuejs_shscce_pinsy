<template>
  <div class="page">
    <div class="container info">
      <div class="usrInfo">
        <div class='avatar'>
          <img class="img" :src="userInfo.headImgUrl" mode="cover"></img>
          <p class="sex" :class="userInfo.gender==2?'female':'male'">{{userInfo.gender==2?'♀':'♂'}}</p>
        </div>
        <div class='row' style='margin:.20rem 0 0 0'>
          <p class="nickName fwb">{{userInfo.nickname}}</p>
          <!-- <p class='credit'>信用极好</p>
      <img class="icon bao" src="../images/icon_bao_small.png" mode="widthFix"></img>
      <img class="icon" src="../images/icon_shi_small.png" mode="widthFix"></img> -->
        </div>
        <div class='row' style='margin:.16rem 0 .20rem 0;'>
          <p class='desc'>{{userInfo.province}} {{userInfo.city}}</p>
        </div>
        <div class='row'>
          <p class='lab'>粉丝　0</p>
          <p class='lab'>订阅　0</p>
        </div>
      </div>
      <!-- 推荐有礼 -->
      <div class="invite">
        <img src="../images/banner_yqhy.png"></img>
      </div>
      <!-- <div class='vip'>
        <img class='ico'></img>
        <p class='tit'>成为会员</p>
        <p class='con fr'>文案内容</p>
      </div> -->
      <div class='publish'>
        <p class='tiTle'>我的发布</p>
        <div class='btnBox bgSale'>
          <p class='tit'>我的出售</p>
          <p class='txt'>包含已下架、已出售</p>
        </div>
        <div class='btnBox bgBuy fr'>
          <p class='tit'>我的求购</p>
          <p class='txt'>包含已下架、已买到</p>
        </div>
      </div>
      <div class='buy'>
        <div class='tiTle' style='width: 200rpx;'>我买到的 <p class='right all' data-userRole="buyer" data-status="">查看全部
          </p>
        </div>
        <div class='ul'>
          <div class='li' data-userRole="buyer" data-status="PENDING_PAYMENT">
            <div class="image-view">
              <img src='../images/icon_buy_pay.png'></img>
            </div>
            <p>待付款</p>
            <div class="badge"></div>
          </div>

          <div class='li' data-userRole="buyer" data-status="PENDING_SHIPMENT">
            <div class="image-view">
              <img src='../images/icon_buy_deliver.png'></img>
            </div>
            <p>待发货</p>
            <div class="badge"></div>
          </div>
          <div class='li' data-status="SHIPPED">
            <div class="image-view">
              <img src='../images/icon_buy_receiving.png'></img>
            </div>
            <p>待收货</p>
            <div class="badge"></div>
          </div>

          <div class='li'>
            <div class="image-view">
              <img src='../images/icon_buy_aftersale.png'></img>
            </div>
            <p>售后</p>
            <div class="badge"></div>
          </div>
        </div>
      </div>
      <div class='sale'>
        <div class='tiTle' style='width: 200rpx;'>我卖出的<p class='right all' data-userRole="seller" data-status="">查看全部
          </p>
        </div>
        <div class='ul'>
          <div class='li' data-userRole="seller" data-status="PENDING_PAYMENT">
            <div class="image-view">
              <img src='../images/icon_sell_pay.png'></img>
            </div>
            <p>待付款</p>
            <div class="badge"></div>
          </div>
          <div class='li' data-userRole="seller" data-status="PENDING_SHIPMENT">
            <div class="image-view">
              <img src='../images/icon_sell_deliver.png'></img>
            </div>
            <p>待发货</p>
            <div class="badge"></div>
          </div>
          <div class='li' data-userRole="seller" data-status="SHIPPED">
            <div class="image-view">
              <img src='../images/icon_sell_receiving.png'></img>
            </div>
            <p>待收货</p>
            <div class="badge"></div>
          </div>
          <div class='li' data-userRole="seller">
            <div class="image-view">
              <img src='../images/icon_sell_aftersale.png'></img>
            </div>
            <p>售后</p>
            <div class="badge"></div>
          </div>

        </div>
      </div>
    </div>

    <div class="list">
      <div class="item">
        <div class="center">
          <img src="../images/icon_mine_wallet.png" class="wallet-image"></img>
        </div>
        <div class="center label">账户余额</div>
        <div class="right center">
          <img src="../images/icon_enter_big.png" class="enter-image"></img>
        </div>
      </div>
      <div class="item">
        <div class="center">
          <img src="../images/icon_mine_address.png" class="address-image"></img>
        </div>
        <div class="center label">地址管理</div>
        <div class="right center">
          <img src="../images/icon_enter_big.png" class="enter-image"></img>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    parseRegion
  } from '../utils/util';

  export default {
    name: 'Info',
    data() {
      return {
        userInfo: {},
        region: {},
      }
    },
    mounted() {
      this.userInfo = this.$AppData.global().userInfo;
      this.$set(this.userInfo);
    }
  }
</script>


<style scoped>
  @import "../css/info.css";
</style>