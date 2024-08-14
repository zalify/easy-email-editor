import React from 'react';
import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import { BasicBlock } from '@core/components/BasicBlock';
import { t } from '@core/utils';

export interface ITableData {
  content: string;
  colSpan?: number;
  rowSpan?: number;
}

export type ITable = IBlockData<
  {
    cellPadding?: string;
    cellBorderColor?: string;
    'font-style'?: string;
    'text-align'?: string;
  },
  {
    content?: string;
    dataSource: ITableData[][];
  }
>;

export const Table = createBlock<ITable>({
  get name() {
    return t('Table');
  },
  type: BasicType.TABLE,
  create: payload => {
    const defaultData: ITable = {
      type: BasicType.TABLE,
      data: {
        value: {
          dataSource: [
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
  validParentType: [BasicType.COLUMN],
  render(params) {
    const { data } = params;
    const { cellPadding, cellBorderColor } = data.attributes;
    const textAlign = data.attributes['text-align'];
    const fontStyle = data.attributes['font-style'];

    const content = data.data.value.dataSource
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
            }" style="${styles.join(';')}">${e.content}</td>`,
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
