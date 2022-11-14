import { RecursivePartial } from '../typings';
import { IAccordionElement } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type AccordionElementProps = RecursivePartial<IAccordionElement['data']> & RecursivePartial<IAccordionElement['attributes']> & {
    children?: MjmlBlockProps<IAccordionElement>['children'];
};
export declare function AccordionElement(props: AccordionElementProps): JSX.Element;
