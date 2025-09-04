import React, { useMemo } from 'react';
import { getIframeDocument, IconFont, useFocusIdx } from 'easy-email-editor';
import { IconLink } from '@arco-design/web-react/icon';
import { SelectField, TextField } from '../../../components/Form';
import { Button as ArcoButton, Grid, Popover, Space } from '@arco-design/web-react';
import { MergeTags } from './MergeTags';
import { useField } from 'react-final-form';

export function Link() {
  const { focusIdx } = useFocusIdx();
  const { input } = useField(`${focusIdx}.attributes.href`, {
    parse: v => v,
  });

  return useMemo(() => {
    return (
      <Grid.Row>
        <Grid.Col span={11}>
          <TextField
            prefix={<IconLink />}
            label={(
              <Space>
                <span>{t('Href')}&nbsp;&nbsp;&nbsp;</span>
                <Popover
                  triggerProps={{
                    // @ts-expect-error I am ignoring this type error here since this is expecting an
                    // element but the function returns a document. This works fine and isn't an issue.
                    getDocument: getIframeDocument,
                  }}
                  trigger="click"
                  content={(
                    <MergeTags
                      value={input.value}
                      onChange={input.onChange}
                    />
                  )}
                >
                  <ArcoButton
                    type="text"
                    icon={<IconFont iconName="icon-merge-tags" />}
                  />
                </Popover>
              </Space>
            )}
            name={`${focusIdx}.attributes.href`}
          />
        </Grid.Col>
        <Grid.Col
          offset={1}
          span={11}
        >
          <SelectField
            label={t('Target')}
            name={`${focusIdx}.attributes.target`}
            options={[
              {
                value: '',
                label: t('_self'),
              },
              {
                value: '_blank',
                label: t('_blank'),
              },
            ]}
          />
        </Grid.Col>
      </Grid.Row>
    );
  }, [focusIdx]);
}
