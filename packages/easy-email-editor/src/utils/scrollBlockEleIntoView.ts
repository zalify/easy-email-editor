import { getBlockNodeByIdx } from './getBlockNodeByIdx';

export function scrollBlockEleIntoView({ idx }: { idx: string }) {
  setTimeout(() => {
    const editBlock = getBlockNodeByIdx(idx);
    editBlock?.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  }, 50);
}
