import { BlockType } from '@/constants';
import { IBlock } from '@/typings';

import { Page } from './basic/Page';
import { Section } from './basic/Section';
import { Column } from './basic/Column';
import { Text } from './basic/Text';

export const BlocksMap = {
  Page,
  Section,
  Column,
  Text
};

export function getBlockByType(type: BlockType): IBlock<any> {
  return Object.values(BlocksMap).find((item) => item.type === type)!;
}
