export function trimAmount(value) {
  return value % 1 === 0 ? value : value.toFixed(1);
}
