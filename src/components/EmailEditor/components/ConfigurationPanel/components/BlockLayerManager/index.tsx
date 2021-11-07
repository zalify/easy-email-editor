import React, { useCallback, useMemo } from 'react';
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

interface IBlockDataWithId extends IBlockData {
  id: string;
  parent: IBlockDataWithId | null;
  children: IBlockDataWithId[];
}

export function BlockLayerManager() {
  const { pageData } = useEditorContext();
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const { setHoverIdx } = useHoverIdx();
  const { moveBlock } = useBlock();

  const renderTitle = useCallback((data: IBlockDataWithId) => {
    const block = BlocksMap.findBlockByType(data.type);
    return (
      <div style={{ padding: 4, display: 'flex', justifyContent: 'space-between', paddingRight: 8 }}>
        <TextStyle size="smallest">{block.name}</TextStyle>
        <div>
          <EyeIcon blockData={data} idx={data.id} />
          <ContextMenu idx={data.id} />
        </div>
      </div>
    );
  }, []);

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

  const onSelect = useCallback((selectedId: string) => {
    setFocusIdx(selectedId);
    scrollFocusBlockIntoView({ idx: selectedId, inShadowDom: true });
  }, [setFocusIdx]);

  const onMouseEnter = useCallback((id: string) => {
    setHoverIdx(id);
  }, [setHoverIdx]);

  const onMouseLeave = useCallback(() => {
    setHoverIdx('');
  }, [setHoverIdx]);

  const allowDrop: BlockTreeProps<IBlockDataWithId>['allowDrop'] = useCallback(
    (params) => {
      const {
        dragNode,
        dropNode,
        willInsertAfter
      } = params;
      const dragBlock = BlocksMap.findBlockByType(dragNode.type);
      if (dragBlock.validParentType.includes(dropNode.type) && willInsertAfter) {
        return true;
      }
      if (dropNode.parent && dragBlock.validParentType.includes(dropNode.parent.type)) {
        return true;
      }

      return false;
    },
    []
  );

  const onDrop: BlockTreeProps<IBlockDataWithId>['onDrop'] = useCallback(
    (params) => {
      const {
        dragNode,
        dropNode,
        willInsertAfter,
      } = params;
      const dragBlock = BlocksMap.findBlockByType(dragNode.type);

      if (dragBlock.validParentType.includes(dropNode.type) && willInsertAfter) {
        moveBlock(
          dragNode.id,
          getChildIdx(dropNode.id, 0)
        );
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
          onDrop={onDrop}
          onSelect={onSelect}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </div>
    );
  }, [hasFocus, focusIdx, treeData, renderTitle, allowDrop, onDrop, onSelect, onMouseEnter, onMouseLeave]);
}
