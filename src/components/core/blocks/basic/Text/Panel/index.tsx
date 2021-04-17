import React, { useEffect, useMemo, useState } from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { Width } from '@/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { TextDecoration } from '@/components/ConfigurationPanel/components/AttributesManager/components/TextDecoration';
import { FontWeight } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontStyle } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontStyle';
import { TextTransform } from '@/components/ConfigurationPanel/components/AttributesManager/components/TextTransform';
import { FontFamily } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { Height } from '@/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { ContainerBackgroundColor } from '@/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { FontSize } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { Color } from '@/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { Align } from '@/components/ConfigurationPanel/components/AttributesManager/components/Align';
import { RichText } from '@/components/RichText';
import { IText } from '..';
import { LineHeight } from '@/components/ConfigurationPanel/components/AttributesManager/components/LineHeight';
import { LetterSpacing } from '@/components/ConfigurationPanel/components/AttributesManager/components/LetterSpacing';

export function Panel() {
  const { focusIdx, focusBlock, setFocusBlockValue, recordStatus } = useBlock();
  const [count, setCount] = useState(0);

  useEffect(() => {

    // Rerender RichText while recordStatus !== 'add'
    if (recordStatus !== 'add' && focusBlock?.data.value.content) {
      setCount(count => count + 1);
    }
  }, [recordStatus, focusBlock?.data.value.content]);

  const containerStyle = useMemo(() => {
    if (!focusBlock) return {};
    const attributes = focusBlock.attributes as IText['attributes'];
    return {
      color: attributes.color,
      fontSize: attributes['font-size'],
      fontFamily: attributes['font-family'],
      lineHight: attributes['line-height'],
      letterSpacing: attributes['letter-spacing'],
      textDecoration: attributes['text-transform'],
      fontStyle: attributes['font-style'],
      fontWeight: attributes['font-weight'],
      backgroundColor: attributes['container-background-color']
    } as React.CSSProperties;
  }, [focusBlock]);

  const onContentChange = (text: string) => {
    if (!focusBlock) return;
    focusBlock.data.value.content = text;
    setFocusBlockValue({ ...focusBlock.data.value });
  };

  return (
    <Stack vertical key={focusIdx}>
      <RichText
        key={count}
        content={focusBlock?.data.value.content}
        containerStyle={containerStyle}
        onChange={onContentChange}
      />
      <Color />
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
      <ContainerBackgroundColor />
      <Width />
      <Padding />
    </Stack>
  );
}
