import { useBlock } from '@/hooks/useBlock';
import { getIndexByIdx } from '@/utils/block';
import React from 'react';
import { Draggable as ReactDraggable } from 'react-beautiful-dnd';
export interface DraggableProps {
  children: React.ReactElement;
  idx: string;
}
export default function Draggable(props: DraggableProps) {
  const { idx, children } = props;
  const id = getIndexByIdx(props.idx);

  return (
    <ReactDraggable
      key={idx}
      draggableId={id.toString()}
      index={id}
    >
      {(draggableProvided) => (
        <div
          data-node-idx={idx}
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >

          {children}

        </div>
      )}
    </ReactDraggable>
  );
}
