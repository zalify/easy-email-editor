import { BlockManager } from './../BlockManager';

import { JsonToMjml } from '../JsonToMjml';
import { Liquid } from 'liquidjs';
import { AdvancedType, BasicType } from '@core/constants';
import { AdvancedBlock, OperatorSymbol, Operator, ICondition } from '@core/blocks';

const Page = BlockManager.getBlockByType(BasicType.PAGE)!;
const Section = BlockManager.getBlockByType<AdvancedBlock>(
  AdvancedType.SECTION
)!;
const Column = BlockManager.getBlockByType(AdvancedType.COLUMN)!;
const Text = BlockManager.getBlockByType(AdvancedType.TEXT)!;

const engine = new Liquid();
describe('Test condition.test', () => {
  const mergeTags = {
    user: {
      name: 'Ryan',
      age: 26,
      job: 'backend',
      email: 'easy-email@gmail.com',
      fired: false
    },
  };

  const createPageWithCondition = (condition: ICondition, content: string) => {
    return Page.create({
      children: [
        Section.create({
          data: {
            value: {
              condition
            },
          },
          children: [
            Column.create({
              children: [
                Text.create({
                  data: {
                    value: {
                      content
                    },
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }

  it('should be visible when condition is not enabled', () => {
    const expectedContent = 'this will be visible';
    const content = createPageWithCondition({
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
    }, expectedContent)

    const tpl = engine.parse(
      JsonToMjml({
        data: content,
        mode: 'production',
        context: content,
        dataSource: {},
      })
    );
    const html = engine.renderSync(tpl, mergeTags);
    expect(html).toContain(expectedContent);
  });

  it('should be hidden when result is false', () => {
    const expectedContent = 'this will be hidden';
    const content = createPageWithCondition({
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
    }, expectedContent)

    const tpl = engine.parse(
      JsonToMjml({
        data: content,
        mode: 'production',
        context: content,
        dataSource: {},
      })
    );
    const html = engine.renderSync(tpl, mergeTags);
    expect(html).not.toContain(expectedContent);
  });

  it('should be visible when result is true', () => {
    const expectedContent = 'this will be visible';
    const content = createPageWithCondition({
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
    }, expectedContent)

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

  describe("with Falsy operator", () => {
    it('should be visible when result is a false boolean', () => {
      const expectedContent = 'this will be visible';
      const content = createPageWithCondition({
        enabled: true,
        groups: [
          {
            groups: [
              {
                left: 'user.fired',
                operator: Operator.FALSY,
                right: '',
              }
            ],
            symbol: OperatorSymbol.AND,
          },
        ],
        symbol: OperatorSymbol.AND,
      }, expectedContent)

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

    it('should be visible when result is nil', () => {
      const expectedContent = 'this will be visible';
      const content = createPageWithCondition({
        enabled: true,
        groups: [
          {
            groups: [
              {
                left: 'user.nilAttribute',
                operator: Operator.FALSY,
                right: '',
              }
            ],
            symbol: OperatorSymbol.AND,
          },
        ],
        symbol: OperatorSymbol.AND,
      }, expectedContent)

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
    })
  })
});
