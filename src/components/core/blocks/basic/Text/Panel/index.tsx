import React, { useEffect, useMemo, useState } from 'react';
import { Padding } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { Width } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { TextDecoration } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/TextDecoration';
import { FontWeight } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontStyle } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontStyle';
import { TextTransform } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/TextTransform';
import { FontFamily } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { Height } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { ContainerBackgroundColor } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { FontSize } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { Color } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { Align } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Align';
import { IText } from '..';
import { LineHeight } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/LineHeight';
import { LetterSpacing } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/LetterSpacing';
import { RichTextField } from '@/components/core/Form';
import { useEditorContext } from '@/hooks/useEditorContext';

export function Panel() {
  const { focusIdx, focusBlock, recordStatus } = useBlock();
  const { pageData } = useEditorContext();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Rerender RichText while recordStatus !== 'add'
    if (recordStatus !== 'add' && focusBlock?.data.value.content) {
      setCount((count) => count + 1);
    }
  }, [recordStatus, focusBlock?.data.value.content]);

  const containerStyle = useMemo(() => {
    const attributes = (focusBlock?.attributes as IText['attributes']) || {};
    return {
      color: attributes.color || pageData.data.value['text-color'],
      fontSize: attributes['font-size'],
      fontFamily: attributes['font-family'],
      lineHight: attributes['line-height'],
      letterSpacing: attributes['letter-spacing'],
      textDecoration: attributes['text-transform'],
      fontStyle: attributes['font-style'],
      fontWeight: attributes['font-weight'],
      backgroundColor: attributes['container-background-color'],
    } as React.CSSProperties;
  }, [focusBlock?.attributes, pageData.data.value]);

  return (
    <Stack vertical key={focusIdx}>
      <RichTextField
        key={count}
        name={`${focusIdx}.data.value.content`}
        label='Content'
        containerStyle={containerStyle}
      />
      <Color />
      <ContainerBackgroundColor />
      <FontSize />
      <LineHeight />

      <FontStyle />
      <FontWeight />
      <LetterSpacing />
      <Height />
      <FontFamily />
      <TextDecoration />
      <TextTransform />
      <Align />
      <Width />
      <Padding />
    </Stack>
  );
}
