import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IAccordionText } from '.';

export const createInstance: CreateInstance<IAccordionText> = (payload) => {
  const defaultData: IAccordionText = {
    type: BasicType.ACCORDION_TEXT,
    data: {
      value: {
        content: 'Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way'
      },
    },
    attributes: {
      "font-size": '13px',
      padding: '16px 16px 16px 16px',
      'line-height': '1',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
