import { RecursivePartial } from '../typings';
import { IText } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type TextProps = RecursivePartial<IText['data']> & RecursivePartial<IText['attributes']> & {
    children?: MjmlBlockProps<IText>['children'];
};
export declare function Text(props: TextProps): JSX.Element;
