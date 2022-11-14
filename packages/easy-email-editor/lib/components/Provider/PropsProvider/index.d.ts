import { IBlockData } from 'easy-email-core';
import React from 'react';
export interface CollectedBlock {
    label: string;
    helpText: string;
    thumbnail: string;
    data: IBlockData;
    id: string;
}
export interface BlockGroup {
    title: string;
    blocks: Array<CollectedBlock>;
}
export interface PropsProviderProps {
    height: string;
    fontList?: {
        value: string;
        label: string;
    }[];
    onAddCollection?: (payload: CollectedBlock) => void;
    onRemoveCollection?: (payload: {
        id: string;
    }) => void;
    onUploadImage?: (data: Blob) => Promise<string>;
    interactiveStyle?: {
        hoverColor?: string;
        selectedColor?: string;
        dragoverColor?: string;
        tangentColor?: string;
    };
    autoComplete?: boolean;
    dashed?: boolean;
    socialIcons?: Array<{
        content: string;
        image: string;
    }>;
    mergeTagGenerate?: (m: string) => string;
    onChangeMergeTag?: (ptah: string, val: any) => any;
    renderMergeTagContent?: (props: {
        onChange: (val: string) => void;
        isSelect: boolean;
        value: string;
    }) => React.ReactNode;
    enabledMergeTagsBadge?: boolean;
    mergeTags?: Record<string, any>;
    previewInjectData?: Record<string, any>;
    onBeforePreview?: (html: string, mergeTags: PropsProviderProps['previewInjectData'] | PropsProviderProps['mergeTags']) => string | Promise<string>;
    enabledLogic?: boolean;
    locale?: Record<string, string>;
}
export declare const EditorPropsContext: React.Context<PropsProviderProps & {
    mergeTagGenerate: Required<PropsProviderProps['mergeTagGenerate']>;
}>;
export declare const PropsProvider: React.FC<PropsProviderProps>;
