import { RecursivePartial } from '../typings';
import { IAccordionText } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type AccordionTextProps = RecursivePartial<IAccordionText['data']> & RecursivePartial<IAccordionText['attributes']> & {
    children?: MjmlBlockProps<IAccordionText>['children'];
};
export declare function AccordionText(props: AccordionTextProps): JSX.Element;
