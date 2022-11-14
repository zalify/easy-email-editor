import { RecursivePartial } from '../typings';
import { IButton } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type ButtonProps = RecursivePartial<IButton['data']> & RecursivePartial<IButton['attributes']> & {
    children?: MjmlBlockProps<IButton>['children'];
};
export declare function Button(props: ButtonProps): JSX.Element;
