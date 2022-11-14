import { RecursivePartial } from '../typings';
import { IDivider } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type DividerProps = RecursivePartial<IDivider['data']> & RecursivePartial<IDivider['attributes']> & {
    children?: MjmlBlockProps<IDivider>['children'];
};
export declare function Divider(props: DividerProps): JSX.Element;
