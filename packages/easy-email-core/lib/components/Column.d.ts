import { RecursivePartial } from '../typings';
import { IColumn } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type ColumnProps = RecursivePartial<IColumn['data']> & RecursivePartial<IColumn['attributes']> & {
    children?: MjmlBlockProps<IColumn>['children'];
};
export declare function Column(props: ColumnProps): JSX.Element;
