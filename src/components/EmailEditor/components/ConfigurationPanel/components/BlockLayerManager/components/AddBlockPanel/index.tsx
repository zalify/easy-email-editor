import { BlocksMap } from '@/components/core/blocks';
import { IconFont } from '@/components/IconFont';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { BlockType } from '@/constants';
import { useBlock } from '@/hooks/useBlock';
import { getChildIdx } from '@/utils/block';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';
import { getIconNameByBlockType } from '@/utils/getIconNameByBlockType';
import { AutoComplete } from 'antd';
import React, { useMemo } from 'react';

const blocks = BlocksMap.getBlocks();

export const AddBlockPanel: React.FC<{
  type: BlockType;
  parentIdx: string;
  positionIndex: number;
}> = (props) => {
  const { addBlock } = useBlock();
  const validChildBlocks = useMemo(() => {
    return blocks.filter((item) => item.validParentType.includes(props.type));
  }, [props.type]);

  const onAdd = (selectType: string) => {
    addBlock({
      type: selectType as BlockType,
      parentIdx: props.parentIdx,
      positionIndex: props.positionIndex,
    });

    setTimeout(() => {
      const editBlock = findBlockNodeByIdx(
        getChildIdx(props.parentIdx, props.positionIndex)
      );
      editBlock?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }, 50);
  };

  return (
    <AutoComplete
      value=''
      style={{ minWidth: 200 }}
      onSelect={onAdd}
      options={validChildBlocks.map((item) => {
        return {
          value: item.type,
          label: (
            <Stack>
              <IconFont
                size={12}
                iconName={getIconNameByBlockType(item.type)}
              />
              <TextStyle size='smallest'>{item.name}</TextStyle>
            </Stack>
          ),
        };
      })}
    >
      <div style={{ pointerEvents: 'auto' }}>{props.children}</div>
    </AutoComplete>
  );
};
