import { BlocksMap } from '@/components/core/blocks';
import { parseMjmlBlockToBlockData } from '@/utils/parseMjmlBlockToBlockData';
import React from 'react';
import {
  Page,
  Wrapper,
  Section,
  Group,
  Column,
  Button,
  Text,
  Spacer,
  Hero,
  Accordion,
  AccordionElement,
  AccordionText,
  AccordionTitle,
  Divider,
  Navbar,
  Social,
  Table,
  Carousel,
  Image,
  Raw,
} from '../index';

describe('Test components "blocks"', () => {
  it('Page should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Page />)).toEqual(
      BlocksMap.basicBlocksMap.Page.create()
    );
  });
  it('Wrapper should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Wrapper />)).toEqual(
      BlocksMap.basicBlocksMap.Wrapper.create()
    );
  });
  it('Section should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Section />)).toEqual(
      BlocksMap.basicBlocksMap.Section.create()
    );
  });
  it('Group should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Group />)).toEqual(
      BlocksMap.basicBlocksMap.Group.create()
    );
  });
  it('Column should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Column />)).toEqual(
      BlocksMap.basicBlocksMap.Column.create()
    );
  });
  it('Button should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Button />)).toEqual(
      BlocksMap.basicBlocksMap.Button.create()
    );
  });
  it('Text should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Text />)).toEqual(
      BlocksMap.basicBlocksMap.Text.create()
    );
  });
  it('Spacer should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Spacer />)).toEqual(
      BlocksMap.basicBlocksMap.Spacer.create()
    );
  });
  it('Hero should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Hero />)).toEqual(
      BlocksMap.basicBlocksMap.Hero.create()
    );
  });
  it('Accordion should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Accordion />)).toEqual(
      BlocksMap.basicBlocksMap.Accordion.create()
    );
  });
  it('AccordionElement should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<AccordionElement />)).toEqual(
      BlocksMap.basicBlocksMap.AccordionElement.create()
    );
  });
  it('AccordionText should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<AccordionText />)).toEqual(
      BlocksMap.basicBlocksMap.AccordionText.create()
    );
  });
  it('AccordionTitle should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<AccordionTitle />)).toEqual(
      BlocksMap.basicBlocksMap.AccordionTitle.create()
    );
  });
  it('Divider should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Divider />)).toEqual(
      BlocksMap.basicBlocksMap.Divider.create()
    );
  });
  it('Navbar should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Navbar />)).toEqual(
      BlocksMap.basicBlocksMap.Navbar.create()
    );
  });
  it('Social should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Social />)).toEqual(
      BlocksMap.basicBlocksMap.Social.create()
    );
  });
  it('Table should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Table />)).toEqual(
      BlocksMap.basicBlocksMap.Table.create()
    );
  });
  it('Carousel should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Carousel />)).toEqual(
      BlocksMap.basicBlocksMap.Carousel.create()
    );
  });
  it('Image should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Image />)).toEqual(
      BlocksMap.basicBlocksMap.Image.create()
    );
  });
  it('Raw should render as expect', () => {
    expect(parseMjmlBlockToBlockData(<Raw />)).toEqual(
      BlocksMap.basicBlocksMap.Raw.create()
    );
  });
});
