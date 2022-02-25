import React from 'react';
import { parseReactBlockToBlockData } from '../parseReactBlockToBlockData';
import * as componentsMap from '../../components';
import { BlockManager } from '../BlockManager';
import { BasicType } from '@core/constants';
import { kebabCase, snakeCase } from 'lodash';

describe('Test parseXml', () => {
  const componentNames = Object.keys(componentsMap).filter(item => item !== 'MjmlBlock');
  it.each(componentNames)('$name is valid block', (componentName) => {


    const Com = componentsMap[componentName];
    const type = snakeCase(kebabCase(componentName)).toUpperCase();
    const block = BlockManager.getBlockByType(BasicType[type]);


    expect(parseReactBlockToBlockData(<Com />)).toEqual(block?.create());
  });
});

describe('Test parseXml2', () => {
  const { Column, Section, Text } = componentsMap;
  const reactNode = (
    <Section padding='0px'>
      <Column padding='0px' border='none' vertical-align='top'>
        <Text
          font-size='20px'
          padding='10px 25px 10px 25px'
          line-height='1'
          align='center'
          font-weight='bold'
          color={'#000000'}
        >
          hello
        </Text>
      </Column>
    </Section>
  );
  const instance = parseReactBlockToBlockData(reactNode);

  it('should as expected', () => {
    expect(instance).toEqual({
      attributes: {
        'background-position': 'top center',
        'background-repeat': 'repeat',
        'background-size': 'auto',
        border: 'none',
        direction: 'ltr',
        padding: '0px',
        'text-align': 'center',
      },
      children: [
        {
          attributes: {
            border: 'none',
            padding: '0px',
            'vertical-align': 'top',
          },
          children: [
            {
              attributes: {
                align: 'center',
                color: '#000000',
                'font-size': '20px',
                'font-weight': 'bold',
                'line-height': '1',
                padding: '10px 25px 10px 25px',
              },
              children: [],
              data: {
                value: {
                  content: 'hello',
                },
              },
              type: 'text',
            },
          ],
          data: { value: {} },
          type: 'column',
        },
      ],
      data: { value: { noWrap: false } },
      type: 'section',
    });
  });

  it('should be error when component is not basic block', () => {
    const reactNode = <div />;

    expect(() => parseReactBlockToBlockData(reactNode)).toThrowError();
  });
});
