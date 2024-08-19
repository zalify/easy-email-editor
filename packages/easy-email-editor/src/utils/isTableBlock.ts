import { BasicType, AdvancedType } from 'easy-email-core';

export function isTableBlock(blockType: any) {
  return blockType === AdvancedType.TABLE;
}
