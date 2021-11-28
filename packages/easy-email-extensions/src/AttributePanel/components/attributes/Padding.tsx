/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useCallback, useMemo } from 'react';
import { TextField } from '../../../components/Form';
import { useFocusIdx, Stack, useBlock, TextStyle } from 'easy-email-editor';
import { createBlockDataByType } from 'easy-email-core';

export interface PaddingProps {
  title?: string;
  attributeName?: 'padding' | 'inner-padding' | 'text-padding';
}
export function Padding(props: PaddingProps = {}) {
  const { title = 'Padding', attributeName = 'padding' } = props;
  const { focusBlock } = useBlock();
  const { focusIdx } = useFocusIdx();

  const defaultConfig = useMemo(
    () => focusBlock && createBlockDataByType(focusBlock.type),
    [focusBlock]
  );

  const getVal = useCallback(
    (index: number) => {
      return () => {
        return (
          focusBlock?.attributes[attributeName]?.split(' ')[index] ||
          defaultConfig?.attributes[attributeName]?.split(' ')[index]
        );
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
        const vals: string[] = [
          getVal(0)(),
          getVal(1)(),
          getVal(2)(),
          getVal(3)(),
        ];
        vals[index] = newVal;
        return vals.join(' ');
      };
    },
    [getVal]
  );

  return useMemo(() => {
    return (
      <Stack vertical spacing='extraTight'>
        <TextStyle variation='strong'>{title}</TextStyle>
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label={<span>Top&nbsp;</span>}
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
              label={<span>Left</span>}
              quickchange
              name={`${focusIdx}.attributes.${attributeName}`}
              valueAdapter={getVal(3)}
              onChangeAdapter={setVal(3)}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label={<span>Right&nbsp;</span>}
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
