import { RecursivePartial } from '../typings';
import { IImage } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type ImageProps = RecursivePartial<IImage['data']> & RecursivePartial<IImage['attributes']> & {
    children?: MjmlBlockProps<IImage>['children'];
};
export declare function Image(props: ImageProps): JSX.Element;
