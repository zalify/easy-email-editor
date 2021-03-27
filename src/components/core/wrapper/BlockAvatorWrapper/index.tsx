import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useFormikContext } from 'formik';
import { IBlockData, RecursivePartial } from '@/typings';
import { get } from 'lodash';
import { useBlock } from '@/hooks/useBlock';
import { findBlockNode } from '@/utils/findBlockNode';
import { BlockType, BasicType, DRAG_HOVER_CLASSNAME, DRAG_TANGENT_CLASSNAME } from '@/constants';
import { getIndexByIdx, getParentIdx } from '@/utils/block';
import { getTangentDirection } from '@/utils/getTangentDirection';

export const BlockAvatorWrapper: React.FC<{ type: BlockType; }> = (props) => {
  const [draging, setDraging] = useState(false);
  const ref = useRef<Element | null>(null);

  const { type, children } = props;
  const { values } = useFormikContext<IBlockData[]>();
  const { addBlock } = useBlock();

  const ele = document.getElementById('VisualEditorEditMode');

  const onDragStart = useCallback(() => {
    setDraging(true);
  }, []);

  useEffect(() => {
    if (!ele) return;

    const onDragOver = (ev: DragEvent) => {
      const target = ev.target as Element;

      if (ref.current !== target) {
        ref.current?.classList.remove(DRAG_HOVER_CLASSNAME);
        ref.current?.classList.remove(DRAG_TANGENT_CLASSNAME);
        ref.current = null;
      }

      const blockNode = findBlockNode(target);

      if (blockNode) {
        ev.preventDefault();

        ref.current = blockNode;
        blockNode.classList.remove(DRAG_HOVER_CLASSNAME);
        blockNode.classList.remove(DRAG_TANGENT_CLASSNAME);
        if (['top', 'bottom'].includes(getTangentDirection(ev))) {
          blockNode.classList.add(DRAG_TANGENT_CLASSNAME);
        } else {
          blockNode.classList.add(DRAG_HOVER_CLASSNAME);
        }
      }
    };

    const onMouseUp = () => {
      ref.current?.classList.remove(DRAG_HOVER_CLASSNAME);
      ref.current?.classList.remove(DRAG_TANGENT_CLASSNAME);

      setDraging(false);
    };

    const onDragLeave = () => {
      ref.current?.classList.remove(DRAG_HOVER_CLASSNAME);
      ref.current?.classList.remove(DRAG_TANGENT_CLASSNAME);
    };

    ele.addEventListener('dragover', onDragOver);
    ele.addEventListener('dragleave', onDragLeave);
    window.addEventListener('dragend', onMouseUp);
    return () => {
      ele.removeEventListener('dragover', onDragOver);
      ele.removeEventListener('dragleave', onDragLeave);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [ele]);

  useEffect(() => {

    if (!ele) return;

    const onDrop = (ev: DragEvent) => {

      const target = ev.target as HTMLElement;
      const blockNode = findBlockNode(target);
      blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
      blockNode?.classList.remove(DRAG_TANGENT_CLASSNAME);
      if (!draging || !blockNode) return;

      let parentIdx = blockNode.getAttribute('data-node-idx') || '';

      const parent = get(values, parentIdx);
      if (parent) {
        ev.preventDefault();
        const direction = getTangentDirection(ev);
        if (direction === 'top') {
          addBlock({ type, parentIdx: getParentIdx(parentIdx)!, positionIndex: +getIndexByIdx(parentIdx) });
        } else if (direction === 'bottom') {
          addBlock({ type, parentIdx: getParentIdx(parentIdx)!, positionIndex: +getIndexByIdx(parentIdx) + 1 });
        } else {
          addBlock({ type, parentIdx });
        }

      }
    };

    ele.addEventListener('drop', onDrop);
    return () => {

      ele.removeEventListener('drop', onDrop);
    };
  }, [addBlock, draging, ele, type, values]);

  return (
    <div onDragStart={onDragStart} draggable>
      {children}
    </div>
  );
};
