import React from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Background } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Background';
import { Stack } from '@/components/UI/Stack';
import { TextAlign } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/TextAlign';
import { Border } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Border';
import { SwitchField } from '@/components/core/Form';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { useEffect } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { BasicType } from '@/constants';
import { BlocksMap } from '../../..';
import { useCallback } from 'react';

export function Panel() {
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
          BlocksMap.basicBlocksMap.Group.createInstance({
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
    <Stack>
      <SwitchField
        label='Prevent columns from stacking on mobile'
        name={`${focusIdx}.data.value.noWrap`}
        checkedChildren='True'
        unCheckedChildren='False'
      />
      <Padding />
      <Background />
      <TextAlign />
      <Border />
    </Stack>
  );
}
