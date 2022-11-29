/// <reference types="react" />
import { IBlockData } from 'easy-email-core';
export interface BlockMarketCategory {
    name: string;
    title: string;
    blocks: {
        type: string;
        title: string;
        description?: React.ReactNode;
        thumbnail?: string;
        payload?: IBlockData;
        component: () => JSX.Element | null;
    }[];
}
export declare class BlockMarketManager {
    private static category;
    private static subscriptHandles;
    static subscribe(fn: (category: BlockMarketCategory[]) => void): number;
    static unsubscribe(fn: (category: BlockMarketCategory[]) => void): ((category: BlockMarketCategory[]) => void)[];
    static notify(): void;
    static getCategory(name: string): BlockMarketCategory | undefined;
    static getCategories(): BlockMarketCategory[];
    static addCategories(list: BlockMarketCategory[]): void;
    static addCategory(name: string, title: string, blocks: {
        type: string;
        title: string;
        description?: React.ReactNode;
        component: () => JSX.Element | null;
    }[]): void;
    static removeCategories(list: BlockMarketCategory[]): void;
    static removeCategory(name: string): void;
}
