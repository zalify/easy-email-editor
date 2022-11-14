import { RecursivePartial } from '../typings';
import { IHero } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type HeroProps = RecursivePartial<IHero['data']> & RecursivePartial<IHero['attributes']> & {
    children?: MjmlBlockProps<IHero>['children'];
};
export declare function Hero(props: HeroProps): JSX.Element;
