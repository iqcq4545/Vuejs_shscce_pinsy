class APP_DATA {
  constructor() {
    this._data();
  }
  _data() {
    const data = {
      userInfo: undefined,
      logging: false,
      socialUserId: "",
      openid: "",
      session_key: "",
      Cookie: "",
      encryptedDataPhone: "",
      ivData: "",
      listType: "sale",
      detail: {},
      searchKeyword: "",
      canTrade: false,
      addrList: "",
      orderStatus: '',
      aftersaleStatus: '',
      billStatus: '',
      orderUserRole: '',
      aftersalesUserRole: ''
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