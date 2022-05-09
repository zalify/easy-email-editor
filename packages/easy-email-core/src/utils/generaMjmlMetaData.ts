import { IPage } from '@core/blocks';
import { isObject, isString } from 'lodash';

export function generaMjmlMetaData(data: IPage) {
  const values = data.data.value;
  const attributes = [
    'content-background-color',
    'text-color',
    'font-family',
    'font-size',
    'line-height',
    'font-weight',
    'user-style',
    'responsive',
  ];

  return `
    <mj-html-attributes>
      ${attributes
        .filter((key) => values[key as keyof typeof values] !== undefined)
        .map((key) => {
          const attKey = key as keyof typeof values;
          const isMultipleAttributes = isObject(values[attKey]);
          const value = isMultipleAttributes
            ? Object.keys(values[attKey]!)
                .map((childKey) => {
                  const childValue = (values[attKey] as any)[childKey];

                  return `${childKey}="${
                    isString(childValue)
                      ? childValue.replace(/"/gm, '')
                      : childValue
                  }"`;
                })
                .join(' ')
            : `${key}="${values[attKey]}"`;
          return `<mj-html-attribute class="easy-email" multiple-attributes="${isMultipleAttributes}" attribute-name="${key}" ${value}></mj-html-attribute>`;
        })
        .join('\n')}

    </mj-html-attributes>
  `;
}
