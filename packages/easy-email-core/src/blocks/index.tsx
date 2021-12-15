import { IPage, Page } from './Page';
import { ISection, Section } from './Section';
import { Column, IColumn } from './Column';
import { IText, Text } from './Text';
import { IImage, Image } from './Image';
import { Group, IGroup } from './Group';
import { Button, IButton } from './Button';
import { Divider, IDivider } from './Divider';
import { IWrapper, Wrapper } from './Wrapper';
import { ISpacer, Spacer } from './Spacer';
import { Carousel, ICarousel } from './Carousel';
import { Hero, IHero } from './Hero';
import { Navbar, INavbar } from './Navbar';
import { ISocial, Social } from './Social';
import { Raw, IRaw } from './Raw';
import { Template, ITemplate } from './Template';

import { Accordion } from './Accordion';
import { AccordionElement } from './AccordionElement';
import { AccordionTitle } from './AccordionTitle';
import { AccordionText } from './AccordionText';
import { Table } from './Table';

export const blocks = {
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
  Carousel,
  Hero,
  Navbar,
  Social,

  // spacial block, render string
  Template,

  // TODO:

  Accordion,
  AccordionElement,
  AccordionTitle,
  AccordionText,

  Table,
};

export type {
  IPage,
  ISection,
  IWrapper,
  IColumn,
  IGroup,
  IText,
  IImage,
  IButton,
  IDivider,
  ISpacer,
  ICarousel,
  IHero,
  ISocial,
  INavbar,
  IRaw,
  ITemplate,
};
