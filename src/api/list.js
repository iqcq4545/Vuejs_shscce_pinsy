import { request } from '../utils/http.js';

class REQ_LIST {

  getBuyListAll(data = {}, isShowLoading = true) {
    return request({
      url: `/psy/shop/wantbuy/listAll`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      isShowLoading: isShowLoading
    })
  }

  getProductListAll(data = {}, isShowLoading = true) {
    return request({
      url: `/psy/product/list/json`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      isShowLoading: isShowLoading
    })
  }

  getProductSearch(data = {}, isShowLoading = true) {
    return request({
      url: `/psy/product/search/json`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      isShowLoading: isShowLoading
    })
  }
}

export const ReqList = new REQ_LIST();