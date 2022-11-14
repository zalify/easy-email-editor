import { RecursivePartial } from '../typings';
import { IAccordion } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type AccordionProps = RecursivePartial<IAccordion['data']> & RecursivePartial<IAccordion['attributes']> & {
    children?: MjmlBlockProps<IAccordion>['children'];
};
export declare function Accordion(props: AccordionProps): JSX.Element;
