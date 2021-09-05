import React from 'react';
import { parseMjmlBlockToBlockData } from '../parseMjmlBlockToBlockData';
import { Column, Section, Text } from '../../blocks';

describe('Test parseXml', () => {
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
  const instance = parseMjmlBlockToBlockData(reactNode);

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

    expect(() => parseMjmlBlockToBlockData(reactNode)).toThrowError();
  });
});
