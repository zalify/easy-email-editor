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
import { Accordion } from './basic/Accordion';
import { AccordionElement } from './basic/AccordionElement';
import { AccordionTitle } from './basic/AccordionTitle';
import { AccordionText } from './basic/AccordionText';
import { Carousel } from './basic/Carousel';
import { Table } from './basic/Table';
import { Hero } from './basic/Hero';
import { Navbar } from './basic/Navbar';
import { Social } from './basic/Social';
import { IBlock } from '@/typings';
import { BlockType } from '@/constants';

export class BlocksMap {
  private static blocks: IBlock[] = [
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
    Raw,
    Accordion,
    AccordionElement,
    AccordionTitle,
    AccordionText,
    Carousel,
    Hero,
    Navbar,
    Social,
    // TODO:
    Table,
  ];

  static registerBlock(block: IBlock) {
    this.blocks.push(block);
  }

  static findBlockByType(type: BlockType): IBlock {
    return this.blocks.find((child) => {
      return child?.type === type;
    }) as any;
  }

  static getBlocks() {
    return this.blocks;
  }
}
