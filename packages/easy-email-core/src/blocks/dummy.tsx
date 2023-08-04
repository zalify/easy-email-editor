import React from 'react';
import { createBlock } from '@core/utils/createBlock';
import { mergeBlock } from '@core/utils/mergeBlock';
import { BlockManager, t } from '@core/utils';
import { BasicBlock } from '@core/components/BasicBlock';

export default function createMyCustomBlock(json: any) {
  const block = createBlock({
    get name() {
      return t(json.name);
    },
    type: json.type,
    create: (payload) => {
      return mergeBlock(json.defaultData, payload);
    },
    validParentType: json.validParentType,
    render(params) {
      const { data } = params;
      return (
        <BasicBlock
          params={params}
          tag={json.tag}
        />
      );
    },
  });

  BlockManager.registerBlocks({ [json.type]: block });

  const blocks = BlockManager.getBlocks();
  return block;
}