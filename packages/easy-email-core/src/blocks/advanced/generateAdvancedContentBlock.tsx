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
        let content = blockData.data.value.content;
        const regexPattern = /{{({*[^{}]*}*)}}/g;
        const matches = content.matchAll(regexPattern);

        let placeHolders: any[] = [];
        let counter = 1;
        for (const match of matches) {
          // const idx = match.index;
          console.log(match);
          content = content.replace(match, '{%' + counter + '=' + match + '}');
          placeHolders.push(match);
        }

        let modifiedContent = `<mj-raw><!-- htmlmin:ignore -->`;

        if (i18n.type === I18nType.CI18N) {
          modifiedContent += `{{"${blockData.data.value.content}" | ci18n "${i18n.context}"`;
        } else if (i18n.type === I18nType.NI18N) {
          modifiedContent += `{{"${blockData.data.value.content}" | ni18n "${i18n.singularText}"`;
        } else if (i18n.type === I18nType.CNI18N) {
          modifiedContent += `"{{${blockData.data.value.content}" | cni18n "${i18n.context}" "${i18n.singularText}"`;
        } else {
          modifiedContent += `{{"${blockData.data.value.content}" | i18n `;
        }

        placeHolders.forEach(placeHolder => {
          modifiedContent += ' ';
          modifiedContent += placeHolder;
        });

        modifiedContent += `}}<!-- htmlmin:ignore --></mj-raw>`;
        modifiedContent += `ojbk`;

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
