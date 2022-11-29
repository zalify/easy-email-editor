import { IBlockData } from 'easy-email-core';
import { RecursivePartial } from 'easy-email-core';
export interface DragIconProps<T extends IBlockData> {
    type: string;
    payload?: RecursivePartial<T>;
    color: string;
}
export declare function DragIcon<T extends IBlockData = any>(props: DragIconProps<T>): JSX.Element;
