export interface FontFamilyProps {
    execCommand: (cmd: string, value: any) => void;
    getPopupContainer: () => HTMLElement;
}
export declare function FontFamily(props: FontFamilyProps): JSX.Element;
