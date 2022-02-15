import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Background } from '@extensions/AttributePanel/components/attributes/Background';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { SwitchField } from '@extensions/components/Form';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack, TextStyle, useBlock, useFocusIdx } from 'easy-email-editor';
import { BasicType, BlockManager } from 'easy-email-core';
import { ClassName } from '../../attributes/ClassName';

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
        <Collapse.Item name='0' header='Dimension'>
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={12}>
                <SwitchField
                  label='Group'
                  name={`${focusIdx}.data.value.noWrap`}
                  helpText='Prevent columns from stacking on mobile.'
                  checkedText='True'
                  uncheckedText='False'
                  inline
                />
              </Grid.Col>
              <Grid.Col span={12} />
            </Grid.Row>

            <Padding />
          </Space>
        </Collapse.Item>
        <Collapse.Item name='1' header='Background'>
          <Stack vertical spacing='tight'>
            <Background />
          </Stack>
        </Collapse.Item>
        <Collapse.Item name='2' header='Border'>
          <Border />
        </Collapse.Item>
        <Collapse.Item name='4' header='Extra'>
          <Grid.Col span={24}>
            <ClassName />
          </Grid.Col>
        </Collapse.Item>
      </Collapse>
    </AttributesPanelWrapper>
  );
}
