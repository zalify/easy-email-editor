import { RecursivePartial } from '../typings';
import { IGroup } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type GroupProps = RecursivePartial<IGroup['data']> & RecursivePartial<IGroup['attributes']> & {
    children?: MjmlBlockProps<IGroup>['children'];
};
export declare function Group(props: GroupProps): JSX.Element;
