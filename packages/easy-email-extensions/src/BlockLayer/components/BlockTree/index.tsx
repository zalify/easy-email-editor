import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Tree } from '@arco-design/web-react';
import { DATA_ATTRIBUTE_ID } from 'easy-email-editor';
import {
  AllowDrop,
  NodeInstance,
  TreeProps,
} from '@arco-design/web-react/es/Tree/interface';
import { debounce } from 'lodash';
import { transparentImage } from './transparentImage';

interface TreeNode<T> {
  id: string;
  children?: T[];
}

export interface BlockTreeProps<T extends TreeNode<T>> {
  treeData: T[];
  selectedId?: string;
  onSelect: (selectedId: string) => void;
  onContextMenu?: (nodeData: T, ev: React.MouseEvent) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onMouseLeave?: () => void;
  onMouseEnter?: (id: string) => void;
  renderTitle: (data: T) => React.ReactNode;
  defaultExpandAll?: boolean;
  allowDrop: (o: {
    dragNode: { dataRef: T; parent: T; key: string; parentKey: string };
    dropNode: { dataRef: T; parent: T; key: string; parentKey: string };
    dropPosition: number;
  }) => boolean;

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

export function BlockTree<T extends TreeNode<T>>(props: BlockTreeProps<T>) {
  const [blockTreeRef, setBlockTreeRef] = useState<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = useState(props.selectedId);
  const dragNode = useRef<{
    dataRef: T;
    parent: T;
    key: string;
    parentKey: string;
  } | null>(null);

  const { treeData, allowDrop, onContextMenu } = props;

  useEffect(() => {
    setSelectedId(props.selectedId);
  }, [props.selectedId]);

  useEffect(() => {
    if (!blockTreeRef) return;
    if (selectedId) {
      // after dom updated
      setTimeout(() => {
        const selectedNode = blockTreeRef.querySelector(
          `[${DATA_ATTRIBUTE_ID}="${selectedId}"]`
        );
        if (selectedNode) {
          selectedNode.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
          });
        }
      }, 50);
    }
  }, [blockTreeRef, selectedId]);

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
      props.onDragStart?.();
    },
    [props.onDragStart]
  );

  const onDragMove: AllowDrop = useCallback(
    (option) => {
      if (!dragNode.current) return false;
      const dropData = (option.dropNode.props as any).dataRef as T;
      const dropId = option.dropNode.props._key!;
      const currentDropData: Parameters<BlockTreeProps<T>['allowDrop']>[0] = {
        dragNode: dragNode.current,
        dropNode: {
          dataRef: dropData,
          parent: (option.dropNode.props as any).parent,
          key: dropId,
          parentKey: option.dropNode.props.parentKey as string,
        },
        dropPosition: option.dropPosition,
      };
      const isAllowDrop = allowDrop(currentDropData);

      if (isAllowDrop) {
        return true;
      }

      return false;
    },
    [dragNode]
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
      props.onDrop(currentDropData);
    },
    []
  );

  const renderTitle: TreeProps['renderTitle'] = useCallback(
    (nodeData) => {
      return (
        <div
          {...{ [DATA_ATTRIBUTE_ID]: nodeData.id }}
          data-tree-idx={nodeData.id}
          style={{ display: 'inline-flex', width: '100%' }}
          onContextMenu={(ev) => onContextMenu && onContextMenu(nodeData, ev)}
        >
          {props.renderTitle(nodeData)}
        </div>
      );
    },
    [onContextMenu]
  );

  const onDragEnd = useCallback(() => {
    dragNode.current = null;
    props.onDragEnd?.();
  }, [props.onDragEnd]);

  const onSelect: TreeProps['onSelect'] = useCallback(
    (selectedKeys) => {
      props.onSelect(selectedKeys[0]);
    },
    [props.onSelect]
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

  const selectedKeys = useMemo(
    () => (selectedId ? [selectedId] : []),
    [selectedId]
  );

  return (
    <div ref={setBlockTreeRef} onMouseLeave={props.onMouseLeave}>
      <CacheTree
        selectedKeys={selectedKeys}
        draggable
        size='small'
        treeData={treeData}
        blockNode
        fieldNames={{
          key: 'id',
        }}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDrop={onDrop}
        allowDrop={onDragMove}
        onSelect={onSelect}
        renderTitle={renderTitle}
      />
    </div>
  );
}

function CacheTree(props: TreeProps) {
  const [cacheProps, setCacheProps] = useState(props);

  const debounceCallback = useCallback(
    debounce((data) => {
      setCacheProps(data);
    }, 300),
    []
  );

  useEffect(() => {
    debounceCallback(props);
  }, [props]);

  return useMemo(() => <Tree {...cacheProps} />, [cacheProps]);
}
