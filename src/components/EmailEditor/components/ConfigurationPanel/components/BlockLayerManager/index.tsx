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
  getPageIdx,
} from '@/utils/block';
import { useBlock } from '@/hooks/useBlock';
import { BasicType } from '@/constants';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import styles from './index.module.scss';
import { classnames } from '@/utils/classnames';
import { useDropBlock } from '@/hooks/useDropBlock';

import { BlockInteractiveStyle } from '../../../BlockInteractiveStyle';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { useCollapse } from '@/hooks/useCollapse';
import { IconFont } from '@/components/IconFont';
import { getIconNameByBlockType } from '@/utils/getIconNameByBlockType';
import { BlocksMap } from '@/components/core/blocks';
import { AddBlockPanel } from './components/AddBlockPanel';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import { useHoverIdx } from '@/hooks/useHoverIdx';

export function BlockLayerManager() {
  const { pageData } = useEditorContext();
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    if (!focusIdx) return null;
    return (
      <div id='BlockLayerManager'>
        <DragDropContext onDragEnd={() => { }}>
          <Droppable droppableId={getPageIdx()}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={classnames(styles.blockList)}
              >
                <BlockLayerItem
                  indent={0}
                  blockData={pageData}
                  idx={getPageIdx()}
                />
              </div>
            )}
          </Droppable>

          <BlockInteractiveStyle isShadowDom={false} />
        </DragDropContext>
      </div>
    );
  }, [pageData, focusIdx]);
}

const BlockLayerItem = ({
  blockData,
  idx,
  indent,
  hidden,
}: {
  blockData: IBlockData;
  idx: string;
  indent: number;
  hidden?: boolean;
}) => {
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const { collapsed, setCollapsed } = useCollapse();
  const [visible, setVisible] = useState(false);
  const title = findBlockByType(blockData.type)?.name;
  const noChild = blockData.children.length === 0;
  const isPageBlock = idx === getPageIdx();
  const { moveBlock } = useBlock();

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index && result.destination.droppableId === result.source.droppableId) {
      return;
    }
    moveBlock({
      sourceIdx: getChildIdx(result.source.droppableId, result.source.index),
      destinationIdx: getChildIdx(result.destination.droppableId, result.destination.index),
    });

  };

  const onDragStart = () => {
  };

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

  const isContentBlock = BlocksMap.findBlockByType(
    blockData.type
  ).validParentType.includes(BasicType.COLUMN);

  const renderItem = () => {
    return (
      <Draggable
        draggableId={idx}
        index={getIndexByIdx(idx)}
        isDragDisabled={idx === getPageIdx()}
      >
        {(provided, snapshot) => {
          const dragingStyle: React.CSSProperties = snapshot?.isDragging
            ? {
              boxShadow: '0px 0px 5px  #e2dcdc',
              backgroundColor: '#fff',
            }
            : {};

          return (
            <div
              onClick={onSelect}
              data-dragging={Boolean(snapshot?.isDragging)}
              ref={provided.innerRef}
              {...provided.draggableProps}
              style={{
                ...provided?.draggableProps.style,
                ...dragingStyle,
              }}
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
                    <div
                      {...provided.dragHandleProps}
                    >
                      <IconFont iconName='icon-drag' style={{ cursor: 'grab' }} />
                    </div>

                  </Stack>
                </Stack>
              </Stack.Item>
            </div>
          );
        }}
      </Draggable>
    );
  };
  return (
    <>
      <li className={classnames(styles.blockItem)} data-idx={idx}>
        {renderItem()}

        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Droppable droppableId={idx}>
            {(provided, snapshot) => (
              <ul
                ref={provided.innerRef}
                className={classnames(styles.blockList)}
              >
                {visible &&
                  blockData.children.map((item, index) => (
                    <BlockLayerItem
                      hidden={hidden || blockData.data.hidden}
                      key={index}
                      indent={indent + 1}
                      blockData={item}
                      idx={getChildIdx(idx, index)}
                    />
                  ))}
                {/* <li
                  className={classnames(styles.blockItem, styles.blockAdd)}
                  style={{
                    display:
                      isSelected && !isContentBlock && !isDragging
                        ? undefined
                        : 'none',
                  }}
                >
                  <AddBlockPanel
                    type={blockData.type}
                    parentIdx={idx}
                    positionIndex={blockData.children.length}
                  >
                    <div style={{ color: '#2c6ecb' }}>
                      <Stack
                        spacing='extraTight'
                        alignment='center'
                        wrap={false}
                      >
                        <div style={{ width: (indent + 1) * 18 }} />
                        <IconFont iconName='icon-add-cycle' size={12} />

                        <TextStyle size='smallest'>Add block</TextStyle>
                      </Stack>
                    </div>
                  </AddBlockPanel>
                </li> */}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
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
