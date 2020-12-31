export function strCutOut(str, len) {
  if (str.length > len) {
    return `${str.substr(0, len)}...`;
  } else {
    return str;
  }
}

export function formatDur(dur) {
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
}

export function handleEmpty(value) {
  if (!value && value !== 0) {
    return "-"
  } else {
    return value
  }
}
