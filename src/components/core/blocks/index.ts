import { BlockType } from '@/constants';
import { IBlock } from '@/typings';

import { Page } from './basic/Page';
import { Section } from './basic/Section';

export const BlocksMap = {
  Page,
  Section,
};

export function getBlockByType(type: BlockType): IBlock<any> {
  return Object.values(BlocksMap).find((item) => item.type === type)!;
}
