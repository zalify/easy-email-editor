export declare class MergeTagBadge {
    static transform(content: string, id?: string): string;
    static revert(content: string, generateMergeTag: (s: string) => string): string;
}
