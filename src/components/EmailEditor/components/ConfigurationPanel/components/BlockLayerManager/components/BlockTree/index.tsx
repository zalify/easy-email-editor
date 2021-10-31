
import { Stack } from '@/components/UI/Stack';
import { ReactSortable } from 'react-sortablejs';
import { IBlockData } from '@/typings';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { TreeCollapse } from './components/TreeCollapse';
import { classnames } from '@/utils/classnames';

interface BlockTreeProps {
  data: IBlockData;
  getId: (index: number, parentId: string, data: IBlockData) => string;
  renderTitle: (data: IBlockData) => React.ReactNode;
  defaultExpandAll?: boolean;
}

const getCurrenTreeNode = (ele: HTMLElement, rootEle: HTMLElement): HTMLElement | null => {
  if (ele.classList.contains(styles.treeNode)) return ele;
  if (ele.parentElement && rootEle.contains(ele.parentElement)) return getCurrenTreeNode(ele.parentElement, rootEle);
  return null;
};

export const BlockTree: React.FC<BlockTreeProps> = (props) => {

  const [eleRef, setEleRef] = useState<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = useState('');

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
      const selectedNode = eleRef.querySelector(`[data-tree-node-id="${selectedId}"]`);
      if (selectedNode) {
        selectedNode.classList.add(styles.treeNodeSelected);
      }
    }
  }, [eleRef, selectedId]);

  return (
    <div ref={setEleRef} className={styles.tree}>
      <ul className={styles.treeNodeList}>
        <BlockTreeItem
          data={props.data}
          renderTitle={props.renderTitle}
          getId={props.getId} parentId=""
          indent={1}
          index={0}
          defaultExpandAll={props.defaultExpandAll}
        />
      </ul>
    </div>
  );
};

const BlockTreeItem: React.FC<BlockTreeProps & { parentId: string; indent: number; index: number; }> = (props) => {
  const [expand, setExpand] = useState<boolean>(Boolean(props.defaultExpandAll));
  const id = props.getId(props.index, props.parentId, props.data);
  return (

    <li className={styles.treeNodeWrapper}>

      <ReactSortable
        revertOnSpill
        list={[{ id: id }]}
        setList={() => { }}
        // onMove={onMove}
        // onEnd={onDragEnd}
        // onSpill={onSpill}
        // onChoose={onChoose}
        // onStart={onDragStart}
        {...{
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 0.65,
          ghostClass: 'ghost',
          group: 'shared',
        }}
      >

        <div className={classnames(styles.treeNode)} data-tree-node-id={id}>
          <div style={{ width: props.indent * 18, }} />
          <TreeCollapse expand={expand} setExpand={setExpand} />
          <div className={styles.treeNodeTitle}>
            {props.renderTitle(props.data)}
          </div>
        </div>
      </ReactSortable>
      <ul style={{ maxHeight: expand ? undefined : 0, overflow: 'hidden', }} className={styles.treeNodeList}>
        {
          props.data.children.map((item, index) => {
            return (
              <BlockTreeItem
                key={index}
                index={index}
                parentId={id}
                data={item}
                renderTitle={props.renderTitle}
                getId={props.getId}
                indent={props.indent + 1}
                defaultExpandAll={props.defaultExpandAll}
              />
            );
          })
        }
      </ul>
    </li>
  );
};;