import { request } from '../utils/http.js';

class REQ_ITEM {
  getDetailSale(data, isShowLoading = true) {
    var url = data.act === "edit" ? `/psy/business/product/detail/${data.id}` : `/psy/product/detailJson/${data.id}`
    return request({
      url: url,
      data: {},
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      isShowLoading: isShowLoading
    });
  }

  getDetailBuy(data, isShowLoading = true) {
    return request({
      url: `/psy/shop/wantbuy/detail`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      isShowLoading: isShowLoading
    })
  }

  getHitsSale(id, isShowLoading = true) {
    return request({
      url: `/psy/product/hits/` + id,
      data: {},
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      isShowLoading: isShowLoading
    });
  }

  getHitsBuy(id, isShowLoading = true) {
    return request({
      url: `/psy/shop/wantbuy/hits?id=` + id,
      data: {},
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      isShowLoading: isShowLoading
    });
  }

  updateShelfSale(data = {}, isShowLoading = true) {
    return request({
      url: `/psy/business/product/${data.shelf ? "shelf" : "shelves"}`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      isShowLoading: isShowLoading
    });
  }
}
export const ReqItem = new REQ_ITEM();