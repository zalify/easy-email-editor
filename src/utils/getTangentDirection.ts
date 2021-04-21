import { findBlockNode } from './findBlockNode';

const deviation = 5;
type Direction = 'top' | 'right' | 'bottom' | 'left';

export function getTangentDirection(ev: { target: EventTarget | null, clientY: number, clientX: number; }): Direction | '' {
  const target = ev.target as HTMLElement;
  const blockNode = findBlockNode(target);
  if (!blockNode) return '';
  const { top, height, left, width } = blockNode.getBoundingClientRect();
  const mouseY = ev.clientY;
  const mouseX = ev.clientX;

  if (Math.abs(top - mouseY) <= deviation) {
    return 'top';
  }
  if (Math.abs(left + width - mouseX) <= deviation) {
    return 'right';
  }
  if (Math.abs(top + height - mouseY) <= deviation) {
    return 'bottom';
  }
  if (Math.abs(left - mouseX) <= deviation) {
    return 'left';
  }
  return '';
}