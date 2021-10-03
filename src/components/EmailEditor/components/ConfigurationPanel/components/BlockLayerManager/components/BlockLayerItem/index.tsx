import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IBlockData } from '@/typings';
import {
  getChildIdx,
  getNodeIdxClassName,
  getNodeTypeClassName,
  getPageIdx,
  getValidChildBlocks,
} from '@/utils/block';
import { BlockType } from '@/constants';
import styles from './index.module.scss';
import { classnames } from '@/utils/classnames';

import { useFocusIdx } from '@/hooks/useFocusIdx';
import { useCollapse } from '@/hooks/useCollapse';
import { BlockSortableWrapper } from '@/components/core/wrapper/BlockSortableWrapper';
import { BlockLayerItemContent } from '../BlockLayerItemContent';

export const BlockLayerItem = ({
  blockData,
  idx,
  indent,
  hidden,
  parentType,
}: {
  blockData: IBlockData;
  idx: string;
  indent: number;
  parentType: BlockType | null;
  hidden?: boolean;
}) => {
  const { focusIdx } = useFocusIdx();
  const { collapsed } = useCollapse();
  const [visible, setVisible] = useState(false);
  const isPageBlock = idx === getPageIdx();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isPageBlock) {
      setVisible(true);
    } else {
      setVisible(!collapsed);
    }
  }, [collapsed, isPageBlock]);

  useEffect(() => {
    if (focusIdx.startsWith(idx)) {
      setVisible(true);
    }
  }, [blockData.type, focusIdx, idx]);

  const onStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const childPlaceHolder = useMemo(() => {
    const validChildBlock = getValidChildBlocks(blockData.type)[0];
    if (validChildBlock) {
      return validChildBlock.create({
        data: {
          value: {
            placeholder: true,
          },
        },
      });
    }
    return null;
  }, [blockData.type]);

  const childrenList = useMemo(() => {
    if (blockData.children.length > 1) return blockData.children;
    if (blockData.children.length == 1 && !isDragging)
      return blockData.children;
    return [...blockData.children, childPlaceHolder].filter(
      Boolean
    ) as IBlockData[];
  }, [blockData.children, childPlaceHolder, isDragging]);
  return useMemo(() => {

    if (blockData.data.value.placeholder) {
      return (
        <BlockSortableWrapper
          type={blockData.type}
          action='move'
          key={idx}
          idx={idx}
          payload={blockData}
          onStart={onStart}
          onEnd={onEnd}
          className={classnames(
            styles.blockItem,
            'email-block',
            getNodeIdxClassName(idx),
            getNodeTypeClassName(blockData.type)
          )}
        >
          <li
            className={classnames(
              styles.blockItem,
            )}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{
              opacity: 0,
              cursor: 'default',
            }}
            data-parent-type={parentType}
            data-idx={idx}
          >
            Placeholder
          </li>
        </BlockSortableWrapper>

      );
    }
    const onlyPlaceHolderChild =
      blockData.children.length === 0 && childrenList.length === 1;
    return (
      <BlockSortableWrapper
        type={blockData.type}
        action='move'
        key={idx}
        idx={idx}
        payload={blockData}
        onStart={onStart}
        onEnd={onEnd}
        className={classnames(
          styles.blockItem,
          'email-block',
          getNodeIdxClassName(idx),
          getNodeTypeClassName(blockData.type)
        )}
      >
        <li
          data-parent-type={parentType}
          data-idx={idx}
        >
          <BlockLayerItemContent
            visible={visible}
            setVisible={setVisible}
            blockData={blockData}
            idx={idx}
            indent={indent}
            parentType={parentType}
          />

          {(visible || onlyPlaceHolderChild) && (
            <ul
              className={classnames(styles.blockList)}
            >
              {childrenList.map((item, index) => (
                <BlockLayerItem
                  hidden={hidden || blockData.data.hidden}
                  key={index}
                  indent={indent + 1}
                  blockData={item}
                  parentType={blockData.type}
                  idx={getChildIdx(idx, index)}
                />
              ))}

            </ul>
          )}
        </li>
      </BlockSortableWrapper>

    );
  }, [blockData, childrenList, hidden, idx, indent, onEnd, onStart, parentType, visible]);
};
