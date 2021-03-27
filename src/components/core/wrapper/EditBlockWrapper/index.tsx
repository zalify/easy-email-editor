import { classnames } from '@/utils/classnames';
import {
  BasicType,
  BLOCK_HOVER_CLASSNAME,
  BLOCK_SELECTED_CLASSNAME,
} from '@/constants';
import { findBlockByType, getValueByIdx } from '@/utils/block';
import { Tooltip } from 'antd';
import React, { DOMAttributes, useState } from 'react';
import { useBlock } from '@/hooks/useBlock';

interface EditBlockWrapperProps extends DOMAttributes<HTMLDivElement> {
  children: React.ReactElement;
  idx: string;
}
export function EditBlockWrapper(props: EditBlockWrapperProps) {
  const [isHover, setIsHover] = useState(false);
  const { idx, children } = props;
  const { focusIdx, values, setFocusIdx } = useBlock();

  const node = getValueByIdx(values, idx)!;
  const block = findBlockByType(node.type);
  const isFocus = focusIdx === idx;

  const content = React.createElement(children.type, {
    ...{
      ...props,
      children: undefined,
    },
    ...children.props,
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setFocusIdx(idx);
    },
    onMouseOver(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      e.stopPropagation();
      setIsHover(true);
    },
    onMouseLeave(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      setIsHover(false);
    },
    ['data-node-type']: node.type,
    ['data-node-idx']: idx,
    style: {
      ...(children.props.style || {}),
      cursor: 'grab',
    },
    className: classnames(
      isHover && BLOCK_HOVER_CLASSNAME,
      isFocus && BLOCK_SELECTED_CLASSNAME,
      children.props.className
    ),
  });

  return (
    <Tooltip
      key={2}
      placement='leftTop'
      title={block?.name}
      visible={!isFocus && isHover}
    >
      {content}
    </Tooltip>
  );
}
