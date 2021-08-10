import { BlockType } from './../constants';
import { BlocksMap } from './../components/core/blocks/index';
import { BasicType } from '@/constants';

// 桥接： 例如 drag text to wrapper , 可以通过 text=> column => section => wrapper, 隔了三代
export function ancestorOf(type: BlockType, targetType: BlockType): number {
  let level = -1;
  const block = BlocksMap.findBlockByType(type);
  if (!block) return level;
  if (block.validParentType.includes(targetType)) return 1;

  if ([BasicType.COLUMN, BasicType.GROUP].includes(type)) {
    if (targetType === BasicType.PAGE) {
      return 2; // column => section  => page
    } else if (targetType === BasicType.WRAPPER) {
      return 2; // column => section => wrapper
    }
  } else if (
    [
      BasicType.TEXT,
      BasicType.IMAGE,
      BasicType.SPACER,
      BasicType.DIVIDER,

      BasicType.BUTTON,
      BasicType.ACCORDION,
      BasicType.CAROUSEL,
      BasicType.NAVBAR,
      BasicType.SOCIAL,
    ].includes(type)
  ) {
    if (targetType === BasicType.SECTION || targetType === BasicType.GROUP) {
      return 2; // text => column => section|group
    } else if (
      targetType === BasicType.WRAPPER ||
      targetType === BasicType.PAGE
    ) {
      return 3; // text => column => section => wrapper
    }
  }
  return level;
}
