import { BasicType } from '@core/constants';
import { IBlock, IBlockData } from '@core/typings';
import { createCustomBlock } from '@core/utils/createCustomBlock';
import { TemplateEngineManager, createBlock, t } from '@core/utils';
import { merge } from 'lodash';
import React from 'react';
import { IPage, standardBlocks } from '../standard';
import { BasicBlock } from '@core/components/BasicBlock';

export function generateAdvancedTableBlock(option: {
  type: string;
  baseType: BasicType;
}) {
  return createCustomBlock<AdvancedTableBlock>({
    get name() {
      return t('Table');
    },
    type: option.type,
    validParentType: [BasicType.COLUMN],
    create: payload => {
      const defaultData: AdvancedTableBlock = {
        type: option.type,
        data: {
          value: {
            tableSource: [
              [{ content: 'header1' }, { content: 'header2' }, { content: 'header3' }],
              [{ content: 'body1-1' }, { content: 'body1-2' }, { content: 'body1-3' }],
              [{ content: 'body2-1' }, { content: 'body2-2' }, { content: 'body2-3' }],
            ],
          },
        },
        attributes: {
          cellBorderColor: '#000000',
          cellPadding: '8px',
          'text-align': 'center',
        },
        children: [],
      };
      return merge(defaultData, payload);
    },
    render: params => {
      const { data } = params;
      const { cellPadding, cellBorderColor } = data.attributes;
      const textAlign = data.attributes['text-align'];
      const fontStyle = data.attributes['font-style'];

      const content = data.data.value.tableSource
        .map((tr, index) => {
          const styles = [] as any[];
          if (cellPadding) {
            styles.push(`padding: ${cellPadding}`);
          }
          if (cellBorderColor) {
            styles.push(`border: 1px solid ${cellBorderColor}`);
          }
          const _trString = tr.map(
            e =>
              `<td rowspan="${e.rowSpan || 1}" colspan="${
                e.colSpan || 1
              }" style="${styles.join(';')}; background-color:${e.backgroundColor};">${e.content}</td>`,
          );
          return `<tr style="text-align:${textAlign};font-style:${fontStyle};">${_trString.join(
            '\n',
          )}</tr>`;
        })
        .join('\n');

      return (
        <BasicBlock
          params={params}
          tag='mj-table'
        >
          {content}
        </BasicBlock>
      );
    },
  });
}

export interface IAdvancedTableData {
  content: string;
  colSpan?: number;
  rowSpan?: number;
  backgroundColor?: string;
}

export type AdvancedTableBlock = IBlockData<
  {
    cellPadding?: string;
    cellBorderColor?: string;
    'font-style'?: string;
    'text-align'?: string;
  },
  {
    content?: string;
    tableSource: IAdvancedTableData[][];
  }
>;
