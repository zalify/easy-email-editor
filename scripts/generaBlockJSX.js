const fs = require('fs-extra');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { camelCase } = require('lodash');
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.DOMParser = dom.window.DOMParser;

const { BlocksMap } = require('../lib/index');
const cwd = process.cwd();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
let indexFileContent = ``;
Object.values(BlocksMap.basicBlocksMap).forEach((item) => {
  const fileName = capitalizeFirstLetter(camelCase(item.type));
  const code = `
  import { omit } from 'lodash';
  import { BasicType } from '@/constants';
  import { RecursivePartial } from '@/typings';
  import React from 'react';
  import { I${fileName} } from '@/components/core/blocks/basic/${fileName}';
  import MjmlBlock from '@/components/core/MjmlBlock';

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
    fs.mkdirSync(cwd + '/src/blocks');
  } catch (error) {}
  fs.writeFileSync(cwd + '/src/blocks/' + fileName + '.tsx', code);
  indexFileContent += `export {${fileName}} from './${fileName}'\n`;
});

fs.writeFileSync(cwd + '/src/blocks/index.ts', indexFileContent);
