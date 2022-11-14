import { IBlock, IBlockData } from '../typings';
export declare class BlockManager {
    private static blocksMap;
    private static autoCompletePath;
    private static setAutoCompletePath;
    static getBlocks(): Array<IBlock>;
    static registerBlocks(blocksMap: {
        [key: string]: IBlock;
    }): void;
    static getBlockByType<T extends IBlockData>(type: string): IBlock<T> | undefined;
    static getBlocksByType(types: Array<string>): Array<IBlock | undefined>;
    static getAutoCompleteFullPath(): {
        [key: string]: string[][];
    };
    static getAutoCompletePath(type: string, targetType: string): Array<string> | null;
}
