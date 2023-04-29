import React, { useEffect, useMemo, useState } from 'react';
import { I18nManager, t } from 'easy-email-core';

export const LanguageProvider: React.FC<{
  children?: React.ReactNode;
  locale?: Record<string, string>;
}> = props => {
  const [count, setCount] = useState(0);

  I18nManager.setLocaleData(props.locale || {});
  window.t = t as any;

  useEffect(() => {
    setCount(c => c + 1);
  }, [props.locale]);

  return useMemo(() => {
    return <React.Fragment key={count}>{props.children}</React.Fragment>;
  }, [count, props.children]);
};
