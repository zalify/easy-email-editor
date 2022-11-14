import { RecursivePartial } from '../typings';
import { ITable } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type TableProps = RecursivePartial<ITable['data']> & RecursivePartial<ITable['attributes']> & {
    children?: MjmlBlockProps<ITable>['children'];
};
export declare function Table(props: TableProps): JSX.Element;
