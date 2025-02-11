import { get } from 'lodash';
import React from 'react';

export function generateTranslate(localeData: Record<string, string>): any {
  return (key: string, placeholder?: React.ReactNode) => {
    const translationValue = get(localeData, key, key);
    if (!placeholder) {
      return translationValue;
    }
    const arr: React.ReactNode[] = translationValue.split('***');
    arr.splice(1, 0, placeholder);

    return (
      <>
        {arr.map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
      </>
    );
  };
}
