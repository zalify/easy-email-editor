import { useFocusIdx } from '@';
import { Collapse } from '@arco-design/web-react';
import React from 'react';

const Blocks = [
  {
    name: 'block 1'
  },
  {
    name: 'block 2'
  },
  {
    name: 'block 3'
  },
  {
    name: 'block 4'
  },
  {
    name: 'block 5'
  },
  {
    name: 'block 6'
  },
  {
    name: 'block 7'
  },
  {
    name: 'block 8'
  },
  {
    name: 'block 9'
  },
  {
    name: 'block 10'
  },
  {
    name: 'block 11'
  },
  {
    name: 'block 12'
  },
  {
    name: 'block 13'
  },
  {
    name: 'block 14'
  },
  {
    name: 'block 15'
  },
  {
    name: 'block 16'
  },
  {
    name: 'block 18'
  },
  {
    name: 'block 19'
  },
  {
    name: 'block 20'
  },
];

export const GlobalAttributePanel = () => {
  const { focusIdx } = useFocusIdx();

  return (
    <>{
      Blocks.map((block: any, index: any) => {
        return (
          <>


                <Collapse.Item
                  name='0'
                  header={block.name}
                >
                </Collapse.Item>



          </>
        );

      })
    }</>
  );
};