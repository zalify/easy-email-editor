import { IBlockData } from '@/typings';
import { renderToStaticMarkup } from 'react-dom/server';
import { unescape } from 'lodash';

export function parseMjmlBlockToBlockData<T extends IBlockData = IBlockData>(
  node: React.ReactElement
) {

  return JSON.parse(unescape(renderToStaticMarkup(node))) as T;
}
