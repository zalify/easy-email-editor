export const findBlockNode = (target?: HTMLElement | null): HTMLElement | null => {
  if (!target) return null;

  if (target.classList?.toString().includes?.('node-idx')) {
    return target;
  }
  if (target.parentNode) {
    return findBlockNode(target.parentNode as HTMLElement);
  }
  return null;
};
