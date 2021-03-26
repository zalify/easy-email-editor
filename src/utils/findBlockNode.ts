export const findBlockNode = (target?: Element | null): Element | null => {
  if (!target) return null;

  if (target.getAttribute?.('data-node-idx')) {
    return target;
  }
  if (target.parentNode) {
    return findBlockNode(target.parentNode as Element);
  }
  return null;
};
