import { BlockType } from '@/constants';
import { IBlock } from '@/typings';

import { Page } from './basic/Page';
import { Section } from './basic/Section';
import { Column } from './basic/Column';
import { Text } from './basic/Text';
import { Image } from './basic/Image';
import { Group } from './basic/Group';
import { Button } from './basic/Button';
import { Divider } from './basic/Divider';
import { Wrapper } from './basic/Wrapper';
import { Spacer } from './basic/Spacer';
import { Raw } from './basic/Raw';

export const BlocksMap = {
  Page,
  Section,
  Column,
  Text,
  Image,
  Group,
  Button,
  Divider,
  Wrapper,
  Spacer,
  Raw
};

export function getBlockByType(type: BlockType): IBlock<any> {
  return Object.values(BlocksMap).find((item) => item.type === type)!;
}
