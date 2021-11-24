import * as fs from 'fs';
import * as jsdom from 'jsdom';
import { camelCase } from 'lodash';
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

(global as any).window = dom.window;
(global as any).document = dom.window.document;
(global as any).navigator = dom.window.navigator;
(global as any).DOMParser = dom.window.DOMParser;

import { BlockManager } from '../src/utils';
const cwd = process.cwd();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
let indexFileContent = ``;
BlockManager.getBlocks().forEach((item) => {
  const fileName = capitalizeFirstLetter(camelCase(item.type));
  const code = `
  import { omit } from 'lodash';
  import { BasicType } from '@core/constants';
  import { RecursivePartial } from '@core/typings';
  import React from 'react';
  import { I${fileName} } from '@core/blocks/${fileName}';
  import MjmlBlock from '@core/components/MjmlBlock';

  export type ${fileName}Props = RecursivePartial<I${fileName}['data']> &
  RecursivePartial<I${fileName}['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

  export function ${fileName}(props: ${fileName}Props) {
    return (
      <MjmlBlock
        attributes={omit(props, ['data', 'children'])}
        value={props.value}
        type={BasicType.${item.type.toUpperCase().replace('-', '_')}}
      >
        {props.children}
      </MjmlBlock>
    );
  }
  `;
  try {
    fs.mkdirSync(cwd + '/src/components');
  } catch (error) {}
  fs.writeFileSync(cwd + '/src/components/' + fileName + '.tsx', code);
  indexFileContent += `export {${fileName}} from './${fileName}'\n`;
});

fs.writeFileSync(cwd + '/src/components/index.ts', indexFileContent);
