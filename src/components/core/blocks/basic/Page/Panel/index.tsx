import React, { useCallback } from 'react';
import { CollapsePanels } from '@/components/CollapsePanels';
import { ImageUploaderField, TextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@/hooks/useEditorContext';

export function Panel() {
  const { values: { props: { uploadHandler } } } = useEditorContext();
  const { focusIdx, focusBlock } = useBlock();

  const onChangeAdapter = useCallback((val: string | string[]) => Array.isArray(val) ? val[0] : val, []);

  if (!focusBlock) return null;
  return (
    <CollapsePanels
      options={[
        {
          title: '模板配置',
          children: (
            <Stack vertical>
              <TextField label='模板名称' name={'title'} inline />
              <TextField
                label='页面标题'
                name={`${focusIdx}.data.value.title`}
                inline
              />
              <ImageUploaderField label='模板图片' name={'picture'} inline uploadHandler={uploadHandler} onChangeAdapter={onChangeAdapter} />
            </Stack>
          ),
          active: true,
        },

      ]}
    />
  );
}
