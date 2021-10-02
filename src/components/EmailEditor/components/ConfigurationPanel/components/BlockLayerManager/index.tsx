import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useEditorContext } from '@/hooks/useEditorContext';
import { IBlockData } from '@/typings';
import { getPageIdx } from '@/utils/block';
import { BasicType, BlockType } from '@/constants';
import styles from './index.module.scss';
import { classnames } from '@/utils/classnames';

import { BlockInteractiveStyle } from '../../../BlockInteractiveStyle';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { BlockSortableWrapper } from '@/components/core/wrapper/BlockSortableWrapper';
import { BlockLayerItem } from './components/BlockLayerItem';

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

  const hasFocus = Boolean(focusIdx);
  return useMemo(() => {
    if (!hasFocus) return null;
    return (
      <div id='BlockLayerManager'>
        <BlockInteractiveStyle isShadowDom={false} />

        {list.map((block, blockIndex) => (
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
        ))}
      </div>
    );
  }, [hasFocus, list]);
}
