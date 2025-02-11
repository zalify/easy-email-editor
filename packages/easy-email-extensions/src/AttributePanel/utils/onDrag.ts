import { debounce } from 'lodash';

export const isMouseEvent = (
  event: MouseEvent | TouchEvent
): event is MouseEvent => !!(event.type.indexOf('mouse') !== -1);

/**
 *
 * @param event
 */
export const onDrag = ({
  event,
  onMove,
  onEnd,
}: {
  event: TouchEvent | MouseEvent;
  onMove: (x: number, y: number) => void;
  onEnd?: () => void;
}) => {
  event.preventDefault();
  event.stopPropagation();
  let initX = 0;
  let initY = 0;
  if (isMouseEvent(event)) {
    initX = event.clientX;
    initY = event.clientY;
  } else {
    initX = event.touches[0].clientX;
    initY = event.touches[0].clientY;
  }

  const onDragMove = debounce((mEvt: TouchEvent | MouseEvent) => {
    let movX = 0;
    let movY = 0;

    if (isMouseEvent(mEvt)) {
      movX = mEvt.clientX;
      movY = mEvt.clientY;
    } else {
      movX = mEvt.touches[0].clientX;
      movY = mEvt.touches[0].clientY;
    }

    const diffX = movX - initX;
    const diffY = movY - initY;
    onMove(diffX, diffY);
  });

  const onDragEnd = () => {
    onEnd && onEnd();
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend', onDragEnd);

    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mousemove', onDragEnd);
  };

  document.addEventListener('touchmove', onDragMove);
  document.addEventListener('touchend', onDragEnd);
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);
};
