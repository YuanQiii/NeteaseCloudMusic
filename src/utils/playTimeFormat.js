export function playTimeFormat(time) {
  var t1 = parseInt(time / 1000);
  var minute = parseInt(t1 / 60);
  var second = parseInt(t1 - minute * 60);
  if (second > 9) {
    return "0" + minute + ":" + second;
  } else {
    return "0" + minute + ":0" + second;
  }
}