import { IBlock } from '../typings';
declare type BlockDataItem = Omit<Parameters<IBlock['render']>[0], 'mode' | 'context' | 'dataSource'>;
export declare const BlockRenderer: (props: BlockDataItem) => JSX.Element | null;
export {};
