import { BasicType, AdvancedType } from '@jupitermail/easy-email-core';

export function isTableBlock(blockType: any) {
  return blockType === AdvancedType.TABLE;
}
