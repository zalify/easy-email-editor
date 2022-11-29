export interface MergeTagsProps {
    execCommand: (cmd: string, value: any) => void;
    getPopupContainer: () => HTMLElement;
}
export declare function MergeTags(props: MergeTagsProps): JSX.Element;
