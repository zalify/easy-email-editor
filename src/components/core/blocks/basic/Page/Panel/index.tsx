import React, { useCallback } from 'react';
import { WidthHeight } from '@/components/ConfigurationPanel/components/WidthHeight';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Background } from '@/components/ConfigurationPanel/components/Background';
import { Margin } from '@/components/ConfigurationPanel/components/Margin';
import { CollapsePanels } from '@/components/CollapsePanels';
import { ImageUploaderField, TextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@/hooks/useEditorContext';
import { Extra } from '@/components/ConfigurationPanel/components/Extra';

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
        {
          title: '宽高',
          children: <WidthHeight />,
          active: true,
        },
        {
          title: '边距',
          children: (
            <>
              <Padding />
              <Margin />
            </>
          ),
          active: true,
        },
        {
          title: '背景',
          children: <Background />,
          active: true,
        },
        {
          title: '额外',
          children: <Extra />,
          active: true,
        },

      ]}
    />
  );
}
