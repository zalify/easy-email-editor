import { IBlock } from '@core/typings';
import { EMAIL_BLOCK_CLASS_NAME } from '@core/constants';

import { isString } from 'lodash';

import { classnames } from '@core/utils/classnames';
import { getNodeIdxClassName, getNodeTypeClassName } from '@core/utils';

export function getAdapterAttributesString(
  params: Parameters<IBlock['render']>[0]
) {
  const { data, idx } = params;
  //const isTest = params.mode === 'testing';
  const attributes = { ...data.attributes };
  //const keepClasName = isTest ? params.keepClassName : false;
  const keepClassName = true;

  // if (idx) {
  //   attributes['css-class'] = classnames(
  //     attributes['css-class'],
  //     EMAIL_BLOCK_CLASS_NAME,
  //     getNodeIdxClassName(idx),
  //     getNodeTypeClassName(data.type)
  //   );
  // }

  if (idx) {
    attributes['css-class'] = classnames(
      attributes['css-class'],
      EMAIL_BLOCK_CLASS_NAME,
      getNodeIdxClassName(idx),
      getNodeTypeClassName(data.type)
    );
    if (data.type == 'image' && data.data.value?.mobileImage?.enabled) {
      attributes['css-class'] += `mobile_image_width`;
    }
  }
  let attributeStr = '';
  for (let key in attributes) {
    const keyName = key as keyof typeof attributes;
    const val = attributes[keyName];
    if (isString(val) && val) {
      const splitter = ' ';
      attributeStr += `${key}="${val.replace(/"/gm, '')}"` + splitter;
    }
  }

  return attributeStr;
}
