import { BlocksMap } from '@/components/core/blocks';
import { transformToMjml } from '../transformToMjml';

describe('Test transformToMjml when responsive is "false"', () => {
  const content = BlocksMap.basicBlocksMap.Page.create({
    data: {
      value: {
        responsive: false,
      },
    },
    children: [
      BlocksMap.basicBlocksMap.Section.create({
        children: [
          BlocksMap.basicBlocksMap.Column.create({
            children: [BlocksMap.basicBlocksMap.Text.create({})],
          }),
        ],
      }),
    ],
  });

  const parseHtml = transformToMjml({
    data: content,
    mode: 'production',
    context: content,
  });

  it('should contains the mark of "<meta name="viewport" />"', () => {
    expect(parseHtml).toContain('<meta name="viewport" />');
  });
});

describe('Test transformToMjml when responsive is "true"', () => {
  const content = BlocksMap.basicBlocksMap.Page.create({
    data: {
      value: {
        responsive: true,
      },
    },
    children: [
      BlocksMap.basicBlocksMap.Section.create({
        children: [
          BlocksMap.basicBlocksMap.Column.create({
            children: [BlocksMap.basicBlocksMap.Text.create({})],
          }),
        ],
      }),
    ],
  });

  const parseHtml = transformToMjml({
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

describe('Test transformToMjml when mode is "testing"', () => {
  const content = BlocksMap.basicBlocksMap.Page.create({
    children: [
      BlocksMap.basicBlocksMap.Section.create({
        children: [
          BlocksMap.basicBlocksMap.Column.create({
            children: [BlocksMap.basicBlocksMap.Text.create({})],
          }),
        ],
      }),
    ],
  });

  const parseHtml = transformToMjml({
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

describe('Test transformToMjml when mode is "production"', () => {
  const content = BlocksMap.basicBlocksMap.Page.create({
    children: [
      BlocksMap.basicBlocksMap.Section.create({
        children: [
          BlocksMap.basicBlocksMap.Column.create({
            children: [BlocksMap.basicBlocksMap.Text.create({})],
          }),
        ],
      }),
    ],
  });

  const parseHtml = transformToMjml({
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
