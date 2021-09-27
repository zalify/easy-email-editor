import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useEditorContext } from '@/hooks/useEditorContext';
import { IBlockData } from '@/typings';
import {
  findBlockByType,
  getChildIdx,
  getIndexByIdx,
  getNodeIdxClassName,
  getNodeTypeClassName,
  getNodeTypeFromClassName,
  getPageIdx,
  getValidChildBlocks,
} from '@/utils/block';
import { useBlock } from '@/hooks/useBlock';
import { BasicType, BlockType } from '@/constants';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import styles from './index.module.scss';
import { classnames } from '@/utils/classnames';

import { BlockInteractiveStyle } from '../../../BlockInteractiveStyle';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { useCollapse } from '@/hooks/useCollapse';
import { IconFont } from '@/components/IconFont';
import { getIconNameByBlockType } from '@/utils/getIconNameByBlockType';
import { BlocksMap } from '@/components/core/blocks';
import { BlockSortableWrapper } from '@/components/core/wrapper/BlockSortableWrapper';
import { useHoverIdx } from '@/hooks/useHoverIdx';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';

interface IBlockDataWithId extends IBlockData {
  id: string;
  children: IBlockDataWithId[];
}

export function BlockLayerManager() {
  const { pageData } = useEditorContext();
  const { focusIdx } = useFocusIdx();

  useEffect(() => {
    setTimeout(() => {
      const block = findBlockNodeByIdx(focusIdx, false);
      console.log('block-scroll', block);
      block?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }, 150);
  }, [focusIdx]);

  const list = useMemo(() => {
    return [pageData] as any as IBlockDataWithId[];
  }, [pageData]);

  return useMemo(() => {
    if (!focusIdx) return null;
    return (
      <div id='BlockLayerManager'>
        <BlockInteractiveStyle isShadowDom={false} />

        <BlockSortableWrapper
          action='move'
          type={BasicType.PAGE}
          list={list}
          disabled
        >
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
        </BlockSortableWrapper>
      </div>
    );
  }, [focusIdx, list]);
}

