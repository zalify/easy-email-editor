import { IBlock } from '@core/typings';
import { getAdapterAttributesString, getChildIdx } from '@core/utils';
import { getPlaceholder } from '@core/utils/getPlaceholder';
import React from 'react';
import { BlockRenderer } from './BlockRenderer';

export function BasicBlock(props: { params: Parameters<IBlock['render']>[0]; tag: string; children?: React.ReactNode; }) {
  const { params, params: { data, idx, children: children2 }, tag, children } = props;

  const placeholder = data.children.length === 0 && getPlaceholder(data.type);

  let content = children || children2;

  if ((!content || Array.isArray(content) && content.length === 0) && data.children.length === 0) {
    content = placeholder;
  }

  return (
    <>
      {`<${tag} ${getAdapterAttributesString(params)}>`}
      {content || data.children.map((child, index) => (
        <BlockRenderer key={index} {...params} idx={idx ? getChildIdx(idx, index) : null} data={child} />
      ))}
      {`</${tag}>`}
    </>
  );
}
