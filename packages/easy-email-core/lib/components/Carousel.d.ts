import { RecursivePartial } from '../typings';
import { ICarousel } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export declare type CarouselProps = RecursivePartial<ICarousel['data']> & RecursivePartial<ICarousel['attributes']> & {
    children?: MjmlBlockProps<ICarousel>['children'];
};
export declare function Carousel(props: CarouselProps): JSX.Element;
