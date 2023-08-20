import { IconEye, IconEyeInvisible } from '@arco-design/web-react/icon';
import React, { useCallback } from 'react';
import { Stack, TextStyle, useBlock, useFocusIdx } from 'easy-email-editor';
import { BasicType, BlockManager, getParentByIdx } from 'easy-email-core';
import { BlockLayer } from '@extensions/BlockLayer';

export interface AttributesPanelWrapper {
  style?: React.CSSProperties;
  extra?: React.ReactNode;
  children: React.ReactNode | React.ReactElement;
}
export const AttributesPanelWrapper: React.FC<AttributesPanelWrapper> = props => {
  const { focusBlock, setFocusBlock, values } = useBlock();
  const { focusIdx } = useFocusIdx();
  let block;

  const parentBlock = getParentByIdx(values, focusIdx );

  const isChildren = parentBlock?.type !== BasicType.PAGE
  let type:any = parentBlock?.type;
  
  if(isChildren){
    block = focusBlock && BlockManager.getBlockByType(type);
  }
  else{
    block = focusBlock && BlockManager.getBlockByType(focusBlock.type);
  }

  if (!focusBlock || !block) return null;

  return (
    <div>
      <div
        style={{
          border: '1px solid var(--color-neutral-3, rgb(229, 230, 235))',
          borderBottom: 'none',
          padding: '12px 24px',
        }}
      >
        <Stack vertical>
          <Stack.Item fill>
            <Stack
              wrap={false}
              distribution='equalSpacing'
              alignment='center'
            >
              <Stack
                spacing='extraTight'
                alignment='center'
              >
                <TextStyle
                  variation='strong'
                  size='large'
                >
                  {`${block.name} `} {t('attributes')}
                </TextStyle>
              </Stack>
              <Stack.Item>{props.extra}</Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </div>

      <div style={{ padding: '0px', ...props.style }}>{props.children}</div>
    </div>
  );
};
