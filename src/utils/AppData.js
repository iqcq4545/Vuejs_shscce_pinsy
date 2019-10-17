class APP_DATA {
  constructor() {
    this._data();
  }
  _data() {
    const data = {
      userInfo: undefined,
      logging: false,
      socialUserId: undefined,
      openid: undefined,
      session_key: undefined,
      Cookie: undefined,
      encryptedDataPhone: undefined,
      ivData: undefined,
      listType: "sale",
      detail: {},
      searchKeyword: undefined,
      canTrade: false,
      addrList: undefined,
      orderStatus: undefined,
      aftersaleStatus: undefined,
      billStatus: undefined,
      orderUserRole: undefined,
      aftersalesUserRole: undefined
    };
    var storage = JSON.parse(window.localStorage.getItem("AppData") || "{}");
    for (var i in storage) {
      data[i] = storage[i];
    }
    this.global = function (obj) {
      for (var i in obj) {
        data[i] = obj[i];
      }
      window.localStorage.setItem("AppData", JSON.stringify(data));
      return data;
    }
  }
}

export const AppData = new APP_DATA();