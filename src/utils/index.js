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
  let dayHour = dur.split(" ");
  let day = parseInt(dayHour[0]);
  if (parseInt(dayHour[1]) == 9) {
    day = day + 1;
    return `${day}天`;
  } else {
    return dur;
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

export default {
  deepCopy: deepCopy,
  jointQuery: jointQuery,
  displayEnum: displayEnum,
  formatTime: formatTime,
  getUser: getUser,
  isWeekDay: isWeekDay
};
