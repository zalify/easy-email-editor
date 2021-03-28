import { classnames } from '@/utils/classnames';
import {
  BasicType,
  BlockType,
  BLOCK_HOVER_CLASSNAME,
  BLOCK_SELECTED_CLASSNAME,
  DRAG_HOVER_CLASSNAME,
  DRAG_TANGENT_CLASSNAME,
} from '@/constants';
import { findBlockByType, getIndexByIdx, getParentIdx, getValueByIdx } from '@/utils/block';
import { Tooltip } from 'antd';
import React, { DOMAttributes, useEffect, useState } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { findBlockNode } from '@/utils/findBlockNode';
import { get } from 'lodash';
import { getTangentDirection } from '@/utils/getTangentDirection';

interface EditBlockWrapperProps extends DOMAttributes<HTMLDivElement> {
  children: React.ReactElement;
  idx: string;
}

export function EditBlockWrapper(props: EditBlockWrapperProps) {
  const { idx, children } = props;
  const { focusIdx, values, setFocusIdx, hoverIdx, setHoverIdx, addBlock } = useBlock();

  const node = getValueByIdx(values, idx)!;
  const block = findBlockByType(node.type);
  const isFocus = focusIdx === idx;
  const isHover = hoverIdx === idx;

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
      setHoverIdx(idx);
    },
    onMouseLeave(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      setHoverIdx('');
      const blockNode = findBlockNode(e.target as HTMLElement);
      blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
      blockNode?.classList.remove(DRAG_TANGENT_CLASSNAME);
    },
    onDrop(e: React.DragEvent) {
      e.stopPropagation();
      const parent = get(values, idx);
      if (parent) {
        e.preventDefault();
        const direction = getTangentDirection(e);
        const type = e.dataTransfer.getData('Text') as BlockType;
        if (direction === 'top') {
          addBlock({ type, parentIdx: getParentIdx(idx)!, positionIndex: +getIndexByIdx(idx) });
        } else if (direction === 'bottom') {
          addBlock({ type, parentIdx: getParentIdx(idx)!, positionIndex: +getIndexByIdx(idx) + 1 });
        } else {
          addBlock({ type, parentIdx: idx });
        }
        const blockNode = findBlockNode(e.target as HTMLElement);
        blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
        blockNode?.classList.remove(DRAG_TANGENT_CLASSNAME);

      }
    },
    onDragOver(e: React.DragEvent<HTMLElement>) {
      e.stopPropagation();
      e.preventDefault();
      const blockNode = findBlockNode(e.target as HTMLElement);
      blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
      blockNode?.classList.remove(DRAG_TANGENT_CLASSNAME);
      if (['top', 'bottom'].includes(getTangentDirection(e))) {
        blockNode?.classList.add(DRAG_TANGENT_CLASSNAME);
      } else {
        blockNode?.classList.add(DRAG_HOVER_CLASSNAME);
      }

    },
    onDragLeave(e: React.DragEvent<HTMLElement>) {
      const blockNode = findBlockNode(e.target as HTMLElement);
      blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
      blockNode?.classList.remove(DRAG_TANGENT_CLASSNAME);
    },
    onMouseUp(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      const blockNode = findBlockNode(e.target as HTMLElement);
      blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
      blockNode?.classList.remove(DRAG_TANGENT_CLASSNAME);
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
