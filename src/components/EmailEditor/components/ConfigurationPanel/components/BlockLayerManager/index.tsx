import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useEditorContext } from '@/hooks/useEditorContext';
import { IBlockData } from '@/typings';
import { getChildIdx, getPageIdx, getSiblingIdx } from '@/utils/block';

import { BlockInteractiveStyle } from '../../../BlockInteractiveStyle';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { BlockTree, BlockTreeProps } from './components/BlockTree';
import { cloneDeep } from 'lodash';
import { useBlock } from '@/hooks/useBlock';
import { scrollFocusBlockIntoView } from '@/utils/scrollFocusBlockIntoView';
import { EyeIcon } from './components/EyeIcon';
import { useHoverIdx } from '@/hooks/useHoverIdx';
import { TextStyle } from '@/components/UI/TextStyle';
import { BlocksMap } from '@/components/core/blocks';
import { ContextMenu } from '../../../ContextMenu';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';

export interface IBlockDataWithId extends IBlockData {
  id: string;
  parent: IBlockDataWithId | null;
  children: IBlockDataWithId[];
}

export function BlockLayerManager() {
  const { pageData } = useEditorContext();
  const { onUploadImage, onAddCollection } = useContext(EditorPropsContext);
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const { setHoverIdx } = useHoverIdx();
  const { moveBlock, setValueByIdx, copyBlock, removeBlock } = useBlock();
  const [contextMenuData, setContextMenuData] = useState<{
    blockData: IBlockDataWithId;
    left: number;
    top: number;
  } | null>(null);

  const onToggleVisible = useCallback(
    (blockData: IBlockDataWithId, e: React.MouseEvent) => {
      e.stopPropagation();
      blockData.data.hidden = !blockData.data.hidden;
      setValueByIdx(blockData.id, blockData);
    },
    [setValueByIdx]
  );

  const renderTitle = useCallback(
    (data: IBlockDataWithId) => {
      const block = BlocksMap.findBlockByType(data.type);
      return (
        <div
          style={{
            padding: 4,
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: 8,
          }}
        >
          <TextStyle size='smallest'>{block.name}</TextStyle>
          <div>
            <EyeIcon blockData={data} onToggleVisible={onToggleVisible} />
            {/* <ContextMenu idx={data.id} /> */}
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
      scrollFocusBlockIntoView({ idx: selectedId, inShadowDom: true });
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
      const dragBlock = BlocksMap.findBlockByType(dragNode.type);
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
      const dragBlock = BlocksMap.findBlockByType(dragNode.type);

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
      <div id='BlockLayerManager'>
        <BlockInteractiveStyle isShadowDom={false} />
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
            onUploadImage={onUploadImage}
            onAddCollection={onAddCollection}
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
