import { IconFont } from '@/components/IconFont';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { BlockType } from '@/constants';
import { useBlock } from '@/hooks/useBlock';
import { getValidChildBlocks } from '@/utils/block';
import { getIconNameByBlockType } from '@/utils/getIconNameByBlockType';
import { AutoComplete } from 'antd';
import React, { useMemo } from 'react';

export const AddBlockPanel: React.FC<{
  type: BlockType;
  parentIdx: string;
  positionIndex: number;
}> = (props) => {
  const { addBlock } = useBlock();
  const validChildBlocks = useMemo(() => {
    return getValidChildBlocks(props.type);
  }, [props.type]);

  const onAdd = (selectType: string) => {
    addBlock({
      type: selectType as BlockType,
      parentIdx: props.parentIdx,
      positionIndex: props.positionIndex,
    });
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
