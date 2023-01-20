import { get } from 'lodash';
import React from 'react';

export class I18nManager {
  static localeData: Record<string, string> = {};

  static setLocaleData(localeData: Record<string, string>) {
    this.localeData = localeData;
  }
  static translate(key: string, placeholder?: React.ReactNode): string;
  static translate(key: string, placeholder: React.ReactNode) {
    const translationValue = get(this.localeData, key, key);
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
  }
}

export const t = I18nManager.translate.bind(I18nManager);
