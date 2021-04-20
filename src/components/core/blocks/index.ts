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
import { Accordion } from './basic/Accordion';
import { AccordionElement } from './basic/AccordionElement';
import { AccordionTitle } from './basic/AccordionTitle';
import { AccordionText } from './basic/AccordionText';
import { Carousel } from './basic/Carousel';
import { Table } from './basic/Table';
import { Hero } from './basic/Hero';
import { Navbar } from './basic/Navbar';
import { Social } from './basic/Social';
import { SocialElement } from './basic/SocialElement';

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
  // TODO:
  Raw,
  Accordion,
  AccordionElement,
  AccordionTitle,
  AccordionText,
  Carousel,
  Table,
  Hero,
  Navbar,
  Social,
  SocialElement,
};

export function getBlockByType(type: BlockType): IBlock<any> {
  return Object.values(BlocksMap).find((item) => item.type === type)!;
}
