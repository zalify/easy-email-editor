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
  private static autoCompletePath: { [key: string]: Array<BlockType[]> } = {};

  static getBlocks() {
    return [
      ...Object.values(this.basicBlocksMap),
      ...Object.values(this.externalBlocksMap),
    ];
  }

  static registerBlocks(blocksMap: { [key: string]: IBlock }) {
    Object.assign(this.externalBlocksMap, blocksMap);
    this.autoCompletePath = this.setAutoCompletePath();
  }

  static findBlockByType(type: string): IBlock {
    return this.getBlocks().find((child) => {
      return child?.type === type;
    }) as any;
  }

  static findBlocksByType(types: Array<BlockType>): IBlock[] {
    return types.map((item) => {
      const block = this.getBlocks().find((child) => {
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

  static setAutoCompletePath() {
    const paths: { [key: string]: Array<BlockType[]> } = {};

    const renderFullPath = (
      type: BlockType,
      pathObj: Array<BlockType[]>,
      prevPaths: BlockType[]
    ) => {
      const block = this.findBlockByType(type);
      const currentPaths = [...prevPaths, type];
      if (block.validParentType.length === 0) {
        pathObj.push(currentPaths);
      }
      return block.validParentType.map((item) => {
        return renderFullPath(item, pathObj, currentPaths);
      });
    };

    this.getBlocks().forEach((item) => {
      paths[item.type] = [];
      renderFullPath(item.type, paths[item.type], []);
    });
    return paths;
  }

  static getAutoCompleteFullPath() {
    if (Object.keys(this.autoCompletePath).length === 0) {
      this.autoCompletePath = this.setAutoCompletePath();
    }
    return this.autoCompletePath;
  }

  static getAutoCompletePath(type: BlockType, targetType: BlockType) {
    const paths = this.getAutoCompleteFullPath()[type].find((item) =>
      item.filter((_, index) => index !== 0).includes(targetType)
    );

    if (!paths) return null;
    const findIndex = paths.findIndex((item) => item === targetType);
    return paths.slice(1, findIndex);
  }
}
