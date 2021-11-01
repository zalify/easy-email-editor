import { ReactSortable, ReactSortableProps } from 'react-sortablejs';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { TreeCollapse } from './components/TreeCollapse';
import { classnames } from '@/utils/classnames';
import { IconFont } from '@/components/IconFont';

interface Node {
  children?: Node[];
}

interface BlockTreeProps<T extends Node> {
  data: T;
  getId: (index: number, parentId: string, data: T) => string;
  renderTitle: (data: T) => React.ReactNode;
  defaultExpandAll?: boolean;
  allowDrop: (params: { dragNode; dropNode; event }) => boolean;
}

const getCurrenTreeNode = (
  ele: HTMLElement,
  rootEle: HTMLElement
): HTMLElement | null => {
  if (ele.classList.contains(styles.treeNode)) return ele;
  if (ele.parentElement && rootEle.contains(ele.parentElement))
    return getCurrenTreeNode(ele.parentElement, rootEle);
  return null;
};

export function BlockTree<T>(props: BlockTreeProps<T>) {
  const [eleRef, setEleRef] = useState<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = useState('');
  // const [dnd, setDnd] = useState()

  useEffect(() => {
    if (!eleRef) return;

    const onClick = (ev: MouseEvent) => {
      if (ev.target instanceof HTMLElement) {
        const treeNode = getCurrenTreeNode(ev.target, eleRef);
        if (treeNode) {
          setSelectedId(treeNode.getAttribute('data-tree-node-id')!);
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
        `[data-tree-node-id="${selectedId}"]`
      );
      if (selectedNode) {
        selectedNode.classList.add(styles.treeNodeSelected);
      }
    }
  }, [eleRef, selectedId]);

  return (
    <div ref={setEleRef} className={styles.tree}>
      <ul className={styles.treeNodeList}>
        <BlockTreeItem<T>
          data={props.data}
          renderTitle={props.renderTitle}
          getId={props.getId}
          parentId=''
          indent={0}
          index={0}
          allowDrop={props.allowDrop}
          defaultExpandAll={props.defaultExpandAll}
        />
      </ul>
    </div>
  );
}

function BlockTreeItem<T extends Node>(
  props: BlockTreeProps<T> & { parentId: string; indent: number; index: number }
) {
  const [expand, setExpand] = useState<boolean>(
    Boolean(props.defaultExpandAll)
  );
  const id = props.getId(props.index, props.parentId, props.data);

  const onDragStart: ReactSortableProps<T>['onStart'] = useCallback(
    (evt, sortable, store) => {
      console.log('onDragStart', props.data);
    },
    [props.data]
  );
  const onMove: ReactSortableProps<T>['onMove'] = useCallback(
    (
      evt: {
        dragged: HTMLElement;
        related: HTMLElement;
        willInsertAfter: boolean;
      },
      originalEvent,
      sortable,
      store
    ) => {
      const dragEle = evt.dragged;
      const dropEle = evt.related;
      console.log('onMove', props.data);
      return true;
    },
    [props.data]
  );

  return (
    <li className={styles.treeNodeWrapper}>
      <div className={styles.treeNodeContentWrapper}>
        <ReactSortable
          revertOnSpill
          list={[{ id: id }]}
          setList={() => {}}
          onMove={onMove}
          // onEnd={onDragEnd}
          // onSpill={onSpill}
          // onChoose={onChoose}
          onStart={onDragStart}
          {...{
            animation: 150,
            fallbackOnBody: true,
            swapThreshold: 0.65,
            ghostClass: 'ghost',
            group: 'shared',
          }}
        >
          <div className={classnames(styles.treeNode)} data-tree-node-id={id}>
            <div style={{ width: props.indent * 18 }} />
            <TreeCollapse expand={expand} setExpand={setExpand} />
            <div className={styles.treeNodeTitle}>
              {props.renderTitle(props.data)}
            </div>
            <IconFont
              iconName='icon-drag'
              style={{ cursor: 'grab', fontSize: 12 }}
            />
          </div>
        </ReactSortable>
      </div>

      <ul
        style={{ maxHeight: expand ? undefined : 0, overflow: 'hidden' }}
        className={styles.treeNodeList}
      >
        {props.data.children?.map((item, index) => {
          return (
            <BlockTreeItem<T>
              key={index}
              index={index}
              parentId={id}
              data={item as T}
              renderTitle={props.renderTitle}
              getId={props.getId}
              indent={props.indent + 1}
              defaultExpandAll={props.defaultExpandAll}
            />
          );
        })}
      </ul>
    </li>
  );
}
