import React, { useCallback, useMemo } from 'react';
import { useEditorContext } from '@/hooks/useEditorContext';
import { IBlockData } from '@/typings';
import { getChildIdx, getPageIdx } from '@/utils/block';

import { BlockInteractiveStyle } from '../../../BlockInteractiveStyle';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { BlockTree, BlockTreeProps } from './components/BlockTree';
import { cloneDeep } from 'lodash';
import { BlocksMap } from 'easy-email-editor';

interface IBlockDataWithId extends IBlockData {
  id: string;
  parent: IBlockDataWithId | null;
  children: IBlockDataWithId[];
}

export function BlockLayerManager() {
  const { pageData } = useEditorContext();
  const { focusIdx } = useFocusIdx();

  const list = useMemo(() => {
    return [pageData] as any as IBlockDataWithId[];
  }, [pageData]);

  const renderTitle = useCallback((data: IBlockData<any, any>) => {
    return <div>{data.type}</div>;
  }, []);

  const allowDrop: BlockTreeProps<IBlockDataWithId>['allowDrop'] = useCallback((params) => {
    const {
      dragNode,
      dropNode,
      event,
      dragIndex,
      dropIndex,
      willInsertAfter,
    } = params;

    const dragBlock = BlocksMap.findBlockByType(dragNode.type);
    if (dropNode.parent && dragBlock.validParentType.includes(dropNode.parent.type)) {
      return true;
    }

    return false;

  }, []);

  const treeData = useMemo(() => {
    const copyData = cloneDeep(pageData) as IBlockDataWithId;
    const loop = (item: IBlockDataWithId, id: string, parent: IBlockDataWithId | null) => {
      item.id = id;
      item.parent = parent;
      item.children.map((child, index) => loop(child, getChildIdx(id, index), item));
    };

    loop(copyData, getPageIdx(), null);

    return [copyData];

  }, [pageData]);

  const hasFocus = Boolean(focusIdx);
  return useMemo(() => {
    if (!hasFocus) return null;
    return (
      <div id='BlockLayerManager'>
        <BlockInteractiveStyle isShadowDom={false} />
        <BlockTree allowDrop={allowDrop} defaultExpandAll treeData={treeData} renderTitle={renderTitle} />

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
  }, [allowDrop, hasFocus, renderTitle, treeData]);
}
