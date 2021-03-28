import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { LinkOutlined } from '@ant-design/icons';
import { SelectField, TextField } from '@/components/core/Form';
import { getOptionsByStringArray } from '@/utils/getOptionsByStringArray';
import { Stack } from '@/components/Stack';

export function Link() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            prefix={<LinkOutlined />}
            label="href"
            name={`${focusIdx}.attribute.href`}
            inline
          />
        </Stack.Item>

        <div style={{ minWidth: 150 }}>
          <SelectField

            label='target'
            name={`${focusIdx}.attribute.target`}
            options={[
              {
                value: '',
                label: '_self',
              },
              {
                value: '_blank',
                label: '_blank'
              }
            ]}
            inline
          />
        </div>

      </Stack>
    );
  }, [focusIdx]);
}
