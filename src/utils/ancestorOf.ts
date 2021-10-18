import { BlockType } from './../constants';
import { BlocksMap } from './../components/core/blocks/index';

// 桥接： 例如 drag text to wrapper , 可以通过 text=> column => section => wrapper, 隔了三代
export function ancestorOf(type: BlockType, targetType: BlockType): number {
  let level = -1;
  const paths = BlocksMap.getAutoCompletePath(type, targetType);

  if (paths) {
    return paths.length + 1;
  }
  return level;
}
