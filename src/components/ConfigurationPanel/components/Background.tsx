import React, { useMemo } from 'react';
import { ColorPickerField, ImageUploaderField, SelectField, TextField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { TextStyle } from '@/components/TextStyle';
import { useEditorContext } from '@/hooks/useEditorContext';

const backgroundRepeatOptions = [
  {
    value: 'none',
    label: '不重复',
  },
  {
    value: 'repeat',
    label: '重复',
  },
  {
    value: 'repeat-x',
    label: 'x轴重复',
  },
  {
    value: 'repeat-y',
    label: 'y轴重复',
  }
];

const onChangeAdapter = (url: string | (string[])) => {
  const pic = Array.isArray(url) ? url[0] : url;
  if (!pic) return '';
  return `url(${pic})`;
};

export function Background() {
  const { focusIdx } = useBlock();
  const { values: { props: { uploadHandler } } } = useEditorContext();

  return useMemo(() => {
    return (
      <Stack key={focusIdx} vertical spacing='extraTight'>
        <TextStyle size='large'>
          背景
        </TextStyle>
        <ColorPickerField
          label='颜色'
          name={`${focusIdx}.style.backgroundColor`}
          inline
          alignment='center'
        />
        <TextStyle>
          背景图
        </TextStyle>
        <Stack vertical spacing="none">
          <ImageUploaderField
            label=''
            lableHidden
            name={`${focusIdx}.style.backgroundImage`}
            inline
            valueAdapter={((text: string) => text?.replace(/url\((.*)?\)/, '$1') || '')}
            onChangeAdapter={onChangeAdapter}
            uploadHandler={uploadHandler}
          />
          <TextField label="" inline
            lableHidden name={`${focusIdx}.style.backgroundImage`}
            valueAdapter={((text: string) => text?.replace(/url\((.*)?\)/, '$1') || '')}
            onChangeAdapter={onChangeAdapter}
          />
          <TextField label="背景大小" inline
            name={`${focusIdx}.style.backgroundSize`}

          />
        </Stack>
        <SelectField
          label='背景重复'
          name={`${focusIdx}.style.backgroundRepleat`}
          options={backgroundRepeatOptions}
          inline
        />
      </Stack>
    );
  }, [focusIdx, uploadHandler]);
}
