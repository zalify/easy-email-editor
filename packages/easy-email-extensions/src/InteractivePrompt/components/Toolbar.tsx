import React, { useEffect, useMemo, useState } from 'react';
import {
  BasicType,
  IBlock,
  getParentIdx,
  getSiblingIdx,
} from 'easy-email-core';
import { getShadowRoot, useBlock, useEditorContext, useFocusIdx } from 'easy-email-editor';
import { classnames } from '@extensions/utils/classnames';
import { useAddToCollection } from '@extensions/hooks/useAddToCollection';
import { debounce } from 'lodash';

export function Toolbar({
  block,
  blockNode,
}: {
  block: IBlock;
  blockNode: HTMLElement;
}) {
  const { moveBlock, copyBlock, removeBlock } = useBlock();
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const { initialized } = useEditorContext();
  const { modal, setModalVisible } = useAddToCollection();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const isPage = block.type === BasicType.PAGE;

  useEffect(() => {
    const check = () => {
      const { top, left } = blockNode.getBoundingClientRect();
      setPosition({ top, left });
    };

    const ele = getShadowRoot().querySelector('.shadow-container');

    if (!ele || !initialized) return;
    check();
    const onScroll = () => {
      check();
    };

    ele.addEventListener('scroll', onScroll, true);
    return () => {
      ele.removeEventListener('scroll', onScroll, true);
    };
  }, [blockNode, initialized]);


  const handleMoveUp = () => {
    moveBlock(focusIdx, getSiblingIdx(focusIdx, -1));
  };

  const handleMoveDown = () => {
    moveBlock(focusIdx, getSiblingIdx(focusIdx, 1));
  };

  const handleAddToCollection = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setModalVisible(true);
  };

  const handleCopy: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    copyBlock(focusIdx);
  };

  const handleDelete = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    removeBlock(focusIdx);
  };

  const handleSelectParent = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setFocusIdx(getParentIdx(focusIdx)!);
  };

  return (
    <>
      <div
        id='easy-email-extensions-InteractivePrompt-Toolbar'
        style={{
          position: 'fixed',
          left: position.left,
          height: 0,
          top: position.top,
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontSize: 14,
            lineHeight: '22px',
            pointerEvents: 'auto',
            color: '#ffffff',
            transform: 'translateY(-100%)',
            display: 'flex',
            // justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              color: '#ffffff',
              backgroundColor: 'var(--selected-color)',
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
        backgroundColor: 'var(--selected-color)',
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
