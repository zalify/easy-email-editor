import { RecursivePartial } from '../typings';
import { IAccordionTitle } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type AccordionTitleProps = RecursivePartial<IAccordionTitle['data']> & RecursivePartial<IAccordionTitle['attributes']> & {
    children?: MjmlBlockProps<IAccordionTitle>['children'];
};
export declare function AccordionTitle(props: AccordionTitleProps): JSX.Element;
