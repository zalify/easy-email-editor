import { BlockType } from '@/constants';
import { IBlock } from '@/typings';

import { Page } from './basic/Page';
import { Section } from './basic/Section';
import { Column } from './basic/Column';
import { Text } from './basic/Text';
import { Image } from './basic/Image';
import { Group } from './basic/Group';
import { Button } from './basic/Button';

export const BlocksMap = {
  Page,
  Section,
  Column,
  Text,
  Image,
  Group,
  Button
};

export function getBlockByType(type: BlockType): IBlock<any> {
  return Object.values(BlocksMap).find((item) => item.type === type)!;
}
