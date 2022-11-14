/// <reference types="react" />
export declare function useSelectionRange(): {
    selectionRange: Range | null;
    setSelectionRange: import("react").Dispatch<import("react").SetStateAction<Range | null>>;
    restoreRange: (range: Range) => void;
    setRangeByElement: (element: ChildNode) => void;
};
