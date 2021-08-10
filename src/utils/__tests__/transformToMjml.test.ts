import { BlocksMap } from '@/components/core/blocks';
import { transformToMjml } from '../transformToMjml';

describe.only('Test transformToMjml', () => {
  it('should render as expected', () => {
    expect(
      transformToMjml(
        BlocksMap.basicBlocksMap.Page.createInstance({
          children: [
            BlocksMap.basicBlocksMap.Section.createInstance({
              children: [
                BlocksMap.basicBlocksMap.Column.createInstance({
                  children: [BlocksMap.basicBlocksMap.Text.createInstance({})],
                }),
              ],
            }),
          ],
        })
      )
    ).toMatchSnapshot();
  });
});
