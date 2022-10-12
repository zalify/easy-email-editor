import { generateTranslate } from '@/utils/generateTranslate';
import React, { useEffect, useMemo, useState } from 'react';

export const LanguageProvider: React.FC<{ locale?: Record<string, string> }> = props => {
  const [count, setCount] = useState(0);

  const translate = useMemo(() => generateTranslate(props.locale || {}), [props.locale]);

  useEffect(() => {
    setCount(c => c + 1);
  }, []);

  return useMemo(() => {
    window.t = translate;
    return <React.Fragment key={count}>{props.children}</React.Fragment>;
  }, [count, props.children, translate]);
};
