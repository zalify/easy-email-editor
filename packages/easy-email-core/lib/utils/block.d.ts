import { BlockType } from './../constants';
import { IBlock, IBlockData } from '../typings';
export declare function getPageIdx(): string;
export declare function getChildIdx(idx: string, index: number): string;
export declare function getNodeIdxClassName(idx: string): string;
export declare function getNodeTypeClassName(type: string): string;
export declare function getNodeIdxFromClassName(classList: DOMTokenList): string | undefined;
export declare function getNodeTypeFromClassName(classList: DOMTokenList | string): BlockType | null;
export declare const getIndexByIdx: (idx: string) => number;
export declare const getParentIdx: (idx: string) => string | undefined;
export declare const getValueByIdx: <T extends IBlockData<any, any>>(values: {
    content: IBlockData;
}, idx: string) => T | null;
export declare const getParentByIdx: <T extends IBlockData<any, any> = IBlockData<any, any>>(values: {
    content: IBlockData;
}, idx: string) => T | null;
export declare const getSiblingIdx: (sourceIndex: string, num: number) => string;
export declare const getParentByType: <T extends IBlockData<any, any>>(context: {
    content: IBlockData;
}, idx: string, type: BlockType) => T | null;
export declare const getSameParent: (values: {
    content: IBlockData;
}, idx: string, dragType: string) => {
    parent: IBlockData;
    parentIdx: string;
} | null;
export declare const getParenRelativeByType: <T extends IBlockData<any, any>>(context: {
    content: IBlockData;
}, idx: string, type: BlockType) => {
    parentIdx: string;
    insertIndex: number;
    parent: IBlockData;
} | null;
export declare const getValidChildBlocks: (type: BlockType) => IBlock[];
