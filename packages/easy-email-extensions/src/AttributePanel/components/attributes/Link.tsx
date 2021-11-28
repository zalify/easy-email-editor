import React, { useMemo } from 'react';
import { useFocusIdx, Stack } from 'easy-email-editor';
import { LinkOutlined } from '@ant-design/icons';
import { SelectField, TextField } from '../../../components/Form';

export function Link() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            prefix={<LinkOutlined />}
            label={<span>Href&nbsp;&nbsp;&nbsp;</span>}
            name={`${focusIdx}.attributes.href`}
          />
        </Stack.Item>

        <div style={{ minWidth: 150 }}>
          <SelectField
            label='Target'
            name={`${focusIdx}.attributes.target`}
            options={[
              {
                value: '',
                label: '_self',
              },
              {
                value: '_blank',
                label: '_blank',
              },
            ]}
          />
        </div>
      </Stack>
    );
  }, [focusIdx]);
}
