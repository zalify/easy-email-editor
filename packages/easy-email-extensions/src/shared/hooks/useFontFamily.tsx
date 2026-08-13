import { useEditorContext, useEditorProps } from 'easy-email-editor';
import React, { useMemo } from 'react';

export function useFontFamily() {
  const { fontList: defaultFontList } = useEditorProps();
  const { pageData } = useEditorContext();

  const addFonts = pageData.data.value.fonts;

  const fontList = useMemo(() => {
    const fonts: Array<{
      value: string;
      label: React.ReactNode;
    }> = [];
    if (defaultFontList) {
      fonts.push(...defaultFontList);
    }
    if (addFonts) {
      const options = addFonts.map(item => ({ value: item.name, label: item.name }));
      fonts.unshift(...options);
    }

    return fonts.map(item => ({ value: item.value, label: <span style={{ fontFamily: item.value }}>{item.label}</span> }));
  }, [addFonts, defaultFontList]);

  return {
    fontList
  };
}