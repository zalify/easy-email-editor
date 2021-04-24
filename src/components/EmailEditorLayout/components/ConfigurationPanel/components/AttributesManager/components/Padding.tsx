import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { TextStyle } from '@/components/TextStyle';

export interface PaddingProps {
  title?: string;
  attributeName?: string;
}
export function Padding(props: PaddingProps = {}) {
  const { title = 'Padding', attributeName = 'padding' } = props;
  const { focusIdx, focusBlock, setValueByIdx } = useBlock();
  const [count, setCount] = useState(0);

  const getVal = useCallback(
    (index: number) => {
      return () => {
        return focusBlock?.attributes[attributeName]?.split(' ')[index];
      };
    },
    [attributeName, focusBlock?.attributes]
  );

  const setVal = useCallback(
    (index: number) => {
      return (newVal: string) => {
        const vals = focusBlock?.attributes[attributeName]?.split(' ') || [];
        vals[index] = newVal || '0px';
        return vals.join(' ');
      };
    },
    [attributeName, focusBlock?.attributes]
  );

  useEffect(() => {
    if (!focusBlock) return;
    const paddins: string[] = focusBlock.attributes[attributeName]?.split(' ') || [];
    if (paddins.length === 2) {
      paddins[2] = paddins[0];
      paddins[3] = paddins[1];
      focusBlock.attributes[attributeName] = paddins.join(' ');
      focusBlock.attributes = { ...focusBlock.attributes };
      setValueByIdx(focusIdx, { ...focusBlock });
      setCount(c => c + 1);
    }

  }, [attributeName, focusBlock, focusBlock?.attributes, focusIdx, setValueByIdx]);

  return useMemo(() => {
    return (
      <Stack key={count} vertical spacing='extraTight'>
        <TextStyle size='large'>{title}</TextStyle>
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
