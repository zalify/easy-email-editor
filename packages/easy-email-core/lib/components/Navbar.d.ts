import { RecursivePartial } from '../typings';
import { INavbar } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type NavbarProps = RecursivePartial<INavbar['data']> & RecursivePartial<INavbar['attributes']> & {
    children?: MjmlBlockProps<INavbar>['children'];
};
export declare function Navbar(props: NavbarProps): JSX.Element;
