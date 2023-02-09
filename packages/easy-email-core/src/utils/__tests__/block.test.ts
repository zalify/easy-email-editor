import { BasicType } from '@core/constants';
import { AdvancedType } from '../../constants';
import { getChildIdx, getIndexByIdx, getParentIdx, getSiblingIdx, getValidChildBlocks } from '../block';

describe('Test parseXml', () => {
  it('test getChildIdx', () => {
    expect(getChildIdx('content', 1)).toEqual('content.children.[1]');
  });

  it('test getIndexByIdx', () => {
    expect(
      getIndexByIdx('content.children.[0].children.[0].children.[1]')
    ).toEqual(1);
  });

  it('test getParentIdx', () => {
    expect(
      getParentIdx('content.children.[0].children.[0].children.[1]')
    ).toEqual('content.children.[0].children.[0]');
  });

  it('test getSiblingIdx', () => {
    expect(
      getSiblingIdx('content.children.[0].children.[0].children.[1]', 1)
    ).toEqual('content.children.[0].children.[0].children.[2]');
  });

  it('test getValidChildBlocks', () => {
    expect(
      getValidChildBlocks(BasicType.SECTION).map((item) => item.type)
    ).toEqual([BasicType.COLUMN, BasicType.GROUP, BasicType.RAW, AdvancedType.GROUP, AdvancedType.COLUMN]);
  });
});
