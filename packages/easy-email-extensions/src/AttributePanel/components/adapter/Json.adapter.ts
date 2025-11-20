import { isString } from 'lodash';
import JSON5 from 'json5';

export const JsonAdapter = {
  format(obj: any) {
    return isString(obj) ? obj : JSON.stringify(obj, null, 2);
  },
  parse(val: string) {
    if (!val) return undefined;
    try {
      return JSON5.parse(val);
    } catch (error) {}
    return val;
  },
};
