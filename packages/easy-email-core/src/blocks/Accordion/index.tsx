import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { AccordionElement } from '../AccordionElement';
import { AccordionTitle } from '../AccordionTitle';
import { AccordionText } from '../AccordionText';
import { merge } from 'lodash';

export type IAccordion = IBlockData<
  {
    'icon-width': string;
    'icon-height': string;
    'container-background-color'?: string;
    border?: string;
    padding: string;
    'inner-padding'?: string;
    'font-family'?: string;
    'icon-align'?: 'middle' | 'top' | 'bottom';
    'icon-position': 'left' | 'right';
    'icon-unwrapped-alt'?: string;
    'icon-unwrapped-url'?: string;
    'icon-wrapped-alt'?: string;
    'icon-wrapped-url'?: string;
  },
  {}
>;

export const Accordion = createBlock<IAccordion>({
  name: 'Accordion',
  type: BasicType.ACCORDION,
  validParentType: [BasicType.COLUMN],
  create: (payload) => {
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
        border: '1px solid #d9d9d9',
      },
      children: [
        AccordionElement.create({
          children: [
            AccordionTitle.create({
              data: {
                value: {
                  content: 'Why use an accordion?',
                },
              },
            }),
            AccordionText.create({
              data: {
                value: {
                  content:
                    'Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way.',
                },
              },
            }),
          ],
        }),
        AccordionElement.create({
          children: [
            AccordionTitle.create({
              data: {
                value: {
                  content: 'How it works',
                },
              },
            }),
            AccordionText.create({
              data: {
                value: {
                  content:
                    'Content is stacked into tabs and users can expand them at will. If responsive styles are not supported (mostly on desktop clients), tabs are then expanded and your content is readable at once.',
                },
              },
            }),
          ],
        }),
      ],
    };
    return merge(defaultData, payload);
  },
});
