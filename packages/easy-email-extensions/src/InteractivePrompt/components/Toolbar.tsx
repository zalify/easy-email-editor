import React from 'react';
import {
  BasicType,
  IBlock,
  getParentIdx,
  getSiblingIdx,
} from 'easy-email-core';
import { useBlock, useFocusIdx } from 'easy-email-editor';
import { classnames } from '@extensions/utils/classnames';
import { useAddToCollection } from '@extensions/hooks/useAddToCollection';

export function Toolbar({
  block,
  direction,
}: {
  block: IBlock;
  direction: 'top' | 'bottom';
}) {
  const { moveBlock, copyBlock, removeBlock } = useBlock();
  const { focusIdx, setFocusIdx } = useFocusIdx();

  const { modal, setModalVisible } = useAddToCollection();

  const isPage = block.type === BasicType.PAGE;

  const handleMoveUp = () => {
    moveBlock(focusIdx, getSiblingIdx(focusIdx, -1));
  };

  const handleMoveDown = () => {
    moveBlock(focusIdx, getSiblingIdx(focusIdx, 1));
  };

  const handleAddToCollection = () => {
    setModalVisible(true);
  };

  const handleCopy: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    copyBlock(focusIdx);
  };

  const handleDelete = () => {
    removeBlock(focusIdx);
  };

  const handleSelectParent = () => {
    setFocusIdx(getParentIdx(focusIdx)!);
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: direction === 'top' || isPage ? 0 : '100%',
          fontSize: 14,
          zIndex: 3,
          color: '#000',
          width: '100%',
          pointerEvents: 'none',
          lineHeight: '22px',
        }}
      >
        <div
          style={{
            color: '#ffffff',
            transform:
              direction !== 'top' || isPage ? undefined : 'translateY(-100%)',
            display: 'flex',
            // justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              color: '#ffffff',
              backgroundColor: '#1890ff',
              height: '22px',

              display: 'inline-flex',
              padding: '1px 5px',
              boxSizing: 'border-box',
              whiteSpace: 'nowrap',
            }}
          >
            {block.name}
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            onMouseDown={(ev) => {
              ev.preventDefault();
            }}
            style={{
              display: isPage ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
            }}
          >
            <ToolItem
              width={12}
              iconName='icon-back-parent'
              onClick={handleSelectParent}
            />
            <ToolItem iconName='icon-copy' onClick={handleCopy} />
            <ToolItem
              iconName='icon-collection'
              onClick={handleAddToCollection}
            />
            <ToolItem iconName='icon-delete' onClick={handleDelete} />
          </div>
        </div>
      </div>
      {modal}
    </>
  );
}

function ToolItem(props: {
  iconName: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  width?: number;
}) {
  return (
    <div
      onClick={props.onClick}
      style={{
        color: '#ffffff',
        backgroundColor: '#1890ff',
        height: 22,
        fontSize: props.width || 14,
        lineHeight: '22px',
        width: 22,
        display: 'flex',
        pointerEvents: 'auto',
        cursor: 'pointer',
        justifyContent: 'center',
      }}
      className={classnames('iconfont', props.iconName)}
    />
  );
}
