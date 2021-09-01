type ObjectKeyValue = {
  [key: string]: string;
};
export function getKeyByValue(object: ObjectKeyValue, value: string) {
  return Object.keys(object).find(key => object[key] === value);
}
