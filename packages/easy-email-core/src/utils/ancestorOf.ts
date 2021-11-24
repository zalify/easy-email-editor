import { BlockManager } from '@core/utils';

// 桥接： 例如 drag text to wrapper , 可以通过 text=> column => section => wrapper, 隔了三代
export function ancestorOf(type: string, targetType: string): number {
  let level = -1;
  const paths = BlockManager.getAutoCompletePath(type, targetType);

  if (paths) {
    return paths.length + 1;
  }
  return level;
}
