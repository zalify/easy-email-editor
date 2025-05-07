import { isString } from 'lodash';

export const JsonAdapter = {
  format(obj: any) {
    return isString(obj) ? obj : JSON.stringify(obj, null, 2);
  },
  parse(val: string) {
    if (!val) return undefined;
    try {
      return JSON.parse(JSON.stringify(eval('(' + val + ')')));
    } catch (error) {}
    return val;
  },
};
