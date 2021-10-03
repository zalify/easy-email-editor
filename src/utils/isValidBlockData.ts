import { isObject } from 'lodash';

export function isValidBlockData(data: any) {
  if (!isObject(data)) return false;
  try {
    return (
      data['data'] &&
      data['attributes'] &&
      data['type'] &&
      Array.isArray(data['children'])
    );
  } catch (error) {
    return false;
  }
}
