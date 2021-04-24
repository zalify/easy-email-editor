import React, { useEffect, useMemo, useState } from 'react';
import { Padding } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import { BackgroundColor } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import { Color } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { RichTextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { FontSize } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { FontWeight } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontFamily } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { LineHeight } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/LineHeight';
import { IAccordionText } from '..';

export function Panel() {
  const { focusIdx, focusBlock, recordStatus } = useBlock();
  const [count, setCount] = useState(0);

  useEffect(() => {

    // Rerender RichText while recordStatus !== 'add'
    if (recordStatus !== 'add' && focusBlock?.data.value.content) {
      setCount(count => count + 1);
    }
  }, [recordStatus, focusBlock?.data.value.content]);

  const containerStyle = useMemo(() => {
    if (!focusBlock) return {};
    const attributes = focusBlock.attributes as IAccordionText['attributes'];
    return {
      color: attributes.color,
      fontSize: attributes['font-size'],
      fontFamily: attributes['font-family'],
      lineHight: attributes['line-height'],
      letterSpacing: attributes['letter-spacing'],
      fontWeight: attributes['font-weight'],
    } as React.CSSProperties;
  }, [focusBlock]);

  return (
    <Stack vertical>
      <RichTextField key={count} name={`${focusIdx}.data.value.content`} label="Content" containerStyle={containerStyle} />
      <Color />
      <FontSize />
      <LineHeight />
      <FontWeight />
      <FontFamily />
      <BackgroundColor />
      <Padding title="Padding" attributeName="padding" />
    </Stack>
  );
}
