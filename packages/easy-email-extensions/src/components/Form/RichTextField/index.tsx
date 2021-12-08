import {
  useActiveTab,
  FIXED_CONTAINER_ID,
  useBlock,
  useFocusIdx,
  getBlockNodeByIdx,
  getEditorRoot,
  getEditNode,
} from 'easy-email-editor';
import { onDrag } from '@extensions/AttributePanel/utils/onDrag';
import React, { useCallback, useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocalStorage } from 'react-use';
import { EnhancerProps } from '../enhancer';
import { InlineTextField } from '../index';
import { InlineTextProps } from '../InlineTextField';
import { BasicType } from 'easy-email-core';
import { RichTextToolBar } from '../RichTextToolBar';

const TEXT_BAR_LOCATION_KEY = 'TEXT_BAR_LOCATION_KEY';
const RichTextFieldItem = (
  props: Omit<InlineTextProps, 'onChange' | 'mutators'> & EnhancerProps<string>
) => {
  const [locationState, setLocationState] = useLocalStorage(
    TEXT_BAR_LOCATION_KEY,
    { left: 0, top: 0 }
  );
  const { idx } = props;

  // useEffect(() => {
  //   const fixContainer = getEditorRoot();
  //   if (fixContainer && idx) {
  //     const { left, top } = fixContainer.getBoundingClientRect();

  //     setPosition({
  //       left: locationState?.left || left,
  //       top: locationState?.top || top - 46,
  //     });
  //   }
  // }, [idx, locationState?.left, locationState?.top]);

  return (
    <>
      <RichTextToolBar />
      <InlineTextField {...(props as any)} />
    </>
  );
};

export const RichTextField = (
  props: Omit<InlineTextProps, 'onChange' | 'mutators'> & EnhancerProps<string>
) => {
  const { focusBlock } = useBlock();
  const { focusIdx } = useFocusIdx();
  if (focusBlock?.type !== BasicType.TEXT) return null;
  return <RichTextFieldItem key={focusIdx} {...props} />;
};
