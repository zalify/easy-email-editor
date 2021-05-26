import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/UI/Stack';
import { useBlock } from '@/hooks/useBlock';
import { TextStyle } from '@/components/UI/TextStyle';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export interface PaddingProps {
  title?: string;
  attributeName?: string;
}
export function Padding(props: PaddingProps = {}) {
  const { title = 'Padding', attributeName = 'padding' } = props;
  const { focusBlock, setValueByIdx } = useBlock();
  const { focusIdx } = useFocusIdx();
  const [count, setCount] = useState(0);

  const getVal = useCallback(
    (index: number) => {
      return () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return focusBlock?.attributes[attributeName]?.split(' ')[index];
      };
    },
    [attributeName, focusBlock?.attributes]
  );

  const setVal = useCallback(
    (index: number) => {
      return (newVal: string) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const vals: string[] = focusBlock?.attributes[attributeName]?.split(' ') || [];
        vals[index] = newVal || '0px';
        return vals.join(' ');
      };
    },
    [attributeName, focusBlock?.attributes]
  );

  useEffect(() => {
    if (!focusBlock) return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
  }, [attributeName, count, focusIdx, getVal, setVal, title]);
}
