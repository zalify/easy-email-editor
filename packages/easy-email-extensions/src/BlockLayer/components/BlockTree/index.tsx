import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Tree } from '@arco-design/web-react';
import { AllowDrop, NodeInstance, TreeProps } from '@arco-design/web-react/es/Tree/interface';
import { debounce } from 'lodash';
import { transparentImage } from './transparentImage';

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
    dragNode: { type: string } | { key: string };
    dropNode: { dataRef: T; parent: T; key: string };
    dropPosition: number;
  }) =>
    | false
    | {
        key: string;
        position: number;
      };

  onDrop: (o: {
    dragNode: { dataRef: T; parent: T; key: string; parentKey: string };
    dropNode: { dataRef: T; parent: T; key: string; parentKey: string };
    dropPosition: number;
  }) => void;
}

const img = new Image();
img.width = 0;
img.height = 0;
img.src = transparentImage;

const fileNames = {
  key: 'id',
};

export function BlockTree<T extends TreeNode<T>>(props: BlockTreeProps<T>) {
  const [blockTreeRef, setBlockTreeRef] = useState<HTMLElement | null>(null);
  const dragNode = useRef<{
    dataRef: T;
    parent: T;
    key: string;
    parentKey: string;
  } | null>(null);

  const { treeData, allowDrop, onContextMenu, selectedKeys } = props;
  const treeDataRef = useRef(treeData);
  const {
    onDragStart: propsDragStart,
    onDrop: propsDrop,
    renderTitle: propsRenderTitle,
    onDragEnd: propsDragEnd,
    onSelect: propsSelect,
  } = props;

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const onExpand = useCallback(
    (keys: string[]) => {
      setExpandedKeys(keys);
    },
    [setExpandedKeys]
  );

  useEffect(() => {
    if (props.defaultExpandAll) {
      const keys: string[] = [];
      const loop = (data: T) => {
        keys.push(data.id);
        data.children?.forEach(loop);
      };
      treeDataRef.current.forEach(loop);
      setExpandedKeys(keys);
    }
  }, [props.defaultExpandAll]);

  useEffect(() => {
    setExpandedKeys((keys) =>
      props.expandedKeys ? [...keys, ...props.expandedKeys] : keys
    );
  }, [props.expandedKeys]);

  const onDragStart = useCallback(
    (e: React.DragEvent<HTMLSpanElement>, node: NodeInstance) => {
      e.dataTransfer.dropEffect = 'none';
      // e.dataTransfer.setDragImage(img, 0, 0);
      const dragNodeData = (node.props as any).dataRef as T;
      dragNode.current = {
        dataRef: dragNodeData,
        parent: (node.props as any).parent,
        key: node.props._key as string,
        parentKey: node.props.parentKey as string,
      };
      propsDragStart?.();
    },
    [propsDragStart]
  );

  const onDragMove: AllowDrop = useCallback(
    (option) => {
      if (!dragNode.current) return false;
      const dropData = (option.dropNode.props as any).dataRef as T;
      const dropId = option.dropNode.props._key!;
      const currentDropData: Parameters<BlockTreeProps<T>['allowDrop']>[0] = {
        dragNode: { key: dragNode.current.key },
        dropNode: {
          dataRef: dropData,
          parent: (option.dropNode.props as any).parent,
          key: dropId,
        },
        dropPosition: option.dropPosition,
      };
      const isAllowDrop = allowDrop(currentDropData);

      if (isAllowDrop) {
        return true;
      }

      return false;
    },
    [allowDrop]
  );

  const onDrop = useCallback(
    (info: {
      e: React.DragEvent<HTMLSpanElement>;
      dragNode: NodeInstance | null;
      dropNode: NodeInstance | null;
      dropPosition: number;
    }) => {
      const { dropNode, dropPosition, e } = info;
      e.dataTransfer.dropEffect = 'move';
      if (!dragNode.current || !dropNode) return;

      const dropData = (dropNode.props as any).dataRef as T;
      const currentDropData: Parameters<BlockTreeProps<T>['onDrop']>[0] = {
        dragNode: dragNode.current,
        dropNode: {
          dataRef: dropData,
          parent: (dropNode.props as any).parent,
          key: dropNode.props._key as string,
          parentKey: dropNode.props.parentKey as string,
        },
        dropPosition,
      };
      propsDrop(currentDropData);
    },
    [propsDrop]
  );

  const renderTitle: TreeProps['renderTitle'] = useCallback(
    (nodeData) => {
      return (
        <div
          style={{ display: 'inline-flex', width: '100%' }}
          onContextMenu={(ev) => onContextMenu && onContextMenu(nodeData, ev)}
        >
          {propsRenderTitle(nodeData)}
        </div>
      );
    },
    [onContextMenu, propsRenderTitle]
  );

  const onDragEnd = useCallback(() => {
    dragNode.current = null;
    propsDragEnd?.();
  }, [propsDragEnd]);

  const onSelect: TreeProps['onSelect'] = useCallback(
    (selectedKeys) => {
      propsSelect(selectedKeys[0]);
    },
    [propsSelect]
  );

  useEffect(() => {
    if (blockTreeRef) {
      blockTreeRef.addEventListener('dragover', (e) => {
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'move';
        }
      });
    }
  }, [blockTreeRef]);

  return useMemo(
    () => (
      <div ref={setBlockTreeRef} onMouseLeave={props.onMouseLeave}>
        <CacheTree
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
          onExpand={onExpand}
          draggable
          size='small'
          treeData={treeData}
          blockNode
          fieldNames={fileNames}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onDrop={onDrop}
          allowDrop={onDragMove}
          onSelect={onSelect}
          renderTitle={renderTitle}
        />
      </div>
    ),
    [
      treeData,
      props.onMouseLeave,
      expandedKeys,
      selectedKeys,
      onExpand,
      onDragEnd,
      onDragStart,
      onDrop,
      onDragMove,
      onSelect,
      renderTitle,
    ]
  );
}

const cacheTreeDebounceCallback = debounce(
  (data: TreeProps, setCacheProps: (s: TreeProps) => void) => {
    setCacheProps(data);
  },
  300
);

function CacheTree(props: TreeProps) {
  const [cacheProps, setCacheProps] = useState(props);
  const lastProps = useRef(props);

  useEffect(() => {
    if (lastProps.current.treeData !== props.treeData) {
      lastProps.current = props;
      cacheTreeDebounceCallback(props, setCacheProps);
      return () => {
        cacheTreeDebounceCallback.cancel();
      };
    } else {
      lastProps.current = props;
      setCacheProps(props);
    }
  }, [props]);

  return useMemo(() => <Tree {...cacheProps} />, [cacheProps]);
}
