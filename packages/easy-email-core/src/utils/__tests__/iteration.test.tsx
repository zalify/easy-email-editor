import { BlockManager } from './../BlockManager';

import { JsonToMjml } from '../JsonToMjml';
import { Liquid } from 'liquidjs';
import { AdvancedType, BasicType } from '@core/constants';
import { AdvancedBlock } from '@core/blocks';

const Page = BlockManager.getBlockByType(BasicType.PAGE)!;
const Section = BlockManager.getBlockByType<AdvancedBlock>(AdvancedType.SECTION)!;
const Column = BlockManager.getBlockByType(AdvancedType.COLUMN)!;
const Text = BlockManager.getBlockByType(AdvancedType.TEXT)!;

const engine = new Liquid();
describe('Test iteration.test', () => {

  const mergeTags = {
    list: [
      {
        id: 1,
        title: '1'
      },
      {
        id: 2,
        title: '2'
      },
      {
        id: 3,
        title: '3'
      },
    ]
  };

  const iterationOption = {
    enabled: true,
    itemName: 'item',
    dataSource: 'list',
    limit: 999,
    mockQuantity: 1
  };



  it('should not iteration when enabled is false ', () => {
    const content = Page.create({
      children: [
        Section.create({
          data: {
            value: {
              iteration: { ...iterationOption, enabled: false }
            }
          },
          children: [
            Column.create({
              children: [
                Text.create({
                  data: {
                    value: {
                      content: 'id: {{item.id}} title: {{item.title}}'
                    }
                  }
                })
              ]
            })

          ]
        })
      ]
    });

    const tpl = engine.parse(JsonToMjml({
      data: content,
      mode: 'production',
      context: content,
      dataSource: {},
    }));
    const html = engine.renderSync(tpl, mergeTags);
    expect(html).toContain('id:  title:');
  });

  it('should render empty', () => {
    const content = Page.create({
      children: [
        Section.create({
          data: {
            value: {
              iteration: iterationOption
            }
          },
          children: [
            Column.create({
              children: [
                Text.create({
                  data: {
                    value: {
                      content: 'this will be hide due to empty list'
                    }
                  }
                })
              ]
            })
          ]
        })
      ]
    });

    const tpl = engine.parse(JsonToMjml({
      data: content,
      mode: 'production',
      context: content,
      dataSource: {},
    }));
    const html = engine.renderSync(tpl, {
      ...mergeTags,
      list: []
    });
    expect(html).not.toContain('this will be hide due to empty list');
  });

  it('should render 3 items', () => {
    const content = Page.create({
      children: [
        Section.create({
          data: {
            value: {
              iteration: iterationOption
            }
          },

          children: [
            Column.create({
              children: [
                Text.create({
                  data: {
                    value: {
                      content: 'id: {{item.id}} title: {{item.title}}'
                    }
                  }
                })
              ]
            })
          ]
        })
      ]
    });

    const tpl = engine.parse(JsonToMjml({
      data: content,
      mode: 'production',
      context: content,
      dataSource: {},
    }));
    const html = engine.renderSync(tpl, mergeTags);
    expect(html).toContain('id: 1 title: 1');
    expect(html).toContain('id: 2 title: 2');
    expect(html).toContain('id: 3 title: 3');
  });
});
