export const getBlockNodeByChildEle = (
  target?: Element | null
): HTMLElement | null => {
  if (!target) return null;

  if (target.classList?.contains('email-block')) {
    return target as HTMLElement;
  }
  if (target.parentNode) {
    return getBlockNodeByChildEle(target.parentNode as HTMLElement);
  }
  return null;
};
