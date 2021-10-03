import { findBlockNodeByIdx } from './findBlockNodeByIdx';

export function scrollFocusBlockIntoView({
  idx,
  inShadowDom,
}: {
  idx: string;
  inShadowDom: boolean;
}) {
  setTimeout(() => {
    const editBlock = findBlockNodeByIdx(idx, inShadowDom);
    editBlock?.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  }, 50);
}
