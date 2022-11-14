import React from 'react';
interface TreeNode<T> {
    id: string;
    children?: T[];
}
export interface BlockTreeProps<T extends TreeNode<T>> {
    treeData: T[];
    selectedKeys?: string[];
    expandedKeys?: string[];
    onSelect: (selectedId: string) => void;
    onContextMenu?: (nodeData: T, ev: React.MouseEvent) => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    onMouseLeave?: () => void;
    onMouseEnter?: (id: string) => void;
    renderTitle: (data: T) => React.ReactNode;
    defaultExpandAll?: boolean;
    allowDrop: (o: {
        dragNode: {
            type: string;
        } | {
            key: string;
        };
        dropNode: {
            dataRef: T;
            parent: T;
            key: string;
        };
        dropPosition: number;
    }) => false | {
        key: string;
        position: number;
    };
    onDrop: (o: {
        dragNode: {
            dataRef: T;
            parent: T;
            key: string;
            parentKey: string;
        };
        dropNode: {
            dataRef: T;
            parent: T;
            key: string;
            parentKey: string;
        };
        dropPosition: number;
    }) => void;
}
export declare function BlockTree<T extends TreeNode<T>>(props: BlockTreeProps<T>): JSX.Element;
export {};
