import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  DATA_ATTRIBUTE_DROP_CONTAINER,
  DATA_ATTRIBUTE_ID,
  IconFont,
  scrollBlockEleIntoView,
  Stack,
  TextStyle,
  useBlock,
  useEditorContext,
  useFocusIdx,
  useHoverIdx,
  useRefState,
} from 'easy-email-editor';
import {
  BasicType,
  BlockManager,
  getChildIdx,
  getIndexByIdx,
  getNodeIdxClassName,
  getPageIdx,
  getParentIdx,
  IBlockData,
} from 'easy-email-core';
import styles from './index.module.scss';
import { cloneDeep, get } from 'lodash';
import { EyeIcon } from './components/EyeIcon';
import { BlockTree, BlockTreeProps } from './components/BlockTree';
import { ContextMenu } from './components/ContextMenu';
import { classnames } from '@extensions/utils/classnames';
import {
  getDirectionFormDropPosition,
  useAvatarWrapperDrop,
} from './hooks/useAvatarWrapperDrop';
import { getIconNameByBlockType } from '@extensions/AttributePanel/utils/getIconNameByBlockType';
import { Space } from '@arco-design/web-react';
import { getBlockTitle } from '@extensions/utils/getBlockTitle';

export interface IBlockDataWithId extends IBlockData {
  id: string;
  icon?: React.ReactElement;
  parent: IBlockDataWithId | null;
  children: IBlockDataWithId[];
  className?: string;
}

export function BlockLayer() {
  const { pageData } = useEditorContext();

  const { focusIdx, setFocusIdx } = useFocusIdx();
  const { setHoverIdx, setIsDragging, setDirection } = useHoverIdx();
  const { moveBlock, setValueByIdx, copyBlock, removeBlock, values } =
    useBlock();

  const { setBlockLayerRef, allowDrop, removeHightLightClassName } =
    useAvatarWrapperDrop();

  const valueRef = useRefState(values);

  const [contextMenuData, setContextMenuData] = useState<{
    blockData: IBlockDataWithId;
    left: number;
    top: number;
  } | null>(null);

  const onToggleVisible = useCallback(
    ({ id }: IBlockDataWithId, e: React.MouseEvent) => {
      e.stopPropagation();
      const blockData = get(valueRef.current, id) as IBlockData | null;

      if (blockData) {
        blockData.data.hidden = !Boolean(blockData.data.hidden);
        setValueByIdx(id, blockData);
      }
    },
    [setValueByIdx]
  );

  const renderTitle = useCallback(
    (data: IBlockDataWithId) => {
      const isPage = data.type === BasicType.PAGE;
      const title = getBlockTitle(data);
      return (
        <div
          data-tree-idx={data.id}
          className={classnames(
            styles.title,
            !isPage && getNodeIdxClassName(data.id),
            !isPage && 'email-block'
          )}
        >
          <Space align='center' size='mini'>
            <IconFont
              iconName={getIconNameByBlockType(data.type)}
              style={{ fontSize: 12, color: '#999' }}
            />
            <div
              title={title}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '5em' }}
            >
              <TextStyle size='smallest'>{title}</TextStyle>
            </div>
          </Space>
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
      setTimeout(() => {
        scrollBlockEleIntoView({ idx: selectedId });
      }, 50);
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

  const onDragStart = useCallback(() => {
    setIsDragging(true);
  }, [setIsDragging]);

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  const onDrop: BlockTreeProps<IBlockDataWithId>['onDrop'] = useCallback(
    (params) => {
      const { dragNode, dropNode, dropPosition } = params;
      const dragBlock = BlockManager.getBlockByType(dragNode.dataRef.type);
      if (!dragBlock) return false;
      const dropIndex = getIndexByIdx(dropNode.key);

      if (dropPosition === 0) {
        if (
          dragBlock.validParentType.includes(dropNode.dataRef.type) &&
          dropNode.dataRef.children.length === 0
        ) {
          moveBlock(dragNode.key, getChildIdx(dropNode.key, 0));
        } else if (
          dropNode.parent &&
          dragBlock.validParentType.includes(dropNode.parent.type)
        ) {
          // drop to parent
          moveBlock(dragNode.key, getChildIdx(dropNode.parentKey, dropIndex));
        }
      } else {
        moveBlock(
          dragNode.key,
          getChildIdx(
            dropNode.parentKey,
            dropPosition > 0 ? dropIndex + 1 : dropIndex
          )
        );
      }
    },
    [moveBlock]
  );

  const blockTreeAllowDrop: BlockTreeProps<IBlockDataWithId>['allowDrop'] =
    useCallback(
      (data) => {
        const dropResult = allowDrop(data);
        if (dropResult) {
          const node = document.querySelector(
            `[data-tree-idx="${dropResult.key}"]`
          )?.parentNode?.parentNode;
          if (node instanceof HTMLElement) {
            removeHightLightClassName();
            node.classList.add('arco-tree-node-title-gap-bottom');
          }
          setDirection(getDirectionFormDropPosition(dropResult.position));
          setHoverIdx(dropResult.key);
        }

        return dropResult;
      },
      [allowDrop]
    );

  const selectedKeys = useMemo(() => {
    if (!focusIdx) return [];

    return [focusIdx];
  }, [focusIdx]);

  const expandedKeys = useMemo(() => {
    if (!focusIdx) return [];
    let currentIdx = getParentIdx(focusIdx);
    const keys: string[] = [];
    while (currentIdx) {
      keys.push(currentIdx);
      currentIdx = getParentIdx(currentIdx);
    }
    return keys;
  }, [focusIdx]);

  const hasFocus = Boolean(focusIdx);

  if (!hasFocus) return null;
  return (
    <div
      ref={setBlockLayerRef}
      id='BlockLayerManager'
      {...{
        [DATA_ATTRIBUTE_DROP_CONTAINER]: 'true',
      }}
    >
      <BlockTree<IBlockDataWithId>
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        defaultExpandAll
        treeData={treeData}
        renderTitle={renderTitle}
        allowDrop={blockTreeAllowDrop}
        onContextMenu={onContextMenu}
        onDrop={onDrop}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
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
}
