import { RecursivePartial } from '../typings';
import { IPage } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type PageProps = RecursivePartial<IPage['data']> & RecursivePartial<IPage['attributes']> & {
    children?: MjmlBlockProps<IPage>['children'];
};
export declare function Page(props: PageProps): JSX.Element;
