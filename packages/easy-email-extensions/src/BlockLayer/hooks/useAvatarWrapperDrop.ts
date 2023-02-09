import { getParentIdx, getIndexByIdx, BlockManager, getNodeIdxFromClassName } from 'easy-email-core';
import { useCallback, useEffect, useState } from 'react';
import {
  getBlockNodeByChildEle,
  getDirectionPosition,
  useEditorContext,
  useDataTransfer,
  useHoverIdx,
  useRefState,
} from 'easy-email-editor';
import { debounce, get } from 'lodash';
import { IBlockDataWithId } from '..';
import { BlockTreeProps } from '../components/BlockTree';

export function useAvatarWrapperDrop() {
  const [blockLayerRef, setBlockLayerRef] = useState<HTMLElement | null>(null);

  const { setHoverIdx, setDirection } = useHoverIdx();
  const { dataTransfer, setDataTransfer } = useDataTransfer();
  const {
    formState: { values },
  } = useEditorContext();

  const valuesRef = useRefState(values);
  const dataTransferRef = useRefState(dataTransfer);

  function isKeyObject(o: any): o is {
    key: string;
  } {
    return o.key !== undefined;
  }

  const removeHightLightClassName = useCallback(() => {
    if (!blockLayerRef) return;
    blockLayerRef
      .querySelectorAll(
        '.arco-tree-node-title-gap-top, .arco-tree-node-title-gap-bottom, .arco-tree-node-title-highlight'
      )
      .forEach((item) => {
        item.classList.remove(
          'arco-tree-node-title-gap-top',
          'arco-tree-node-title-gap-bottom',
          'arco-tree-node-title-highlight'
        );
      });
  }, [blockLayerRef]);

  const allowDrop: BlockTreeProps<IBlockDataWithId>['allowDrop'] = useCallback(
    (params) => {
      const { dragNode, dropNode, dropPosition } = params;
      let dragType;
      if (isKeyObject(dragNode)) {
        const blockData = get(valuesRef.current, dragNode.key);
        if (!blockData) return false;
        dragType = blockData.type;
      } else {
        dragType = dragNode.type;
      }
      const dragBlock = BlockManager.getBlockByType(dragType);
      if (!dragBlock) return false;

      if (dropPosition === 0) {
        if (
          BlockManager.getAutoCompletePath(
            dragBlock.type,
            dropNode.dataRef.type
          ) &&
          dropNode.dataRef.children.length === 0
        ) {
          return {
            position: 0,
            key: dropNode.key,
          };
        } else if (
          dropNode.parent &&
          dragBlock.validParentType.includes(dropNode.parent.type)
        ) {
          // drop to next sibling
          return {
            position: -1,
            key: dropNode.key,
          };
        }
      } else {
        if (
          dropNode.parent &&
          dragBlock.validParentType.includes(dropNode.parent.type)
        ) {
          return {
            position: dropPosition,
            key: dropNode.key,
          };
        }
      }
      setDirection('');
      setHoverIdx('');
      return false;
    },
    [setDirection, setHoverIdx, valuesRef]
  );

  useEffect(() => {
    if (blockLayerRef) {
      const onDragOver = debounce((ev: DragEvent) => {
        if (!dataTransferRef.current) return;

        const blockNode = getBlockNodeByChildEle(ev.target as HTMLDivElement);
        if (!blockNode || !ev.target) return;

        const directionPosition = getDirectionPosition(ev, 5);
        const treeNodeEle = blockNode.parentNode?.parentNode
          ?.parentNode as HTMLElement;

        if (!treeNodeEle) return;

        removeHightLightClassName();

        const dropIdx = getNodeIdxFromClassName(blockNode.classList)!;
        if (!dropIdx) return;
        const dropParentIdx = getParentIdx(dropIdx);

        const dropBlockData = get(valuesRef.current, dropIdx);
        const dropParentBlockData = dropParentIdx
          ? get(valuesRef.current, dropParentIdx)
          : null;

        let dropPosition = 0;
        if (
          directionPosition.vertical.direction === 'top' &&
          directionPosition.vertical.isEdge
        ) {
          dropPosition = -1;
        } else if (
          directionPosition.vertical.direction === 'bottom' &&
          directionPosition.vertical.isEdge
        ) {
          dropPosition = 1;
        }
        const dropResult = allowDrop({
          dragNode: {
            type: dataTransferRef.current.type,
          },
          dropNode: {
            dataRef: dropBlockData,
            key: dropIdx,
            parent: dropParentBlockData,
          },
          dropPosition,
        });
        if (!dropResult) return;

        const node = document.querySelector(
          `[data-tree-idx="${dropResult.key}"]`
        )?.parentNode?.parentNode;
        if (node instanceof HTMLElement) {
          removeHightLightClassName();
          node.classList.add('arco-tree-node-title-gap-bottom');
        }
        setDirection(getDirectionFormDropPosition(dropResult.position));
        setHoverIdx(dropResult.key);

        if (dropResult.position === -1) {
          treeNodeEle.classList.add('arco-tree-node-title-gap-top');
          setDataTransfer((dataTransfer: any) => {
            return {
              ...dataTransfer,
              parentIdx: dropParentIdx,
              positionIndex: getIndexByIdx(dropIdx),
            };
          });
        } else if (dropResult.position === 1) {
          setDataTransfer((dataTransfer: any) => {
            return {
              ...dataTransfer,
              parentIdx: dropParentIdx,
              positionIndex: getIndexByIdx(dropIdx) + 1,
            };
          });
          treeNodeEle.classList.add('arco-tree-node-title-gap-bottom');
        } else {
          treeNodeEle.classList.add('arco-tree-node-title-highlight');
          setDataTransfer((dataTransfer: any) => {
            return {
              ...dataTransfer,
              parentIdx: dropIdx,
              positionIndex: 0,
            };
          });
        }
      });

      const onDragend = (ev: DragEvent) => {
        removeHightLightClassName();
      };

      const onDrop = (ev: DragEvent) => {
        setTimeout(() => {
          removeHightLightClassName();
        }, 0);
      };

      blockLayerRef.addEventListener('dragover', onDragOver);
      blockLayerRef.addEventListener('drop', onDrop);
      blockLayerRef.addEventListener('dragleave', onDragend);

      return () => {
        blockLayerRef.removeEventListener('dragover', onDragOver);
        blockLayerRef.removeEventListener('drop', onDrop);
        blockLayerRef.removeEventListener('dragleave', onDragend);
      };
    }
  }, [
    blockLayerRef,
    dataTransferRef,
    valuesRef,
    removeHightLightClassName,
    allowDrop,
    setDirection,
    setHoverIdx,
    setDataTransfer,
  ]);

  return {
    setBlockLayerRef,
    blockLayerRef,
    allowDrop,
    removeHightLightClassName,
  };
}

export function getDirectionFormDropPosition(position: number) {
  if (position === -1) return 'top';
  if (position === 1) return 'bottom';
  return '';
}
