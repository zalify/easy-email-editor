import { BasicType } from '@core/constants';
import React from 'react';
import { Template } from '@core/components';
import MjmlBlock, { MjmlBlockProps } from '@core/components/MjmlBlock';

import { AdvancedBlock, generateAdvancedBlock } from './generateAdvancedBlock';
import { AdvancedType, getChildIdx, IBlockData } from '@core';

export function generateAdvancedLayoutBlock<T extends AdvancedBlock>(option: {
  type: string;
  baseType: BasicType;
  validParentType: string[];
}) {
  return generateAdvancedBlock<T>({
    ...option,
    getContent: (data, idx, mode, context, dataSource) => {
      const blockData = {
        ...data,
        type: option.baseType,
      };

      return <LoopBlock blockData={blockData} idx={idx!}></LoopBlock>;
    },
  });
}

function LoopBlock(props: { blockData: IBlockData; idx: string }) {
  const { blockData, idx } = props;

  return (
    <Template idx={idx} penetrate>
      <MjmlBlock
        type={blockData.type}
        attributes={blockData.attributes}
        value={blockData.data.value}
      >
        {blockData.children.map((child, index) => (
          <LoopBlock
            key={index}
            blockData={child}
            idx={getChildIdx(idx, index)}
          />
        ))}
      </MjmlBlock>
    </Template>
  );
}
