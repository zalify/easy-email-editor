import { isNumber } from '@extensions/AttributePanel/utils/InputNumberAdapter';
import { isString } from 'lodash';

export const percentAdapter = {
  format(val: string) {
    if (!isString(val) && !val) return '';
    val = val.toString();
    if (/^\d+%$/.test(val.trim())) return val.trim().replace('%', '');
    return val.trim();
  },
  parse(val: string | number) {
    if (!isString(val) && !isNumber(val)) return undefined;
    val = val.toString().trim();
    if (!val) return undefined;
    if (/^\d+$/.test(val)) return val + '%';
    return val;
  },
};