const BlockLayerItem = ({
  blockData,
  idx,
  indent,
  hidden,
  parentType,
}: {
  blockData: IBlockDataWithId;
  idx: string;
  indent: number;
  parentType: BlockType | null;
  hidden?: boolean;
}) => {
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const { collapsed, setCollapsed } = useCollapse();
  const [visible, setVisible] = useState(false);
  const title = findBlockByType(blockData.type)?.name;
  const noChild = blockData.children.length === 0;
  const isPageBlock = idx === getPageIdx();
  const [isDragging, setIsDragging] = useState(false);
  const { setHoverIdx } = useHoverIdx();

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

  const onSelect = useCallback(() => {
    setFocusIdx(idx);
  }, [idx, setFocusIdx]);

  const onStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isPageBlock) {
        setCollapsed((collapsed) => !collapsed);
      } else {
        setVisible((v) => !v);
      }
    },
    [isPageBlock, setCollapsed]
  );

  const subIcon = useMemo(() => {
    if (
      noChild ||
      BlocksMap.findBlockByType(blockData.type).validParentType.includes(
        BasicType.COLUMN
      )
    )
      return (
        <div style={{ visibility: 'hidden' }}>
          <IconFont size={12} iconName='icon-number' />
        </div>
      );

    const display = isPageBlock ? !collapsed : visible;
    if (display) {
      return (
        <IconFont
          size={12}
          iconName='icon-minus-square'
          onClickCapture={onToggle}
        />
      );
    }
    return (
      <IconFont
        size={12}
        iconName='icon-plus-square'
        onClickCapture={onToggle}
      />
    );
  }, [blockData.type, collapsed, isPageBlock, noChild, onToggle, visible]);

  const isSelected = idx === focusIdx;

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
    ) as any as IBlockDataWithId[];
  }, [blockData.children, childPlaceHolder, isDragging]);

  const onMouseEnter = () => {
    setHoverIdx(idx);
  };

  const onMouseLeave = () => {
    setHoverIdx('');
  };

  const renderItem = () => {
    return (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onSelect}
        className={classnames(
          styles.listItemContentWrapper,
          isSelected && styles.listItemSelected
        )}
      >
        <Stack.Item fill>
          <Stack distribution='equalSpacing'>
            <Stack spacing='none' wrap={false}>
              <div style={{ width: indent * 18 }} />
              <Stack.Item fill>
                <div className={styles.listItemContent}>
                  <Stack wrap={false} spacing='tight' alignment='center'>
                    {subIcon}
                    <IconFont
                      iconName={getIconNameByBlockType(blockData.type)}
                      style={{ fontSize: 12 }}
                    />

                    <TextStyle size='smallest'>
                      <span
                        title={title}
                        style={{
                          maxWidth: 100,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'block',
                        }}
                      >
                        {title}
                      </span>
                    </TextStyle>
                  </Stack>
                </div>
              </Stack.Item>
            </Stack>
            <Stack spacing='extraTight' wrap={false}>
              {/* <ShortcutTool idx={idx} blockData={blockData} /> */}
              <EyeIcon hidden={hidden} idx={idx} blockData={blockData} />
              <div>
                <IconFont iconName='icon-drag' style={{ cursor: 'grab' }} />
              </div>
            </Stack>
          </Stack>
        </Stack.Item>
      </div>
    );
  };
  if (blockData.data.value.placeholder) {
    return (
      <li
        className={classnames(
          styles.blockItem,
          getNodeIdxClassName(idx),
          getNodeTypeClassName(blockData.type)
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
    );
  }
  return (
    <>
      <li
        className={classnames(
          styles.blockItem,
          'email-block',
          getNodeIdxClassName(idx),
          getNodeTypeClassName(blockData.type)
        )}
        onMouseDown={(e) => {
          if (blockData.data.value.placeholder) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        data-parent-type={parentType}
        data-idx={idx}
      >
        {renderItem()}
        {visible && (
          <ul className={classnames(styles.blockList)}>
            <BlockSortableWrapper
              type={blockData.type}
              action='move'
              key={idx}
              idx={idx}
              list={childrenList}
              onStart={onStart}
              onEnd={onEnd}
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
            </BlockSortableWrapper>
            {/* <li
              className={classnames(styles.blockItem, styles.blockAdd)}
              style={{}}
            >
              <AddBlockPanel
                type={blockData.type}
                parentIdx={idx}
                positionIndex={blockData.children.length}
              >
                <div style={{ color: '#2c6ecb' }}>
                  <Stack spacing='extraTight' alignment='center' wrap={false}>
                    <div style={{ width: (indent + 1) * 18 }} />
                    <IconFont iconName='icon-add-cycle' size={12} />

                    <TextStyle size='smallest'>Add block</TextStyle>
                  </Stack>
                </div>
              </AddBlockPanel>
            </li> */}
          </ul>
        )}
      </li>
    </>
  );
};

function EyeIcon({
  idx,
  blockData,
  hidden,
}: {
  idx: string;
  blockData: IBlockData;
  hidden?: boolean;
}) {
  const { setValueByIdx } = useBlock();

  const onToggleVisible = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      blockData.data.hidden = !blockData.data.hidden;
      setValueByIdx(idx, blockData);
    },
    [blockData, idx, setValueByIdx]
  );

  if (hidden)
    return (
      <div style={{ visibility: 'hidden' }}>
        <EyeOutlined />
      </div>
    );
  if (blockData.type === BasicType.PAGE) return null;

  return blockData.data.hidden ? (
    <EyeInvisibleOutlined onClick={onToggleVisible} />
  ) : (
    <EyeOutlined onClick={onToggleVisible} />
  );
}

function ShortcutTool({
  idx,
  blockData,
}: {
  idx: string;
  blockData: IBlockData;
}) {
  const { copyBlock, removeBlock } = useBlock();

  const enHanceHandler = useCallback((handler: (...rest: any) => void) => {
    return (e: React.MouseEvent) => {
      e.stopPropagation();
      handler();
    };
  }, []);

  if (blockData.type === BasicType.PAGE) return null;
  return (
    <div className={styles.shortcutTool} onClick={(e) => e.stopPropagation()}>
      <Stack spacing='extraTight'>
        <IconFont
          iconName='icon-copy'
          size={12}
          onClickCapture={enHanceHandler(() => copyBlock(idx))}
        />
        <IconFont
          iconName='icon-delete'
          size={12}
          onClickCapture={enHanceHandler(() => removeBlock(idx))}
        />
      </Stack>
    </div>
  );
}
