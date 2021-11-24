/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useCallback, useMemo } from 'react';
import { TextField } from '../../../components/Form';
import { Stack, TextStyle, useBlock } from 'easy-email-editor';
import { get } from 'lodash';

export function NavbarLinkPadding({ name }: { name: string; }) {
  const { values } = useBlock();

  const getVal = useCallback(
    (index: number) => {
      return () => {
        return get(values, name)?.split(' ')[index] || '';
      };
    },
    [name, values]
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
        <TextStyle variation='strong'>Padding</TextStyle>
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label={<span>Top</span>}
              quickchange
              name={name}
              valueAdapter={getVal(0)}
              onChangeAdapter={setVal(0)}
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label='Bottom'
              quickchange
              name={name}
              valueAdapter={getVal(2)}
              onChangeAdapter={setVal(2)}
            />
          </Stack.Item>
        </Stack>

        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label={<span>Left</span>}
              quickchange
              name={name}
              valueAdapter={getVal(3)}
              onChangeAdapter={setVal(3)}
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label={<span>Right&nbsp;</span>}
              quickchange
              name={name}
              valueAdapter={getVal(1)}
              onChangeAdapter={setVal(1)}
            />
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }, [getVal, name, setVal]);
}
