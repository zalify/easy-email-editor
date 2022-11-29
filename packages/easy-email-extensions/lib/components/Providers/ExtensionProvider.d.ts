import { BlockLayerProps } from '../../BlockLayer';
import React from 'react';
export interface ExtensionProps extends BlockLayerProps {
    categories: Array<{
        label: string;
        active?: boolean;
        blocks: Array<{
            type: string;
            payload?: any;
            title?: string | undefined;
        }>;
        displayType?: 'grid';
    } | {
        label: string;
        active?: boolean;
        blocks: Array<{
            payload?: any;
            title?: string | undefined;
        }>;
        displayType: 'column';
    } | {
        label: string;
        active?: boolean;
        blocks: Array<{
            payload?: any;
        }>;
        displayType: 'widget';
    } | {
        label: string;
        active?: boolean;
        blocks: Array<React.ReactNode>;
        displayType: 'custom';
    }>;
    showSourceCode?: boolean;
    compact?: boolean;
}
export declare const ExtensionContext: React.Context<ExtensionProps>;
export declare const ExtensionProvider: React.FC<ExtensionProps>;
export declare function useExtensionProps(): ExtensionProps;
