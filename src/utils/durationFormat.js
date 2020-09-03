export function durationFormat(time) {
  var t1 = parseInt(time / 1000);
  var minute = parseInt(t1 / 60);
  var second = parseInt(t1 - minute * 60);
  if (second > 9 && minute > 9) {
    return `${minute}: ${second}`;
  } else if (second > 9 && minute < 10) {
    return `0${minute}: ${second}`
  } else if(second < 10 && minute < 10){
    return `0${minute}: 0${second}`;
  }else if(second < 10 && minute > 9){
    return `${minute}：0${second}`
  }
}