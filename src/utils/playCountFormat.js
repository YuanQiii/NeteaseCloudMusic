export function playCountFormat(count) {
  if (count > 10000) {
    return parseInt(count / 10000) + "万";
  } else {
    return count;
  }
}