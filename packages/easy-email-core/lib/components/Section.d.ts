import { RecursivePartial } from '../typings';
import { ISection } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type SectionProps = RecursivePartial<ISection['data']> & RecursivePartial<ISection['attributes']> & {
    children?: MjmlBlockProps<ISection>['children'];
};
export declare function Section(props: SectionProps): JSX.Element;
