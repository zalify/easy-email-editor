import React, { useCallback, useMemo } from 'react';
import { useEditorContext } from '@/hooks/useEditorContext';
import { IBlockData } from '@/typings';
import { getChildIdx, getPageIdx } from '@/utils/block';
import styles from './index.module.scss';
import { classnames } from '@/utils/classnames';

import { BlockInteractiveStyle } from '../../../BlockInteractiveStyle';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { BlockLayerItem } from './components/BlockLayerItem';
import { BlockTree } from './components/BlockTree';

interface IBlockDataWithId extends IBlockData {
  id: string;
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

  const getId = useCallback((index: number, parentId: string, data: IBlockData<any, any>) => {
    return getChildIdx(parentId, index);
  }, []);

  const hasFocus = Boolean(focusIdx);
  return useMemo(() => {
    if (!hasFocus) return null;
    return (
      <div id='BlockLayerManager'>
        <BlockInteractiveStyle isShadowDom={false} />
        <BlockTree defaultExpandAll data={pageData} getId={getId} renderTitle={renderTitle} />

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
  }, [getId, hasFocus, pageData, renderTitle]);
}
