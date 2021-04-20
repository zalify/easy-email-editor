import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IAccordionTitle } from '.';

export const createInstance: CreateInstance<IAccordionTitle> = (payload) => {
  const defaultData: IAccordionTitle = {
    type: BasicType.ACCORDION_TITLE,
    data: {
      value: {
        content: 'Why use an accordion?'
      },
    },
    attributes: {
      "font-size": '13px',
      padding: '16px 16px 16px 16px',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
