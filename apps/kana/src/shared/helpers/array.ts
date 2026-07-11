export function isUniformArray<T>(arr: Array<T>, item: T) {
  return arr.length > 0 && arr.every((el) => el === item);
}
