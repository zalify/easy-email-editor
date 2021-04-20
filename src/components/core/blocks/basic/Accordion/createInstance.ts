import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IAccordion } from '.';
import { AccordionElement } from '../AccordionElement';
import { AccordionText } from '../AccordionText';
import { AccordionTitle } from '../AccordionTitle';

export const createInstance: CreateInstance<IAccordion> = (payload) => {
  const defaultData: IAccordion = {
    type: BasicType.ACCORDION,
    data: {
      value: {},
    },
    attributes: {
      'icon-height': '32px',
      'icon-width': '32px',
      'icon-align': 'middle',
      'icon-position': 'right',
      'icon-unwrapped-url': 'https://i.imgur.com/w4uTygT.png',
      'icon-wrapped-url': 'https://i.imgur.com/bIXv1bk.png',
      padding: '10px 25px 10px 25px',
      border: '1px solid #d9d9d9'
    },
    children: [
      AccordionElement.createInstance({
        children: [
          AccordionTitle.createInstance({
            data: {
              value: {
                content: 'Why use an accordion?'
              }
            }
          }),
          AccordionText.createInstance({
            data: {
              value: {
                content: 'Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way.'
              }
            }
          })
        ]
      }),
      AccordionElement.createInstance({
        children: [
          AccordionTitle.createInstance({
            data: {
              value: {
                content: 'How it works'
              }
            }
          }),
          AccordionText.createInstance({
            data: {
              value: {
                content: 'Content is stacked into tabs and users can expand them at will. If responsive styles are not supported (mostly on desktop clients), tabs are then expanded and your content is readable at once.'
              }
            }
          })
        ]
      })
    ],
  };
  return merge(defaultData, payload);
};
