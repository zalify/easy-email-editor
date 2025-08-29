import { AdvancedType, BasicType } from 'easy-email-core';

export function isTableBlock(blockType: any) {
  return blockType === AdvancedType.TABLE || blockType === BasicType.TABLE;
}
