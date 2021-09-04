import { findBlockNode } from './findBlockNode';

export const deviation = 10;
export type Direction = 'top' | 'right' | 'bottom' | 'left' | '' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export function getTangentDirection(ev: {
  target: EventTarget | null;
  clientY: number;
  clientX: number;
}): Direction {
  const target = ev.target as HTMLElement;
  const blockNode = findBlockNode(target);

  if (!blockNode) return '';
  const { top, height, left, width } = blockNode.getBoundingClientRect();
  const mouseY = ev.clientY;
  const mouseX = ev.clientX;
  let direction: string[] = [];
  if (Math.abs(top - mouseY) <= deviation) {
    direction.push('top');
  }
  if (Math.abs(top + height - mouseY) <= deviation) {
    direction.push('bottom');
  }
  if (Math.abs(left + width - mouseX) <= deviation) {
    direction.push('right');
  }
  if (Math.abs(left - mouseX) <= deviation) {
    direction.push('left');
  }

  return direction.join('-') as any;
}
