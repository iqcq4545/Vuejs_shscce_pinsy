import { request } from '../utils/http.js';

class REQ_PUBLISH {
  getListAll(code) {
    return request({
      url: `/psy/shop/wantbuy/listAll`,
      data: {
        // appCode: code,
        // isShowLoading: false
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET'
    });
  }

  submitSale(data) {
    var url = `/psy/business/product/${data.get("productId") ? "update" : "save"}`;
    return request({
      url: url,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST'
    });
  }

  submitBuy(data) {
    var url = `/psy/member/wantbuy/${data.get("wantBuyInfoId") ? "update" : "save"}`;
    return request({
      url: url,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST'
    });
  }

  uploadImg(data){
    var url = `/psy/business/product/upload_product_image`;
    return request({
      url: url,
      data: data,
      header: {
        "Content-Type": "multipart/form-data"
      },
      method: 'POST'
    });
  }
}

export const ReqPublish = new REQ_PUBLISH();