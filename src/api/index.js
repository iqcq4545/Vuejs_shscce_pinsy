import { request } from '../utils/http.js';

class REQ_INDEX {

  getProductListAll(data = {}, isShowLoading = true) {
    return request({
      url: `/psy/product/list/json`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      isShowLoading: isShowLoading
    });
  }

  getBuyListAll(data = {}, isShowLoading = true) {
    return request({
      url: `/psy/shop/wantbuy/listAll`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      isShowLoading: isShowLoading
    });
  }

  getBannerList(data = {}, isShowLoading = true) {
    return request({
      url: `/syh-pm-manage/goods/bannerList`,
      data: {
        bannerId: 4
      },
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      isShowLoading: isShowLoading
    });
  }

  getGoodsindex(data = {}, isShowLoading = true) {
    return request({
      url: `/syh-pm-manage/goodsindex/search`,
      data: {},
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      isShowLoading: isShowLoading
    });
  }

  getAddrList(data = {}, isShowLoading = true) {
    return request({
      url: `/psy/order/receiver_list`,
      data: {},
      headers: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      isShowLoading: isShowLoading
    });
  }

  getUserInfo(data, isShowLoading = true) {
    return request({
      url: `/psy/member/social_user/getInfo`,
      data: {},
      headers: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      isShowLoading: isShowLoading
    });
  }

  testToken(data = {}, isShowLoading = true) {
    return request({
      url: `/psy/member/WxMa/testToken`,
      data: {},
      headers: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      //responseType: "arraybuffer",
      isShowLoading: isShowLoading
    });
  }

  signature(data = {}, isShowLoading = true) {
    return request({
      url: `/psy/system/getWxJsAPISign`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'POST',
      isShowLoading: isShowLoading
    });
  }
}

export const ReqIndex = new REQ_INDEX();