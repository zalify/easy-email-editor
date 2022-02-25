import { BasicType } from '@core/constants';
import { getChildIdx, getPageIdx } from '@core/utils';
import { getPreviewClassName } from '../getPreviewClassName';

describe('Test getPreviewClassName.test', () => {
  it("should get result as expected", () => {
    const idx = getChildIdx(getPageIdx(), 0);
    const className = getPreviewClassName(idx, BasicType.SECTION);
    expect(className).toEqual(`email-block node-idx-${idx} node-type-${BasicType.SECTION}`);

  });

});
