import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Background } from '@extensions/AttributePanel/components/attributes/Background';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { SwitchField } from '@extensions/components/Form';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse } from 'antd';
import { Stack, TextStyle, useBlock, useFocusIdx } from 'easy-email-editor';
import { BasicType, BlockManager } from 'easy-email-core';

export function Section() {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, setFocusBlock } = useBlock();

  const noWrap = focusBlock?.data.value.noWrap;

  const changeNoWrap = useCallback(
    (noWrap: boolean) => {
      if (!focusBlock) return;

      if (noWrap) {
        const children = [...focusBlock.children];
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (!child) continue;
          if (child.type === BasicType.GROUP) {
            children.splice(i, 1, ...child.children);
          }
        }
        focusBlock.children = [
          BlockManager.getBlockByType(BasicType.GROUP)!.create({
            children: children,
          }),
        ];
      } else {
        if (
          focusBlock.children.length === 1 &&
          focusBlock.children[0].type === BasicType.GROUP
        ) {
          focusBlock.children = focusBlock.children[0]?.children || [];
        }
      }
      setFocusBlock({ ...focusBlock });
    },
    [focusBlock, setFocusBlock]
  );

  useEffect(() => {
    changeNoWrap(noWrap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noWrap]);

  return (

    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapse defaultActiveKey={['0', '1', '2']}>

        <Collapse.Panel key="0" header="Dimension">
          <Stack vertical>
            <Stack vertical spacing="none">
              <TextStyle variation="strong">Group</TextStyle>
              <Stack wrap={false} alignment="trailing">
                <Stack.Item fill>
                  <TextStyle>
                    Prevent columns from stacking on mobile.
                  </TextStyle>
                </Stack.Item>
                <SwitchField
                  label=''
                  labelHidden
                  name={`${focusIdx}.data.value.noWrap`}
                  checkedChildren='True'
                  unCheckedChildren='False'
                  inline
                />
              </Stack>
            </Stack>
            <Padding />
          </Stack>
        </Collapse.Panel>
        <Collapse.Panel key="1" header="Background">
          <Stack vertical spacing="tight">
            <Background />
          </Stack>
        </Collapse.Panel>
        <Collapse.Panel key="2" header="Border">
          <Border />
        </Collapse.Panel>
      </Collapse>

    </AttributesPanelWrapper>
  );
}
