import {
  province_en,
  province_zh
} from "./region";
import { SlowBuffer } from "buffer";

function parseRegion(userInfo) {
  console.log(userInfo, "province_zh[i].cities[j]province_zh[i].cities[j]province_zh[i].cities[j]")
  var province = userInfo.province.toLowerCase(),
    city = userInfo.city.toLowerCase();
  for (var i = 0; i < province_en.length; i++) {
    if (province == province_en[i].name) {
      for (var j = 0; j < province_en[i].cities.length; j++) {
        if (city == province_en[i].cities[j]) {
          return {
            province: province_zh[i].name,
            city: province_zh[i].cities[j]
          };
          break;
        }
      }
    }
  }
}

function formatTime(date, delim = "/") {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join(delim) + " " + [hour, minute, second].map(formatNumber).join(":")
}


function timeStampToDate(date) {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join("-") + " " + [hour, minute, second].map(formatNumber).join(":");
}


const formatNumber = function (n) {
  n = n.toString()
  return n[1] ? n : "0" + n
}

function removePunctuation(value) {
  return value.replace(/[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g, "");
}

/* data:obj key:[] callback:{} field:{} */
function recursionData(data, key = [], callback = {}, field = {}) {
  for (var i in data) {
    if (data[i] !== null) {
      if (typeof data[i] === "object") {
        data[i] = recursionData(data[i], key, callback, field);
      } else if (typeof data[i] === "number") {
        for (var j in callback) {
          data = callback[j](data, i, key, field[j]);
        }
      }
    } else {
      for (var k in key) {
        if (key[k] === i) {
          data[i] = 0;
        }
      }
      for (var j in callback) {
        data = callback[j](data, i, key, field[j]);
      }
    }
  }
  return data;
}

function fmtPrice(data, i, key, field) {
  for (var k in key) {
    if (key[k] === i) {
      let float = data[i].toFixed(2),
        split = float.split(".");
      data[i + field] = {
        float: float,
        split: split
      }
    }
  }
  return data;
}

function analyTrend(data, i, key, field) {
  // data[key[Math.floor(Math.random() * 2)]] += 0.01;
  if (data[key[0]] === data[key[1]]) {
    data[field] = "equal";
  } else {
    data[field] = data[key[0]] > data[key[1]] ? "rise" : "fall";
  }
  return data;
}

function addToArray(val, ary) {
  ary.push(val);
  ary.sort();
  return ary;
}

function rmFromArray(val, ary) {
  for (var i in ary) {
    val == ary[i] ? ary.splice(i, 1) : null;
  }
  ary.sort();
  return ary;
}

function compareArray(ary1, ary2) {
  if (ary1.length !== ary2.length) {
    return false;
  } else {
    if (ary1.join(",") !== ary2.join(",")) {
      return false
    } else {
      return true;
    }
  }
}

export {
  formatTime,
  formatNumber,
  timeStampToDate,
  toast,
  parseRegion,
  removePunctuation,
  recursionData,
  fmtPrice,
  analyTrend,
  addToArray,
  rmFromArray,
  compareArray
}