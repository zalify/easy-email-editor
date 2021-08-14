import React, { useCallback, useMemo } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/UI/Stack';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { useBlock } from '@/hooks/useBlock';
import { BasicType } from '@/constants';
import { getParentByIdx } from '@/utils/block';

export function Width() {
  const { focusIdx, } = useFocusIdx();
  const { focusBlock, values } = useBlock();
  const parentType = getParentByIdx(values, focusIdx)?.type;

  const validate = useCallback((val: string): string | undefined => {

    if (focusBlock?.type === BasicType.COLUMN && parentType === BasicType.GROUP) {
      return /(\d)*%/.test(val) ? undefined : 'Column inside a group must have a width in percentage, not in pixel';
    }
    return undefined;
  }, [focusBlock?.type, parentType]);

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            validate={validate}
            label='Width'
            name={`${focusIdx}.attributes.width`}
            inline
            quickchange
          />
        </Stack.Item>
      </Stack>
    );
  }, [focusIdx, validate]);
}
