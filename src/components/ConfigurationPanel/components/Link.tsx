import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { LinkOutlined } from '@ant-design/icons';
import { TextField } from '@/components/core/Form';

export function Link() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <TextField
        prefix={<LinkOutlined />}
        label='链接'
        name={`${focusIdx}.data.link`}
        inline
      />
    );
  }, [focusIdx]);
}
