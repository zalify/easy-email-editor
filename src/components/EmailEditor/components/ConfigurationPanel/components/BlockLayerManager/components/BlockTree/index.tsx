import { ReactSortable, ReactSortableProps } from 'react-sortablejs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import { TreeCollapse } from './components/TreeCollapse';
import { classnames } from '@/utils/classnames';
import { IconFont } from '@/components/IconFont';
import { BlockTreeItem, DATA_ATTRIBUTE_ID, DATA_ATTRIBUTE_INDEX, TreeNode } from './components/BlockTreeItem';

export interface BlockTreeProps<T extends TreeNode<T>> {
  treeData: T[];
  renderTitle: (data: T) => React.ReactNode;
  defaultExpandAll?: boolean;
  allowDrop: (params: { dragNode: T; dropNode: T; event: DragEvent; dragIndex: number; dropIndex: number; willInsertAfter: boolean; }) => boolean;
}

const getCurrenTreeNode = (
  ele: HTMLElement,
  rootEle?: HTMLElement
): HTMLElement | null => {
  if (ele.classList.contains(styles.treeNode)) return ele;
  if (ele.parentElement && rootEle && rootEle.contains(ele.parentElement))
    return getCurrenTreeNode(ele.parentElement, rootEle);
  return null;
};

export function BlockTree<T extends TreeNode<T>>(props: BlockTreeProps<T>) {
  const [eleRef, setEleRef] = useState<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = useState('');

  const { treeData, allowDrop } = props;

  const treeDataMap = useMemo(() => {

    const map: { [key: string]: T; } = {};

    const loop = (node: T) => {
      if (map[node.id]) {
        console.warn(`have same id ${node.id}`);
      }

      map[node.id] = node;
      if (node.children) {
        node.children.forEach(item => {
          loop(item);
        });
      }
    };

    treeData.forEach(item => {
      loop(item);
    });

    return map;

  }, [treeData]);

  useEffect(() => {
    if (!eleRef) return;

    const onClick = (ev: MouseEvent) => {
      if (ev.target instanceof HTMLElement) {
        const treeNode = getCurrenTreeNode(ev.target, eleRef);
        if (treeNode) {
          setSelectedId(treeNode.getAttribute(DATA_ATTRIBUTE_ID)!);
        }
      }
    };

    eleRef.addEventListener('click', onClick);
    return () => {
      eleRef.removeEventListener('click', onClick);
    };
  }, [eleRef]);

  useEffect(() => {
    if (!eleRef) return;
    if (selectedId) {
      const node = eleRef.querySelector('.' + styles.treeNodeSelected);
      if (node) {
        node.classList.remove(styles.treeNodeSelected);
      }
      const selectedNode = eleRef.querySelector(
        `[${DATA_ATTRIBUTE_ID}="${selectedId}"]`
      );
      if (selectedNode) {
        selectedNode.classList.add(styles.treeNodeSelected);
      }
    }
  }, [eleRef, selectedId]);

  const onDragStart: ReactSortableProps<T>['onStart'] = useCallback(
    (evt, sortable, store) => {
      console.log('onDragStart',);
    },
    []
  );

  const onDragMove: ReactSortableProps<T>['onMove'] = useCallback(
    (
      evt: {
        dragged: HTMLElement;
        related: HTMLElement;
        willInsertAfter: boolean;
      },
      originalEvent,
    ) => {
      console.log('---move');

      const dragEle = getCurrenTreeNode(evt.dragged);
      const dropEle = getCurrenTreeNode(evt.related);
      if (dropEle && dragEle) {
        const dragId = dragEle.getAttribute(DATA_ATTRIBUTE_ID)!;
        const dragIndex = dragEle.getAttribute(DATA_ATTRIBUTE_INDEX)!;
        const dropId = dropEle.getAttribute(DATA_ATTRIBUTE_ID)!;
        const dropIndex = dropEle.getAttribute(DATA_ATTRIBUTE_INDEX)!;
        return allowDrop({
          dragNode: treeDataMap[dragId],
          dragIndex: Number(dragIndex),
          dropIndex: Number(dropIndex),
          dropNode: treeDataMap[dropId],
          willInsertAfter: evt.willInsertAfter,
          event: originalEvent
        });
      }

      return false;
    },
    [allowDrop, treeDataMap]
  );

  const onDragEnd: ReactSortableProps<T>['onEnd'] = useCallback(
    (evt: {
      originalEvent: { dataTransfer: DataTransfer; };
      from: HTMLElement;
      to: HTMLElement;
      newIndex: number;
      oldIndex: number;
    }) => {
      console.log('onDragStart',
        evt.from, evt.to, evt.newIndex, evt.oldIndex);
    },
    []
  );

  return (
    <div ref={setEleRef} className={styles.tree}>
      {
        props.treeData.map(item => (
          <ul key={item.id} className={styles.treeNodeList}>
            <BlockTreeItem<T>
              nodeData={item}
              renderTitle={props.renderTitle}
              indent={0}
              index={0}
              defaultExpandAll={Boolean(props.defaultExpandAll)}
              onDragStart={onDragStart}
              onDragMove={onDragMove}
              onDragEnd={onDragEnd}
            />
          </ul>
        ))
      }

    </div>
  );
}
