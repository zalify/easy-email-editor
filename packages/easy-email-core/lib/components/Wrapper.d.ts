import { RecursivePartial } from '../typings';
import { IWrapper } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type WrapperProps = RecursivePartial<IWrapper['data']> & RecursivePartial<IWrapper['attributes']> & {
    children?: MjmlBlockProps<IWrapper>['children'];
};
export declare function Wrapper(props: WrapperProps): JSX.Element;
