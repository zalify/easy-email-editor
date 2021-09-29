import { RichTextField } from '@/components/core/Form/RichTextField';
import { useBlock } from '@/hooks/useBlock';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { findBlockByType, getValueByIdx } from '@/utils/block';
import React from 'react';
import { useMemo } from 'react';

export function AttributesManager() {
  const { values } = useBlock();
  const { focusIdx } = useFocusIdx();

  const value = getValueByIdx(values, focusIdx);

  const block = value && (findBlockByType(value.type) as any);

  const content = useMemo(() => {
    if (!block) return null;
    return (
      <>
        <block.Panel />
        <div style={{ position: 'absolute' }}>
          <RichTextField
            idx={focusIdx}
            name={`${focusIdx}.data.value.content`}
            label=''
            labelHidden
          />
        </div>
      </>
    );
  }, [block, focusIdx]);

  if (!value) return null;
  return content;
}
