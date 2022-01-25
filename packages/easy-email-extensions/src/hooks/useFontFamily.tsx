import { useEditorContext, useEditorProps } from 'easy-email-editor';
import { useMemo } from 'react';

export function useFontFamily() {
  const { fontList: defaultFontList } = useEditorProps();
  const { pageData } = useEditorContext();

  const addFonts = pageData.data.value.fonts;

  const fontList = useMemo(() => {
    const fonts: Array<{
      value: string;
      label: string;
    }> = [];
    if (defaultFontList) {
      fonts.push(...defaultFontList);
    }
    if (addFonts) {
      const options = addFonts.map(item => ({ value: item.name, label: item.name }));
      fonts.unshift(...options);
    }
    return fonts;
  }, [addFonts, defaultFontList]);

  return {
    fontList
  };
}