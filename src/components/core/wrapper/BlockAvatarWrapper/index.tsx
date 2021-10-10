import React, { useCallback, useEffect, useRef } from 'react';
import { BlockType } from '@/constants';
import { BlockSortableWrapper } from '../BlockSortableWrapper';
import { useHoverIdx } from '@/hooks/useHoverIdx';

export type BlockAvatarWrapperProps = {
  type: BlockType | string;
  payload?: any;
  action?: 'add' | 'move';
  hideIcon?: boolean;
  idx?: string;
};
const img = new Image();
img.src =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAVRJREFUWEftl6GOhEAMhrvBIjAI3oAnwGHWAgnJKgwvgMHhMJsQHMHgcaBQJGtwaPS+wgaHwAEbJjl33AwMgks6tn/L34+mA7dlWRa48LmhQc63gwQ5AQISRIK8BHjzT5vBcRzB932YpgnSNAVRFHm9kfzTDNZ1DaZpkqJVVYFt29cyWBQFOI5DTOV5Dq7rosFdBJDgLly/iJHgvyY4DAOUZQmfz2ezj67ryP5bj2VZoGnaplZRFHg8HiBJEpUL06IOwxCezye12B5BEAQQxzE1hclglmXgeR612B5BkiTkaqQdJoNrkff7DX3fb9Z7vV4QRRGJr3QMw9jUyrIMqqrSvJ17F+OaYeL9hwgJIsGDBJjXDK3+5WewbVvQdZ300TQN3O93Wk9M8dMIzvNM7uv1p2n99BcEgckATXSaQdqDjsbR4FFyP3lIEAnyEuDNxxnkJfgFyvA4mF2a5hwAAAAASUVORK5CYII=';

export const BlockAvatarWrapper: React.FC<BlockAvatarWrapperProps> = (
  props
) => {
  const { type, children, payload, action = 'add', idx } = props;
  const { setIsDragging, setHoverIdx } = useHoverIdx();
  const ref = useRef<HTMLDivElement>(null);

  const onDragStart = useCallback(
    (ev: React.DragEvent) => {
      setIsDragging(true);
    },
    [setIsDragging]
  );

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
    setHoverIdx('');
  }, [setHoverIdx, setIsDragging]);

  useEffect(() => {
    const ele = ref.current;
    if (!ele) return;

    ele.addEventListener('dragend', onDragEnd);
    return () => {
      ele.removeEventListener('dragend', onDragEnd);
    };
  }, [onDragEnd]);

  return (
    <BlockSortableWrapper
      payload={payload}
      action={action}
      type={type as any}
      idx={idx}
    >
      <div
        style={{ cursor: 'grab' }}
        ref={ref}
        onMouseDown={() => {
          window.getSelection()?.removeAllRanges();
        }}
        data-type={type}
        onDragStart={onDragStart}
        draggable
      >
        {children}
      </div>
    </BlockSortableWrapper>
  );
};
