import { AdvancedType } from 'easy-email-core';
import { TextBlockItem } from './TextBlockItem';
import { ImageBlockItem } from './ImageBlockItem';
export declare const defaultCategories: {
    title: string;
    name: string;
    blocks: ({
        type: AdvancedType;
        title: string;
        description: string;
        component: typeof TextBlockItem;
    } | {
        type: AdvancedType;
        title: string;
        description: JSX.Element;
        component: typeof ImageBlockItem;
    })[];
}[];
