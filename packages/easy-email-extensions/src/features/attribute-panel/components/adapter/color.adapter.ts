import { isString } from 'lodash';
import Color from 'color';

export const colorAdapter = {
  format(val: string) {
    if (!isString(val) && !val) return '';
    val = val.toString();
    if (val.length === 7 && val.startsWith('#')) return val.replace('#', '');
    return val;
  },
  parse(val: string) {
    if (!isString(val)) return undefined;
    val = val.toString().trim();
    if (!val) return undefined;
    try {
      if (val.length === 6 && Color(`#${val}`).hex()) return `#${val}`;
    } catch (error) {
      console.log('err', val);
    }
    return val;
  },
};
