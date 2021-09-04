import { BasicType, BLOCK_HOVER_CLASSNAME } from './../constants';
import { useEffect, useMemo, useState, useContext, useRef } from 'react';

import {
  getIndexByIdx,
  getNodeIdxFromClassName,
  getNodeTypeFromClassName,
  getParentByType,
  getParentIdx,
  getParenRelativeByType,
  getChildIdx,
} from '@/utils/block';
import { findBlockNode } from '@/utils/findBlockNode';
import { BlockType, DRAG_HOVER_CLASSNAME } from '@/constants';
import { useBlock } from '@/hooks/useBlock';
import { getTangentDirection } from '@/utils/getTangentDirection';
import { get } from 'lodash';
import { findBlockNodeByIdx, getBlockNodes } from '@/utils/findBlockNodeByIdx';
import { useFocusIdx } from './useFocusIdx';
import { useDataTransfer } from './useDataTransfer';
import { useHoverIdx } from './useHoverIdx';
import { findInsertNode } from '@/utils/findInsertNode';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';

export function useDropBlock() {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const { values, addBlock, moveBlock } = useBlock();
  const { autoComplete } = useContext(EditorPropsContext);
  const cacheValues = useRef(values);

  useEffect(() => {
    cacheValues.current = values;
  }, [values]);

  const isShadowDom = useMemo(
    () => !Boolean(ref && document.contains(ref)),
    [ref]
  );

  const { setFocusIdx, } = useFocusIdx();
  const {
    setHoverIdx,
    setIsDragging,
    setDirection,
    isDragging,
    hoverIdx,
    direction,
    setDragPosition
  } = useHoverIdx();

  const { dataTransfer, setDataTransfer } = useDataTransfer();

  useEffect(() => {
    if (ref) {
      const onClick = (ev: MouseEvent) => {
        ev.preventDefault();
        const blockNode = findBlockNode(ev.target as HTMLElement);
        if (blockNode) {
          const idx = getNodeIdxFromClassName(blockNode.classList)!;
          setFocusIdx(idx);
          const editBlock = findBlockNodeByIdx(idx);
          if (editBlock === blockNode) {
            const listItemNode = document.querySelector(`[data-idx="${idx}"]`);
            listItemNode?.scrollIntoView({
              block: 'center',
              behavior: 'smooth',
            });
          } else {
            editBlock?.scrollIntoView({
              block: 'center',
              behavior: 'smooth',
            });
          }
        }
      };

      ref.addEventListener('click', onClick);
      return () => {
        ref.removeEventListener('click', onClick);
      };
    }
  }, [ref, setFocusIdx]);

  useEffect(() => {
    if (!ref) return;

    const onDrop = (ev: DragEvent) => {
      if (!dataTransfer) return;
      const target = ev.target as HTMLElement;
      const blockNode = findBlockNode(target);
      if (!blockNode) return;

      const type = dataTransfer.type;
      const action = dataTransfer.action;
      if (!type) return;
      const payload = dataTransfer.payload || {};

      if (parent) {
        ev.preventDefault();

        const blockData: Parameters<typeof addBlock>[0] = {
          payload,
          type,
          parentIdx: dataTransfer.parentIdx!,
          positionIndex: dataTransfer.positionIndex
        };

        if (action === 'move') {
          moveBlock({
            sourceIdx: blockData.payload,
            destinationIdx: blockData.parentIdx,
            positionIndex: blockData.positionIndex!,
          });
        } else {
          addBlock(blockData);
        }
      }
    };

    ref.addEventListener('drop', onDrop);
    return () => {
      ref.removeEventListener('drop', onDrop);
    };
  }, [addBlock, dataTransfer, moveBlock, ref, setIsDragging, values]);

  useEffect(() => {
    if (ref) {
      const onMouseover = (ev: MouseEvent) => {
        const blockNode = findBlockNode(ev.target as HTMLElement);

        if (blockNode) {
          const idx = getNodeIdxFromClassName(blockNode.classList)!;
          setHoverIdx(idx);
        }
      };

      const onMouseOut = (ev: MouseEvent) => {
        ev.stopPropagation();
        setHoverIdx('');
        setDirection('');
        const blockNode = findBlockNode(ev.target as HTMLElement);
        if (!blockNode) {
          setIsDragging(false);
        }
      };
      const onDrop = (ev: MouseEvent) => {
        setIsDragging(false);
      };

      const onDragOver = (ev: DragEvent) => {
        if (!dataTransfer) return;
        let isValid = false;
        setIsDragging(true);
        setDragPosition({
          left: ev.pageX,
          top: ev.pageY
        });
        const blockNode = findBlockNode(ev.target as HTMLDivElement);
        if (blockNode) {
          const direction = getTangentDirection(ev);
          const idx = getNodeIdxFromClassName(blockNode.classList)!;

          const type = dataTransfer.type;
          const validBlockNode = isShadowDom
            ? findInsertNode(
              type,
              blockNode,
              direction,
              Boolean(autoComplete)
            )
            : blockNode;

          if (validBlockNode) {
            const targetType = getNodeTypeFromClassName(
              validBlockNode.classList
            ) as BlockType;

            // Because only the Section is lined up horizontally, right and left are only useful for section, and top and bottom are only useful for other blocks.

            // 获取当前 focus 的 节点到 目标type的一些数据， 比如 text => section， 获取section 的blockData，idx，以及插入的位置

            const relativeData = getParenRelativeByType(cacheValues.current, idx, targetType);

            if (relativeData) {
              const isSectionType = targetType === BasicType.SECTION;
              const formatDirection = isSectionType ? direction.replace(/(top|bottom|-)/, '') : direction.replace(/(right|left|-)/, '');
              if (direction === '') {
                isValid = true;
              } else {
                if (isSectionType) {
                  if (formatDirection === 'left' || formatDirection === 'right') {
                    isValid = true;
                  }
                } else {
                  if (formatDirection === 'top' || formatDirection === 'bottom') {
                    isValid = true;
                  }
                }

              }

              if (isValid) {
                ev.preventDefault();
                const recommendAppendToEnd = relativeData.parent.children.length > 0 && !direction;
                const appendToEnd = (!formatDirection || /(right|bottom|-)/.test(formatDirection)) && relativeData.parent.children.length > 0;
                if (appendToEnd) {
                  setDirection(isSectionType ? 'right' : 'bottom');
                } else {
                  setDirection(formatDirection as any);
                }

                setDataTransfer({
                  ...dataTransfer,
                  positionIndex: (appendToEnd || recommendAppendToEnd) ? relativeData.insertIndex + 1 : relativeData.insertIndex,
                  parentIdx: relativeData.parentIdx
                });
                setHoverIdx((appendToEnd || recommendAppendToEnd) ? getChildIdx(relativeData.parentIdx, relativeData.insertIndex) : idx);

              }

            }

          }
        }
        if (!isValid) {
          setDirection('');
          setHoverIdx('');
        }
      };
      const onDragLeave = (ev: DragEvent) => {
        setIsDragging(false);
      };

      ref.addEventListener('mouseover', onMouseover);
      ref.addEventListener('mouseout', onMouseOut);
      document.addEventListener('dragleave', onMouseOut);
      ref.addEventListener('drop', onDrop);
      ref.addEventListener('dragover', onDragOver);
      ref.addEventListener('dragleave', onDragLeave);
      return () => {
        ref.removeEventListener('mouseover', onMouseover);
        ref.removeEventListener('mouseout', onMouseOut);
        document.removeEventListener('dragleave', onMouseOut);
        ref.removeEventListener('drop', onDrop);
        ref.removeEventListener('dragover', onDragOver);
        ref.removeEventListener('dragleave', onDragLeave);
      };
    }
  }, [autoComplete, dataTransfer, isShadowDom, ref, setDataTransfer, setDirection, setDragPosition, setHoverIdx, setIsDragging]);

  useEffect(() => {
    if (ref) {
      ref.setAttribute('data-dragging', String(isDragging));
      ref.setAttribute('data-direction', direction || 'none');
    }
  }, [direction, isDragging, ref]);

  useEffect(() => {
    if (!isDragging) return;

    const blockNode = findBlockNodeByIdx(hoverIdx, !document.contains(ref));

    if (!blockNode) return;

    blockNode.classList.add(DRAG_HOVER_CLASSNAME);

    return () => {
      blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
    };
  }, [direction, hoverIdx, isDragging, ref]);

  useEffect(() => {
    if (!isDragging) {
      getBlockNodes(isShadowDom).forEach((blockNode) => {
        if (getNodeIdxFromClassName(blockNode.classList) !== hoverIdx) {
          blockNode.classList.remove(BLOCK_HOVER_CLASSNAME);
        } else {
          blockNode.classList.add(BLOCK_HOVER_CLASSNAME);
        }
      });
    }
  }, [hoverIdx, isDragging, isShadowDom, ref]);

  return useMemo(
    () => ({
      setRef,
    }),
    [setRef]
  );
}
