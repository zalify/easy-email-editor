import React, { useCallback, useMemo } from 'react';
import { useEditorContext } from '@/hooks/useEditorContext';
import { IBlockData } from '@/typings';
import { getChildIdx, getPageIdx, getSiblingIdx } from '@/utils/block';

import { BlockInteractiveStyle } from '../../../BlockInteractiveStyle';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { BlockTree, BlockTreeProps } from './components/BlockTree';
import { cloneDeep } from 'lodash';
import { BlocksMap } from 'easy-email-editor';
import { useBlock } from '@/hooks/useBlock';

interface IBlockDataWithId extends IBlockData {
  id: string;
  parent: IBlockDataWithId | null;
  children: IBlockDataWithId[];
}

export function BlockLayerManager() {
  const { pageData } = useEditorContext();
  const { focusIdx } = useFocusIdx();
  const { moveBlock } = useBlock();

  const renderTitle = useCallback((data: IBlockData<any, any>) => {
    return <div>{data.type}</div>;
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
      if (
        dropNode.parent && dragBlock.validParentType.includes(dropNode.parent.type)
      ) {
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
          defaultExpandAll
          treeData={treeData}
          renderTitle={renderTitle}
          allowDrop={allowDrop}
          onDrop={onDrop}
        />

        {/* {list.map((block, blockIndex) => (
          <div
            className={classnames(styles.blockList)}
            data-parent-type={null}
            data-idx={getPageIdx()}
            key={blockIndex}
          >
            <BlockLayerItem
              indent={0}
              parentType={null}
              blockData={block}
              idx={getPageIdx()}
            />
          </div>
        ))} */}
      </div>
    );
  }, [allowDrop, hasFocus, onDrop, renderTitle, treeData]);
}
