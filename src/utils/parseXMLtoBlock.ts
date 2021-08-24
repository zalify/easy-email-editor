import mjml from 'mjml-browser';
import { IBlockData } from '@/typings';
import { BlockType } from './../constants';
import { MjmlToJson } from './MjmlToJson';

const domParser = new DOMParser();
export function parseXMLtoBlock(text: string) {
  const dom = domParser.parseFromString(text, 'text/xml');
  const root = dom.firstChild as Element;
  if (!(dom.firstChild instanceof Element)) {
    throw new Error('Invalid content');
  }
  if (root.tagName === 'mjml') {
    const { json } = mjml(text, {
      validationLevel: 'soft',
    });
    const parseValue = MjmlToJson(json);
    return parseValue;
  }

  const transform = (node: Element): IBlockData => {
    if (node.tagName === 'parsererror') {
      throw new Error('Invalid content');
    }
    const attributes: IBlockData['attributes'] = {};
    node.getAttributeNames().forEach((name) => {
      attributes[name] = node.getAttribute(name);
    });
    const block: IBlockData = {
      type: node.tagName.replace('mj-', '') as BlockType,
      attributes: attributes,
      data: {
        value: {
          content: node.textContent?.trim(),
        },
      },
      children: [...node.children]
        .filter((item) => item instanceof Element)
        .map(transform as any),
    };
    return block;
  };

  return transform(root);
}
