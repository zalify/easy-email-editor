import { ReactSortable, ReactSortableProps } from 'react-sortablejs';
import React, { forwardRef, useCallback, useState } from 'react';
import { classnames } from '@/utils/classnames';
import { IconFont } from '@/components/IconFont';
import { TreeCollapse } from '../TreeCollapse';
import styles from '../../index.module.scss';

export const DATA_ATTRIBUTE_ID = 'data-tree-node-id';
export const DATA_ATTRIBUTE_INDEX = 'data-tree-node-index';

export interface TreeNode<T> {
  id: string;
  children?: T[];
}

export interface BlockTreeItemProps<T> {
  indent: number;
  index: number;
  nodeData: T;
  renderTitle: (data: T) => React.ReactNode;
  defaultExpandAll: boolean;
  onDragStart: ReactSortableProps<T>['onStart'];
  onDragMove: ReactSortableProps<T>['onMove'];
  onDragEnd: ReactSortableProps<T>['onEnd'];
  onSpill: ReactSortableProps<T>['onSpill'];
}

export function BlockTreeItem<T extends TreeNode<T>>(props: BlockTreeItemProps<T>) {
  const {
    nodeData,
    renderTitle,
    defaultExpandAll,
    onDragStart,
    onDragMove,
    onDragEnd,
    onSpill,
    indent,
    index,
  } = props;

  const [expand, setExpand] = useState<boolean>(Boolean(defaultExpandAll));

  const onStart: ReactSortableProps<T>['onStart'] = useCallback((evt, sortable, store) => {
    if (onDragStart) {
      onDragStart(evt, sortable, store);
    }
    setExpand(false);
  }, [onDragStart]);

  return (
    <li className={styles.treeNodeWrapper}>
      <ReactSortable
        revertOnSpill
        list={[{ id: nodeData.id }]}
        setList={() => { }}
        onMove={onDragMove}
        onEnd={onDragEnd}
        onStart={onStart}
        onSpill={onSpill}
        {...{
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 0.65,
          ghostClass: 'ghost',
          group: 'shared',
        }}
      >
        <div
          className={classnames(styles.treeNode)}
          {
          ...{
            [DATA_ATTRIBUTE_ID]: nodeData.id,
            [DATA_ATTRIBUTE_INDEX]: index,
          }
          }

        >
          <div style={{ width: indent * 18 }} />
          <TreeCollapse expand={expand} setExpand={setExpand} />
          <div className={styles.treeNodeTitle}>{renderTitle(nodeData)}</div>
          <IconFont
            iconName="icon-drag"
            style={{ cursor: 'grab', fontSize: 12 }}
          />
        </div>
      </ReactSortable>

      <ul
        style={{ maxHeight: expand ? undefined : 0, overflow: 'hidden' }}
        className={styles.treeNodeList}
      >
        {nodeData.children?.map((item, index) => {
          return (
            <BlockTreeItem<T>
              key={index}
              index={index}
              nodeData={item}
              renderTitle={renderTitle}
              indent={indent + 1}
              defaultExpandAll={defaultExpandAll}
              onDragStart={onDragStart}
              onDragMove={onDragMove}
              onDragEnd={onDragEnd}
              onSpill={onSpill}
            />
          );
        })}
      </ul>
    </li>
  );
}
