import { getNodeIdxClassName } from './block';

export const getEditorRoot = () =>
  document.getElementById('VisualEditorEditMode');
export const getShadowRoot = () => getEditorRoot()?.shadowRoot!;
export const getBlockNodes = (inShadowDom: boolean = true) =>
  Array.from(
    (inShadowDom ? getShadowRoot() : document).querySelectorAll('.email-block')
  );

export const findBlockNodeByIdx = (
  idx: string,
  inShadowDom = true
): HTMLElement | null => {
  if (!idx) return null;
  const idxClassName = getNodeIdxClassName(idx);
  const node = getBlockNodes(inShadowDom).find((item) =>
    item.classList?.contains(idxClassName)
  ) as HTMLElement;
  return node;
};
