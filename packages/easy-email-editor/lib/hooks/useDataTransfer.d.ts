export declare function useDataTransfer(): {
    dataTransfer: import("../components/Provider/HoverIdxProvider").DataTransfer | null;
    setDataTransfer: import("lodash").DebouncedFunc<import("react").Dispatch<import("react").SetStateAction<import("../components/Provider/HoverIdxProvider").DataTransfer | null>>>;
};
