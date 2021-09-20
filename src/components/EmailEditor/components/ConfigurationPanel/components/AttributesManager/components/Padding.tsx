/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/UI/Stack';
import { useBlock } from '@/hooks/useBlock';
import { TextStyle } from '@/components/UI/TextStyle';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { createBlockItem } from '@/utils/createBlockItem';

export interface PaddingProps {
  title?: string;
  attributeName?: 'padding' | 'inner-padding';
}
export function Padding(props: PaddingProps = {}) {
  const { title = 'Padding', attributeName = 'padding' } = props;
  const { focusBlock } = useBlock();
  const { focusIdx } = useFocusIdx();

  const defaultConfig = useMemo(() => focusBlock && createBlockItem(focusBlock.type), [focusBlock]);

  const getVal = useCallback(
    (index: number) => {
      return () => {
        return focusBlock?.attributes[attributeName]?.split(' ')[index] || (defaultConfig?.attributes[attributeName])?.split(' ')[index];
      };
    },
    [attributeName, defaultConfig?.attributes, focusBlock?.attributes]
  );

  const setVal = useCallback(
    (index: number) => {
      return (newVal: string) => {
        if (newVal === '') {
          newVal = '0px';
        }
        const vals: string[] = [getVal(0)(), getVal(1)(), getVal(2)(), getVal(3)()];
        vals[index] = newVal;
        return vals.join(' ');
      };
    },
    [getVal]
  );

  return useMemo(() => {
    return (
      <Stack vertical spacing='extraTight'>
        <TextStyle>{title}</TextStyle>
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label='Top'
              quickchange
              name={`${focusIdx}.attributes.${attributeName}`}
              valueAdapter={getVal(0)}
              onChangeAdapter={setVal(0)}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label='Bottom'
              quickchange
              name={`${focusIdx}.attributes.${attributeName}`}
              valueAdapter={getVal(2)}
              onChangeAdapter={setVal(2)}
              inline
            />
          </Stack.Item>
        </Stack>

        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label='Left'
              quickchange
              name={`${focusIdx}.attributes.${attributeName}`}
              valueAdapter={getVal(3)}
              onChangeAdapter={setVal(3)}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label='Right'
              quickchange
              name={`${focusIdx}.attributes.${attributeName}`}
              valueAdapter={getVal(1)}
              onChangeAdapter={setVal(1)}
              inline
            />
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }, [attributeName, focusIdx, getVal, setVal, title]);
}
