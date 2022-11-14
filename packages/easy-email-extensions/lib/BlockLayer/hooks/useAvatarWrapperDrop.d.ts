/// <reference types="react" />
import { IBlockDataWithId } from '..';
export declare function useAvatarWrapperDrop(): {
    setBlockLayerRef: import("react").Dispatch<import("react").SetStateAction<HTMLElement | null>>;
    blockLayerRef: HTMLElement | null;
    allowDrop: (o: {
        dragNode: {
            type: string;
        } | {
            key: string;
        };
        dropNode: {
            dataRef: IBlockDataWithId;
            parent: IBlockDataWithId;
            key: string;
        };
        dropPosition: number;
    }) => false | {
        key: string;
        position: number;
    };
    removeHightLightClassName: () => void;
};
export declare function getDirectionFormDropPosition(position: number): "" | "top" | "bottom";
