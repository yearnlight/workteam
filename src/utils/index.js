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

let formatTime = dur => {
  return formatDur(
    `${Math.abs(parseInt(dur / 1000 / 60 / 60 / 24))}天 ${Math.abs(
      parseInt((dur / 1000 / 60 / 60) % 24)
    )}时`
  );
};

export default {
  deepCopy: deepCopy,
  jointQuery: jointQuery,
  displayEnum: displayEnum,
  formatTime: formatTime
};
