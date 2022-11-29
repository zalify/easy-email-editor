export declare function awaitForElement<T extends HTMLElement>(idx: string): {
    cancel: () => void;
    promise: Promise<T>;
};
