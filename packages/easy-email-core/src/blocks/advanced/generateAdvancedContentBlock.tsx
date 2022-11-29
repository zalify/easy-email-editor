import { Column, Section } from '@core/components';
import { BasicType, AdvancedType } from '@core/constants';
import { BlockManager, getParentByIdx } from '@core/utils';
import { classnames } from '@core/utils/classnames';
import React from 'react';
import { generateAdvancedBlock, I18nType } from './generateAdvancedBlock';
import { getPreviewClassName } from '@core/utils/getPreviewClassName';
import { IBlockData } from '@core';

import cloneDeep from 'lodash/cloneDeep';

export function generateAdvancedContentBlock<T extends IBlockData>(option: {
  type: string;
  baseType: BasicType;
}) {
  return generateAdvancedBlock<T>({
    ...option,

    validParentType: [
      BasicType.PAGE,
      BasicType.WRAPPER,
      BasicType.COLUMN,
      BasicType.GROUP,
      BasicType.HERO,

      AdvancedType.WRAPPER,
      AdvancedType.COLUMN,
      AdvancedType.GROUP,
      AdvancedType.HERO,
    ],
    getContent: params => {
      const { data, idx, mode, context, index, i18n } = params;

      const previewClassName =
        mode === 'testing'
          ? classnames(index === 0 && idx && getPreviewClassName(idx, data.type))
          : '';

      const blockData = {
        ...data,
        type: option.baseType,
        attributes: {
          ...data.attributes,
          'css-class': classnames(data.attributes['css-class'], previewClassName),
        },
      };

      const block = BlockManager.getBlockByType(blockData.type);
      if (!block) {
        throw new Error(`Can not find ${blockData.type}`);
      }

      let children;
      if (mode === 'testing' || !i18n?.enabled) {
        children = block?.render({ ...params, data: blockData, idx });
      } else {
        const dataClone = cloneDeep(blockData);
        let content = dataClone.data.value.content;
        const regexPattern = /{{({*[^{}]*}*)}}/g;
        const matches = content.matchAll(regexPattern);

        let placeHolders: any[] = [];
        let counter = 1;
        let foundNumberVariable = false;
        for (const match of matches) {
          // const idx = match.index;
          if (i18n.type === I18nType.NI18N || i18n.type === I18nType.CNI18N) {
            if (match[1] === i18n.numberVariable) {
              content = content.replace(match[0], '{%' + 1 + '=' + match[1] + '}');
              placeHolders.unshift(match[1]);
              foundNumberVariable = true;
            } else {
              content = content.replace(
                match[0],
                '{%' + (counter + 1) + '=' + match[1] + '}',
              );
              counter++;
              placeHolders.push(match[1]);
            }
          } else {
            content = content.replace(match[0], '{%' + counter + '=' + match[1] + '}');
            counter++;
            placeHolders.push(match[1]);
          }
        }

        // Replace singualr variables
        let singularText = i18n.singularText;
        if (i18n.type === I18nType.NI18N || i18n.type === I18nType.CNI18N) {
          const matches = singularText.matchAll(regexPattern);
          let counter = 1;
          for (const match of matches) {
            if (match[1] === i18n.numberVariable) {
              singularText = singularText.replace(match[0], '1');
            } else {
              singularText = singularText.replace(
                match[0],
                '{%' + counter + '=' + match[1] + '}',
              );
              // counter++;
            }
          }
        }

        let modifiedContent = `<mj-raw><!-- htmlmin:ignore -->`;

        if (i18n.type === I18nType.CI18N) {
          modifiedContent += `{{"${content}" | ci18n: "${i18n.context}"`;
        } else if (i18n.type === I18nType.NI18N) {
          modifiedContent += `{{"${content}" | ni18n: "${singularText}"`;
        } else if (i18n.type === I18nType.CNI18N) {
          if (!foundNumberVariable) {
            console.log('Please input correct Number Vairable in i18n attribute panel!');
          }
          modifiedContent += `"{{${content}" | cni18n: "${i18n.context}", "${singularText}"`;
        } else {
          modifiedContent += `{{"${content}" | i18n`;
        }
        console.log('placeholders:', placeHolders);

        for (let i = 0; i < placeHolders.length; i++) {
          if (i === 0 && i18n.type === I18nType.I18N) {
            modifiedContent += ': ';
          } else {
            modifiedContent += ', ';
          }

          modifiedContent += placeHolders[i];
        }

        modifiedContent += `}}<!-- htmlmin:ignore --></mj-raw>`;
        console.log(modifiedContent);
        dataClone.data.value.content = modifiedContent;
        children = block?.render({ ...params, data: dataClone, idx });
      }

      const parentBlockData = getParentByIdx({ content: context! }, idx!);
      if (!parentBlockData) {
        return children;
      }

      if (
        parentBlockData.type === BasicType.PAGE ||
        parentBlockData.type === BasicType.WRAPPER ||
        parentBlockData.type === AdvancedType.WRAPPER
      ) {
        return (
          <Section
            padding='0px'
            text-align='left'
          >
            <Column>{children}</Column>
          </Section>
        );
      }

      return children;
    },
  });
}
