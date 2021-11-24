export const findBlockNode = (target?: HTMLElement | null): HTMLElement | null => {
  if (!target) return null;

  if (target.classList?.contains('email-block')) {
    return target;
  }
  if (target.parentNode) {
    return findBlockNode(target.parentNode as HTMLElement);
  }
  return null;
};
