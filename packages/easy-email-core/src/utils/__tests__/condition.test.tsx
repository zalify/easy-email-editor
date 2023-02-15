import { BlockManager } from './../BlockManager';

import { JsonToMjml } from '../JsonToMjml';
const Page = BlockManager.getBlockByType(BasicType.PAGE)!;
const Section = BlockManager.getBlockByType<AdvancedBlock>(
  AdvancedType.SECTION
)!;
const Column = BlockManager.getBlockByType(AdvancedType.COLUMN)!;
const Text = BlockManager.getBlockByType(AdvancedType.TEXT)!;
import { Liquid } from 'liquidjs';
import { AdvancedType, BasicType } from '@core/constants';
import { AdvancedBlock, OperatorSymbol, Operator } from '@core/blocks';

const engine = new Liquid();
describe('Test condition.test', () => {
  const mergeTags = {
    user: {
      name: 'Ryan',
      age: 26,
      job: 'backend',
      email: 'easy-email@gmail.com',
    },
  };

  it('should be visible when condition is not enabled', () => {
    const content = Page.create({
      children: [
        Section.create({
          data: {
            value: {
              condition: {
                enabled: false,
                groups: [
                  {
                    groups: [
                      {
                        left: 'user.name',
                        operator: Operator.EQUAL,
                        right: mergeTags.user.name,
                      },
                      {
                        left: 'user.job',
                        operator: Operator.EQUAL,
                        right: 'mergeTags.user.job',
                      },
                    ],
                    symbol: OperatorSymbol.AND,
                  },
                ],
                symbol: OperatorSymbol.AND,
              },
            },
          },
          children: [
            Column.create({
              children: [
                Text.create({
                  data: {
                    value: {
                      content: 'this will be visible',
                    },
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    });

    const tpl = engine.parse(
      JsonToMjml({
        data: content,
        mode: 'production',
        context: content,
        dataSource: {},
      })
    );
    const html = engine.renderSync(tpl, mergeTags);
    expect(html).toContain('this will be visible');
  });

  it('should be hide when result is false', () => {
    const content = Page.create({
      children: [
        Section.create({
          data: {
            value: {
              condition: {
                enabled: true,
                groups: [
                  {
                    groups: [
                      {
                        left: 'user.name',
                        operator: Operator.EQUAL,
                        right: mergeTags.user.name,
                      },
                      {
                        left: 'user.job',
                        operator: Operator.EQUAL,
                        right: 'mergeTags.user.job',
                      },
                    ],
                    symbol: OperatorSymbol.AND,
                  },
                ],
                symbol: OperatorSymbol.AND,
              },
            },
          },
          children: [
            Column.create({
              children: [
                Text.create({
                  data: {
                    value: {
                      content: 'this will be hide',
                    },
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    });

    const tpl = engine.parse(
      JsonToMjml({
        data: content,
        mode: 'production',
        context: content,
        dataSource: {},
      })
    );
    const html = engine.renderSync(tpl, mergeTags);
    expect(html).not.toContain('this will be hide');
  });

  it('should be visible when result is true', () => {
    const content = Page.create({
      children: [
        Section.create({
          data: {
            value: {
              condition: {
                enabled: true,
                groups: [
                  {
                    groups: [
                      {
                        left: 'user.name',
                        operator: Operator.EQUAL,
                        right: mergeTags.user.name,
                      },
                      {
                        left: 'user.job',
                        operator: Operator.EQUAL,
                        right: mergeTags.user.job,
                      },
                    ],
                    symbol: OperatorSymbol.AND,
                  },
                ],
                symbol: OperatorSymbol.AND,
              },
            },
          },
          children: [
            Column.create({
              children: [
                Text.create({
                  data: {
                    value: {
                      content: 'this will be visible',
                    },
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    });

    const tpl = engine.parse(
      JsonToMjml({
        data: content,
        mode: 'production',
        context: content,
        dataSource: {},
      })
    );
    const html = engine.renderSync(tpl, mergeTags);
    expect(html).toContain('this will be visible');
  });
});
