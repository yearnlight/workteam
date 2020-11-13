// 深度拷贝
let deepCopy = obj => {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        result[key] = deepCopy(obj[key]); //递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
};

let jointQuery = params => {
  let res = "?";
  for (let key in params) {
    res += `${key}=${params[key]}&`;
  }
  return res.substring(0, res.length - 1);
};

let displayEnum = (enums, value) => {
  let res = {};
  let targetItem = enums.filter(f => f.value == value);
  if (targetItem && targetItem.length) {
    res = targetItem[0];
  }
  return res;
};

// 判断一段时间里是否包含周天
let isWeekDay = ($begin, $last) => {
  let begin = new Date($begin);
  let last = new Date($last);
  let span = parseInt(last - begin);
  if (span >= 604800000) {
    return 1;
  } else if (span > 0) {
    let lastDay = last.getDay();
    let beginDay = begin.getDay();
    if (lastDay == 0 || beginDay == 0) {
      return 1;
    } else {
      if (beginDay > lastDay) {
        return 1;
      } else {
        return 0;
      }
    }
  }
};

let formatDur = dur => {
  if (dur) {
    let dayHour = dur.split(" ");
    let day = parseInt(dayHour[0]);
    if (parseInt(dayHour[1]) == 9) {
      day = day + 1;
      return `${day}天`;
    } else {
      return dur;
    }
  } else {
    return "";
  }
};

let formatTime = (dur, week) => {
  week = week ? week : 0;
  return formatDur(
    `${Math.abs(parseInt(dur / 1000 / 60 / 60 / 24)) - week}天 ${Math.abs(
      parseInt((dur / 1000 / 60 / 60) % 24)
    )}时`
  );
};

let getUser = () => {
  return JSON.parse(sessionStorage.getItem("userInfo"));
};

const dateFormat = (date) => {
  date = new Date(date);
  let fmt = "yyyy-MM-dd hh:mm:ss";
  { //author: meizz 
    var o = {
      "M+": date.getMonth() + 1,     //月份 
      "d+": date.getDate(),     //日 
      "h+": date.getHours(),     //小时 
      "m+": date.getMinutes(),     //分 
      "s+": date.getSeconds(),     //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds()    //毫秒 
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
}

//防抖
const debounce = (func, wait, immediate) => {
  var timeout, result;
  var debounced = function () {
    var context = this;
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }

    return result;
  }

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  }

  return debounced;
}

let getToken = () => {
  let token = sessionStorage.getItem("token");
  return token;
};

export default {
  deepCopy: deepCopy,
  debounce: debounce,
  jointQuery: jointQuery,
  displayEnum: displayEnum,
  formatTime: formatTime,
  dateFormat: dateFormat,
  getUser: getUser,
  isWeekDay: isWeekDay,
  getToken: getToken
};
