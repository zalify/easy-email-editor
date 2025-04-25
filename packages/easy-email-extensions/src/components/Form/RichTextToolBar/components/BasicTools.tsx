import {
  IconFont,
  useBlock,
  useEditorProps,
  useFocusIdx,
} from 'easy-email-editor';
import { useAddToCollection } from '@extensions/hooks/useAddToCollection';
import { getParentIdx } from 'easy-email-core';
import React from 'react';
import { ToolItem } from './ToolItem';
import { getIframeDocument } from '@extensions/utils/getIframeDocument';

export function BasicTools() {
  const { copyBlock, removeBlock } = useBlock();
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const { modal, setModalVisible } = useAddToCollection();
  const { onAddCollection } = useEditorProps();

  const handleAddToCollection = () => {
    if (getIframeDocument()?.activeElement instanceof HTMLElement) {
      (getIframeDocument()?.activeElement as HTMLElement).blur();
    }
    setModalVisible(true);
  };

  const handleCopy: React.MouseEventHandler<any> = (ev) => {
    if (getIframeDocument()?.activeElement instanceof HTMLElement) {
      (getIframeDocument()?.activeElement as HTMLElement).blur();
    }
    copyBlock(focusIdx);
  };

  const handleDelete = () => {
    if (getIframeDocument()?.activeElement instanceof HTMLElement) {
      (getIframeDocument()?.activeElement as HTMLElement).blur();
    }
    removeBlock(focusIdx);
  };

  const handleSelectParent = () => {
    if (getIframeDocument()?.activeElement instanceof HTMLElement) {
      (getIframeDocument()?.activeElement as HTMLElement).blur();
    }
    setFocusIdx(getParentIdx(focusIdx)!);
  };

  return (
    <div style={{ marginRight: 40 }}>
      <span style={{
        position: 'relative',
        marginRight: 10,
        color: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, San Francisco, Segoe UI',
      }}
      >Text
      </span>
      <ToolItem
        onClick={handleSelectParent}
        title={t('Select parent block')}
        icon={<IconFont iconName="icon-back-parent" />}
      />
      <ToolItem
        onClick={handleCopy}
        title={t('Copy')}
        icon={<IconFont iconName="icon-copy" />}
      />
      {
        onAddCollection && (
          <ToolItem
            onClick={handleAddToCollection}
            title={t('Add to collection')}
            icon={<IconFont iconName="icon-collection" />}
          />
        )
      }
      <ToolItem
        onClick={handleDelete}
        title={t('Delete')}
        icon={<IconFont iconName="icon-delete" />}
      />
      {modal}
    </div>
  );
}
