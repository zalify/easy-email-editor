
import { getNodeIdxClassName } from './block';

export const getEditorRoot = () => document.getElementById('VisualEditorEditMode');
export const getShadowRoot = () => getEditorRoot()!.shadowRoot!;

export const findBlockNodeByIdx = (idx: string): HTMLElement | null => {
  const idxClassName = getNodeIdxClassName(idx);
  const node = Array.from(getShadowRoot().querySelectorAll('.email-block')).find(item => item.classList?.contains(idxClassName)) as HTMLElement;
  return node;
};
