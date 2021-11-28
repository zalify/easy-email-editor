import React, { useCallback, useMemo, useState } from 'react';
import {
  DATA_ATTRIBUTE_DROP_CONTAINER,
  scrollBlockEleIntoView,
  TextStyle,
  useBlock,
  useEditorContext,
  useEditorProps,
  useFocusIdx,
  useHoverIdx,
} from 'easy-email-editor';
import {
  BlockManager,
  getChildIdx,
  getPageIdx,
  getSiblingIdx,
  IBlockData,
} from 'easy-email-core';
import styles from './index.module.scss';
import { cloneDeep, get } from 'lodash';
import { EyeIcon } from './components/EyeIcon';
import { BlockTree, BlockTreeProps } from './components/BlockTree';
import { ContextMenu } from './components/ContextMenu';

export interface IBlockDataWithId extends IBlockData {
  id: string;
  parent: IBlockDataWithId | null;
  children: IBlockDataWithId[];
}

export function BlockLayer() {
  const {
    pageData,
    formState: { values },
  } = useEditorContext();
  const { onUploadImage, onAddCollection } = useEditorProps();
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const { setHoverIdx } = useHoverIdx();
  const { moveBlock, setValueByIdx, copyBlock, removeBlock } = useBlock();
  const [contextMenuData, setContextMenuData] = useState<{
    blockData: IBlockDataWithId;
    left: number;
    top: number;
  } | null>(null);

  const onToggleVisible = useCallback(
    ({ id }: IBlockDataWithId, e: React.MouseEvent) => {
      e.stopPropagation();
      const blockData = get(values, id) as IBlockData | null;

      if (blockData) {
        blockData.data.hidden = !Boolean(blockData.data.hidden);
        setValueByIdx(id, blockData);
      }
    },
    [setValueByIdx, values]
  );

  const renderTitle = useCallback(
    (data: IBlockDataWithId) => {
      const block = BlockManager.getBlockByType(data.type);
      return (
        <div className={styles.title}>
          <TextStyle size='smallest'>{block?.name}</TextStyle>
          <div className={styles.eyeIcon}>
            <EyeIcon blockData={data} onToggleVisible={onToggleVisible} />
          </div>
        </div>
      );
    },
    [onToggleVisible]
  );

  const treeData = useMemo(() => {
    const copyData = cloneDeep(pageData) as IBlockDataWithId;
    const loop = (
      item: IBlockDataWithId,
      id: string,
      parent: IBlockDataWithId | null
    ) => {
      item.id = id;
      item.parent = parent;
      item.children.map((child, index) =>
        loop(child, getChildIdx(id, index), item)
      );
    };

    loop(copyData, getPageIdx(), null);

    return [copyData];
  }, [pageData]);

  const onSelect = useCallback(
    (selectedId: string) => {
      setFocusIdx(selectedId);
      scrollBlockEleIntoView({ idx: selectedId });
    },
    [setFocusIdx]
  );

  const onContextMenu = useCallback(
    (blockData: IBlockDataWithId, ev: React.MouseEvent) => {
      ev.preventDefault();
      setContextMenuData({ blockData, left: ev.clientX, top: ev.clientY });
    },
    []
  );

  const onCloseContextMenu = useCallback((ev?: React.MouseEvent) => {
    setContextMenuData(null);
  }, []);

  const onMouseEnter = useCallback(
    (id: string) => {
      setHoverIdx(id);
    },
    [setHoverIdx]
  );

  const onMouseLeave = useCallback(() => {
    setHoverIdx('');
  }, [setHoverIdx]);

  const allowDrop: BlockTreeProps<IBlockDataWithId>['allowDrop'] = useCallback(
    (params) => {
      const { dragNode, dropNode, willInsertAfter } = params;
      const dragBlock = BlockManager.getBlockByType(dragNode.type);
      if (!dragBlock) return false;

      if (
        dragBlock.validParentType.includes(dropNode.type) &&
        willInsertAfter
      ) {
        return true;
      }
      if (
        dropNode.parent &&
        dragBlock.validParentType.includes(dropNode.parent.type)
      ) {
        return true;
      }

      return false;
    },
    []
  );

  const onDrop: BlockTreeProps<IBlockDataWithId>['onDrop'] = useCallback(
    (params) => {
      const { dragNode, dropNode, willInsertAfter } = params;
      const dragBlock = BlockManager.getBlockByType(dragNode.type);
      if (!dragBlock) return;

      if (
        dragBlock.validParentType.includes(dropNode.type) &&
        willInsertAfter
      ) {
        moveBlock(dragNode.id, getChildIdx(dropNode.id, 0));
      } else {
        moveBlock(
          dragNode.id,
          willInsertAfter ? getSiblingIdx(dropNode.id, 1) : dropNode.id
        );
      }
    },
    [moveBlock]
  );

  const hasFocus = Boolean(focusIdx);

  return useMemo(() => {
    if (!hasFocus) return null;
    return (
      <div
        id='BlockLayerManager'
        {
        ...{
          [DATA_ATTRIBUTE_DROP_CONTAINER]: "true"
        }
        }>
        <BlockTree<IBlockDataWithId>
          selectedId={focusIdx}
          defaultExpandAll
          treeData={treeData}
          renderTitle={renderTitle}
          allowDrop={allowDrop}
          onContextMenu={onContextMenu}
          onDrop={onDrop}
          onSelect={onSelect}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        {contextMenuData && (
          <ContextMenu
            onClose={onCloseContextMenu}
            moveBlock={moveBlock}
            copyBlock={copyBlock}
            removeBlock={removeBlock}
            contextMenuData={contextMenuData}
          />
        )}
      </div>
    );
  }, [
    hasFocus,
    focusIdx,
    treeData,
    renderTitle,
    allowDrop,
    onContextMenu,
    onDrop,
    onSelect,
    onMouseEnter,
    onMouseLeave,
    contextMenuData,
    onCloseContextMenu,
    onUploadImage,
    onAddCollection,
    moveBlock,
    copyBlock,
    removeBlock,
  ]);
}
