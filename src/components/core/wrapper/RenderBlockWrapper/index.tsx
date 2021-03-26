
import React, { DOMAttributes } from 'react';
import { getValueByIdx } from '@/utils/block';
import { useRendererContext } from '@/hooks/useRendererContext';

interface RenderBlockWrapperProps extends DOMAttributes<HTMLDivElement> {
  children: React.ReactElement;
  idx: string;
}
export function RenderBlockWrapper(props: RenderBlockWrapperProps) {
  const { idx, children } = props;
  const {
    values,
    onAction
  } = useRendererContext();

  const node = getValueByIdx(values, idx)!;

  const handleAction = (ev: MouseEvent) => {
    if (node.data.action) {
      ev.stopPropagation();
      onAction(ev, node.data.action);
    }
  };

  const content = React.createElement(children.type, {
    ...children.props,
    style: {
      ...children.props.style,
      ...node.style,
      cursor: node.data.action ? 'pointer' : node.style.cursor
    },
    ['data-node-type']: node.type,
    ['data-node-idx']: idx,
    onClick: handleAction
  });

  return content;

}
