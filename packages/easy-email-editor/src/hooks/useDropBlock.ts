import { useEffect, useMemo, useState, useRef } from 'react';

import { getNodeIdxFromClassName } from 'easy-email-core';
import { getBlockNodeByChildEle } from '@/utils/getBlockNodeByChildEle';
import { useBlock } from '@/hooks/useBlock';
import { getDirectionPosition } from '@/utils/getDirectionPosition';
import { useFocusIdx } from './useFocusIdx';
import { useDataTransfer } from './useDataTransfer';
import { useHoverIdx } from './useHoverIdx';
import { getInsertPosition } from '@/utils/getInsertPosition';
import { useEditorProps } from './useEditorProps';
import { DATA_ATTRIBUTE_DROP_CONTAINER } from '@/constants';

export function useDropBlock() {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const { values } = useBlock();
  const { autoComplete } = useEditorProps();
  const { dataTransfer, setDataTransfer } = useDataTransfer();
  const cacheValues = useRef(values);
  const cacheDataTransfer = useRef(dataTransfer);

  useEffect(() => {
    cacheValues.current = values;
  }, [values]);

  useEffect(() => {
    cacheDataTransfer.current = dataTransfer;
  }, [dataTransfer]);
  const { setFocusIdx, focusIdx } = useFocusIdx();
  const { setHoverIdx, setDirection, isDragging, hoverIdx, direction } =
    useHoverIdx();

  useEffect(() => {
    if (ref) {
      let target: EventTarget | null = null;
      const onMouseDown = (ev: MouseEvent) => {
        target = ev.target;
      };

      const onClick = (ev: MouseEvent) => {
        ev.preventDefault(); // prevent link
        if (target !== ev.target) return;
        if (ev.target instanceof Element) {
          const target = getBlockNodeByChildEle(ev.target);
          if (!target) return;
          const idx = getNodeIdxFromClassName(target.classList)!;
          setFocusIdx(idx);
          // scrollBlockEleIntoView({ idx });
        }
      };

      ref.addEventListener('mousedown', onMouseDown);
      ref.addEventListener('click', onClick);
      return () => {
        ref.removeEventListener('mousedown', onMouseDown);
        ref.removeEventListener('click', onClick);
      };
    }
  }, [ref, setFocusIdx]);

  useEffect(() => {
    if (ref) {
      let lastHoverTarget: EventTarget | null = null;

      let lastDragover: {
        target: EventTarget | null;
        valid: boolean;
      } = {
        target: null,
        valid: false,
      };

      const onMouseover = (ev: MouseEvent) => {
        if (lastHoverTarget === ev.target) return;
        lastHoverTarget = ev.target;
        const blockNode = getBlockNodeByChildEle(ev.target as HTMLElement);

        if (blockNode) {
          const idx = getNodeIdxFromClassName(blockNode.classList)!;
          setHoverIdx(idx);
        }
      };

      const onDrop = (ev: MouseEvent) => {
        lastDragover.target = null;
      };

      const onDragOver = (ev: DragEvent) => {
        if (!cacheDataTransfer.current) return;

        // if (ev.target === lastDragover.target) {
        //   if (lastDragover.valid) {
        //     ev.preventDefault();

        //     return;
        //   }
        // }

        lastDragover.target = ev.target;
        lastDragover.valid = false;

        const blockNode = getBlockNodeByChildEle(ev.target as HTMLDivElement);

        if (blockNode) {
          const directionPosition = getDirectionPosition(ev);
          const idx = getNodeIdxFromClassName(blockNode.classList)!;
          const positionData = getInsertPosition({
            context: cacheValues.current,
            idx,
            directionPosition,
            dragType: cacheDataTransfer.current.type,
          });

          if (positionData) {
            ev.preventDefault();
            lastDragover.valid = true;
            setDataTransfer((dataTransfer: any) => {
              return {
                ...dataTransfer,
                parentIdx: positionData.parentIdx,
                positionIndex: positionData.insertIndex,
              };
            });
            setDirection(positionData.endDirection);
            setHoverIdx(positionData.hoverIdx);
          }
        }
        if (!lastDragover.valid) {
          setDirection('');
          setHoverIdx('');
          setDataTransfer((dataTransfer: any) => {
            return {
              ...dataTransfer,
              parentIdx: undefined,
            };
          });
        }
      };

      const onCheckDragLeave = (ev: DragEvent) => {
        const dropEleList = [
          ...document.querySelectorAll(
            `[${DATA_ATTRIBUTE_DROP_CONTAINER}="true"]`
          ),
        ];
        const target = ev.target as HTMLElement;
        const isDropContainer = dropEleList.some((ele) => ele.contains(target));

        if (!isDropContainer) {
          setDirection('');
          setHoverIdx('');
          setDataTransfer((dataTransfer: any) => {
            return {
              ...dataTransfer,
              parentIdx: undefined,
            };
          });
        }
      };

      ref.addEventListener('mouseover', onMouseover);
      // ref.addEventListener('mouseout', onMouseOut);
      ref.addEventListener('drop', onDrop);
      ref.addEventListener('dragover', onDragOver);
      window.addEventListener('dragover', onCheckDragLeave);

      return () => {
        ref.removeEventListener('mouseover', onMouseover);
        // ref.removeEventListener('mouseout', onMouseOut);
        ref.removeEventListener('drop', onDrop);
        ref.removeEventListener('dragover', onDragOver);
        window.removeEventListener('dragover', onCheckDragLeave);
      };
    }
  }, [
    autoComplete,
    cacheDataTransfer,
    ref,
    setDataTransfer,
    setDirection,
    setHoverIdx,
  ]);

  useEffect(() => {
    if (!ref) return;

    const onMouseOut = (ev: MouseEvent) => {
      if (!isDragging) {
        ev.stopPropagation();
        setHoverIdx('');
      }
    };
    ref.addEventListener('mouseout', onMouseOut);
    return () => {
      ref.removeEventListener('mouseout', onMouseOut);
    };
  }, [isDragging, ref, setHoverIdx]);

  useEffect(() => {
    if (ref) {
      ref.setAttribute('data-dragging', String(isDragging));
      ref.setAttribute('data-direction', direction || 'none');
    }
  }, [direction, isDragging, ref]);

  useEffect(() => {
    if (ref) {
      ref.setAttribute('data-hoverIdx', hoverIdx);
    }
  }, [hoverIdx, ref]);

  useEffect(() => {
    if (ref) {
      ref.setAttribute('data-focusIdx', focusIdx);
    }
  }, [focusIdx, ref]);

  return useMemo(
    () => ({
      setRef,
    }),
    [setRef]
  );
}
