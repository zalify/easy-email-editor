import { RecursivePartial } from '../typings';
import { IRaw } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type RawProps = RecursivePartial<IRaw['data']> & RecursivePartial<IRaw['attributes']> & {
    children?: MjmlBlockProps<IRaw>['children'];
};
export declare function Raw(props: RawProps): JSX.Element;
