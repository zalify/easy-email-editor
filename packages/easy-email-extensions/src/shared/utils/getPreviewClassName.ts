import { classnames } from 'easy-email-core';
import { getNodeIdxClassName, getNodeTypeClassName } from 'easy-email-core';

export function getPreviewClassName(idx: string | null, type: string) {
  return classnames('email-block',
    idx && getNodeIdxClassName(idx),
    getNodeTypeClassName(type));
}
