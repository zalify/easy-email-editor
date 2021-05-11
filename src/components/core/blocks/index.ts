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

const basicBlocks = {
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
};

export class BlocksMap {
  static basicBlocksMap = basicBlocks;
  static externalBlocksMap: { [key: string]: IBlock } = {};

  static get getBlocks() {
    return [
      ...Object.values(this.basicBlocksMap),
      ...Object.values(this.externalBlocksMap),
    ];
  }

  static registerBlocks(blocksMap: { [key: string]: IBlock }) {
    Object.assign(this.externalBlocksMap, blocksMap);
  }

  static findBlockByType(type: BlockType): IBlock {
    return this.getBlocks.find((child) => {
      return child?.type === type;
    }) as any;
  }

  static findBlocksByType(types: Array<BlockType>): IBlock[] {
    return types.map((item) => {
      const block = this.getBlocks.find((child) => {
        return child.type === item;
      });
      if (!block) {
        throw new Error(`Cannot find ${item}`);
      }
      return block;
    });
  }

  static getBlock<
    E extends { [key: string]: IBlock },
    B extends typeof BlocksMap.basicBlocksMap,
    A extends B & E,
    T extends keyof A
  >(name: T): A[T] {
    const key: any = name;
    return this.basicBlocksMap[key] || this.externalBlocksMap[key];
  }
}
