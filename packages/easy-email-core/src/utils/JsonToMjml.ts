import { html } from 'js-beautify';
import { unescape } from 'lodash';
import { renderToStaticMarkup } from 'react-dom/server';
import { BlockManager } from '@core/utils';
import { JsonToMjmlOption } from './isProductionMode';

export function JsonToMjml(options: JsonToMjmlOption): string {
  const { data, beautify } = options;
  const block = BlockManager.getBlockByType(data.type);
  if (!block) {
    throw new Error(`Block ${data.type} not found`);
  }
  const mjmlString = unescape(
    renderToStaticMarkup(block.render(options) as any)
  );
  if (beautify) {
    return html(mjmlString, { indent_size: 2 });
  }
  return mjmlString;
}
