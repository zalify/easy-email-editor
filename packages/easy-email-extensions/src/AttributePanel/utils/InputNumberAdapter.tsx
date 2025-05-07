export function isNumber(num: any): num is number {
  if (typeof num !== 'string' && typeof num !== 'number') return false;
  return new RegExp('^(\\-|\\+)?\\d+(\\.\\d+)?$').test(num.toString());
}

export function InputNumberAdapter(val: string | number) {
  return isNumber(Number(val)) ? Number(val) : val;
}
