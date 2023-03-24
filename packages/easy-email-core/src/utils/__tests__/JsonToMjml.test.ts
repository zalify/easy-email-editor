import { BasicType } from './../../constants';
import { BlockManager } from './../BlockManager';

import { JsonToMjml } from '../JsonToMjml';

const Page = BlockManager.getBlockByType(BasicType.PAGE)!;
const Section = BlockManager.getBlockByType(BasicType.SECTION)!;
const Column = BlockManager.getBlockByType(BasicType.COLUMN)!;
const Text = BlockManager.getBlockByType(BasicType.TEXT)!;
describe('Test JsonToMjml when responsive is "false"', () => {
  const content = Page.create({
    data: {
      value: {
        responsive: false,
      },
    },
    children: [
      Section.create({
        children: [
          Column.create({
            children: [Text.create({})],
          }),
        ],
      }),
    ],
  });

  const parseHtml = JsonToMjml({
    data: content,
    mode: 'production',
    context: content,
  });

  it('should contain the mark of "<meta name="viewport" />"', () => {
    expect(parseHtml).toContain('<meta name="viewport" />');
  });
});

describe('Test JsonToMjml when responsive is "true"', () => {
  const content = Page.create({
    data: {
      value: {
        responsive: true,
      },
    },
    children: [
      Section.create({
        children: [
          Column.create({
            children: [Text.create({})],
          }),
        ],
      }),
    ],
  });

  const parseHtml = JsonToMjml({
    data: content,
    mode: 'production',
    context: content,
  });

  it('should contains the mark of responsive="true"', () => {
    expect(
      parseHtml.includes('attribute-name="responsive" responsive="true"')
    ).toBeTruthy();
  });
});

describe('Test JsonToMjml when mode is "testing"', () => {
  const content = Page.create({
    children: [
      Section.create({
        children: [
          Column.create({
            children: [Text.create({})],
          }),
        ],
      }),
    ],
  });

  const parseHtml = JsonToMjml({
    data: content,
    mode: 'testing',
    context: content,
    idx: 'content',
  });

  it('should contains node-type-page', () => {
    expect(parseHtml).toContain('node-type-page');
  });

  it('should render as expected', () => {
    expect(parseHtml).toMatchSnapshot();
  });
});

describe('Test JsonToMjml when mode is "production"', () => {
  const content = Page.create({
    children: [
      Section.create({
        children: [
          Column.create({
            children: [Text.create({})],
          }),
        ],
      }),
    ],
  });

  const parseHtml = JsonToMjml({
    data: content,
    mode: 'production',
    context: content,
  });

  it('should not contains node-type-page', () => {
    expect(parseHtml.includes('node-type-page')).toBeFalsy();
  });

  it('should render as expected', () => {
    expect(parseHtml).toMatchSnapshot();
  });
});

describe('json with manual variables added to content', () => {
  const content = Page.create({
    children: [
      Section.create({
        children: [
          Column.create({
            children: [Text.create({data:{value:{content: `<div>{% assign iteration_example = "First,Second,Third,Fourth,Fifth" | split: ',' %}</div>`
            }}})],
          }),
        ],
      }),
    ],
  });

  const parseHtml = JsonToMjml({
    data: content,
    mode: 'testing',
    context: content,
    idx: 'content',
  });

  it('should render without any escaped HTML characters', () => {
    console.log('parseHtml', parseHtml);
    expect(parseHtml).toMatchSnapshot();
  });
})
