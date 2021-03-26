import { useBlock } from '@/hooks/useBlock';
import { getIndexByIdx } from '@/utils/block';
import React from 'react';
import { Draggable as ReactDraggable } from 'react-beautiful-dnd';
import { EditBlockWrapper } from '../EditBlockWrapper';
export interface DraggableProps {
  children: React.ReactElement;
  idx: string;
}
export default function Draggable(props: DraggableProps) {
  const { idx, children } = props;
  const id = getIndexByIdx(props.idx);
  const { focusIdx } = useBlock();

  return (
    <ReactDraggable
      key={idx}
      isDragDisabled={focusIdx !== idx}
      draggableId={id.toString()}
      index={id}
    >
      {(draggableProvided) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          <EditBlockWrapper idx={idx}>
            {children}
          </EditBlockWrapper>
        </div>
      )}
    </ReactDraggable>
  );
}
