export function getUnixTime(date = Date.now()) {
  return Math.floor(date / 1000);
}
