
import { getNodeIdxClassName } from './block';

export const findBlockNodeByIdx = (idx: string): HTMLElement | null => {
  const idxClassName = getNodeIdxClassName(idx);
  const node = Array.from(document.getElementById('VisualEditorEditMode')!.shadowRoot!.querySelectorAll('.email-block')).find(item => item.classList?.contains(idxClassName)) as HTMLElement;
  return node;
};
