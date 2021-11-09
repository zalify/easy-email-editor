import { IconFont } from '@/components/IconFont';
import { TextStyle } from '@/components/UI/TextStyle';
import React, { useRef, useState } from 'react';

import { getIndexByIdx, getSiblingIdx } from '@/utils/block';
import { Form } from 'react-final-form';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from 'antd';
import { PropsProviderProps } from '@/components/Provider/PropsProvider';
import { useBlock } from '@/hooks/useBlock';
import { Stack } from '@/components/UI/Stack';
import {
  ImageUploaderField,
  TextAreaField,
  TextField,
} from '@/components/core/Form';
import { scrollFocusBlockIntoView } from '@/utils/scrollFocusBlockIntoView';
import styles from './index.module.scss';
import { IBlockDataWithId } from '../ConfigurationPanel/components/BlockLayerManager';

export function ContextMenu({
  moveBlock,
  copyBlock,
  removeBlock,
  contextMenuData,
  onClose,
  onUploadImage,
  onAddCollection,
}: {
  onClose: (ev?: React.MouseEvent) => void;
  moveBlock: ReturnType<typeof useBlock>['moveBlock'];
  copyBlock: ReturnType<typeof useBlock>['copyBlock'];
  removeBlock: ReturnType<typeof useBlock>['removeBlock'];
  contextMenuData: {
    blockData: IBlockDataWithId;
    left: number;
    top: number;
  };

  onAddCollection: PropsProviderProps['onAddCollection'];
  onUploadImage: PropsProviderProps['onUploadImage'];
}) {
  const { blockData, left, top } = contextMenuData;
  const idx = blockData.id;
  const [modalVisible, setModalVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMoveUp = () => {
    moveBlock(idx, getSiblingIdx(idx, -1));
    scrollFocusBlockIntoView({
      idx: getSiblingIdx(idx, -1),
      inShadowDom: true,
    });
    onClose();
  };

  const handleMoveDown = () => {
    moveBlock(idx, getSiblingIdx(idx, 1));
    scrollFocusBlockIntoView({
      idx: getSiblingIdx(idx, 1),
      inShadowDom: true,
    });
    onClose();
  };

  const handleCopy: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    copyBlock(idx);
    scrollFocusBlockIntoView({
      idx: getSiblingIdx(idx, 1),
      inShadowDom: true,
    });
    onClose();
  };

  const handleAddToCollection = () => {
    setModalVisible(true);
  };

  const handleDelete = () => {
    removeBlock(idx);
    onClose();
  };

  const onSubmit = (values: {
    label: string;
    helpText: string;
    thumbnail: string;
  }) => {
    if (!values.label) return;
    const uuid = uuidv4();
    onAddCollection?.({
      label: values.label,
      helpText: values.helpText,
      data: blockData,
      thumbnail: values.thumbnail,
      id: uuid,
    });
    setModalVisible(false);
    onClose();
  };

  const isFirst = getIndexByIdx(idx) === 0;

  return (
    <div ref={ref}>
      <div
        style={{
          left: left,
          top: top,
        }}
        className={styles.wrap}
        onClick={(e) => e.stopPropagation()}
      >
        {!isFirst && (
          <div className={styles.listItem} onClick={handleMoveUp}>
            <IconFont iconName='icon-top' style={{ marginRight: 10 }} />{' '}
            <TextStyle>Move up</TextStyle>
          </div>
        )}
        <div className={styles.listItem} onClick={handleMoveDown}>
          <IconFont iconName='icon-bottom' style={{ marginRight: 10 }} />{' '}
          <TextStyle>Move down</TextStyle>
        </div>
        <div className={styles.listItem} onClick={handleCopy}>
          <IconFont iconName='icon-copy' style={{ marginRight: 10 }} />{' '}
          <TextStyle>Copy</TextStyle>
        </div>
        <div className={styles.listItem} onClick={handleDelete}>
          <IconFont iconName='icon-delete' style={{ marginRight: 10 }} />{' '}
          <TextStyle>Delete</TextStyle>
        </div>
        <div className={styles.listItem} onClick={handleAddToCollection}>
          <IconFont iconName='icon-start' style={{ marginRight: 10 }} />{' '}
          <TextStyle>Add to collection</TextStyle>
        </div>
        <Form
          initialValues={{ label: '', helpText: '', thumbnail: '' }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Modal
              zIndex={2000}
              visible={modalVisible}
              title='Add to collection'
              onOk={() => handleSubmit()}
              onCancel={() => setModalVisible(false)}
            >
              <Stack vertical>
                <Stack.Item />
                <TextField
                  label='Title'
                  name='label'
                  validate={(val: string) => {
                    if (!val) return 'Title required!';
                    return undefined;
                  }}
                />
                <TextAreaField label='Description' name='helpText' />
                <ImageUploaderField
                  label='Thumbnail'
                  name={'thumbnail'}
                  uploadHandler={onUploadImage}
                  validate={(val: string) => {
                    if (!val) return 'Thumbnail required!';
                    return undefined;
                  }}
                />
              </Stack>
            </Modal>
          )}
        </Form>
      </div>
      <div className={styles.contextmenuMark} onClick={onClose}
        onContextMenu={(e) => {
          e.preventDefault();
          onClose(e);
        }}
      />
    </div>
  );
}
