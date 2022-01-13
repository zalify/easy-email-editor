import { BlockManager, IBlockData, BasicType } from 'easy-email-core';

const tempEle = document.createElement('div');
export function getBlockTitle(
  blockData: IBlockData,
  isFromContent = true
): string {
  if (blockData.title) return blockData.title;

  if (
    isFromContent &&
    (blockData.type === BasicType.TEXT || blockData.type === BasicType.BUTTON)
  ) {
    tempEle.innerHTML = blockData.data.value.content;
    return tempEle.innerText;
  }

  const blockName = BlockManager.getBlockByType(blockData.type)?.name || '';
  return blockName;
}
