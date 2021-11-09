import { ReactSortable, ReactSortableProps } from 'react-sortablejs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  onSelect: (id: string) => void;
  onMouseEnter?: (id: string, event: React.MouseEvent) => void;
  onContextMenu?: (nodeData: T, event: React.MouseEvent) => void;
  onDragStart: ReactSortableProps<T>['onStart'];
  onDragMove: ReactSortableProps<T>['onMove'];
  onDragEnd: ReactSortableProps<T>['onEnd'];
  onSpill: ReactSortableProps<T>['onSpill'];
}

export function BlockTreeItem<T extends TreeNode<T>>(
  props: BlockTreeItemProps<T>
) {
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
    onSelect: handleSelect,
    onMouseEnter: handleMouseEnter,
    onContextMenu: handleContextMenu,
  } = props;

  const [expand, setExpand] = useState<boolean>(Boolean(defaultExpandAll));
  const ulRef = useRef<HTMLUListElement | null>(null);
  const initedRef = useRef<boolean>(false);

  useEffect(() => {
    const ulEle = ulRef.current;
    if (!ulEle) return;
    if (!initedRef.current) {
      initedRef.current = true;
      if (!expand) {
        ulEle.style.setProperty('max-height', '0px');
      }
      return;
    }

    if (expand) {
      const onTransitionEnd = () => {
        ulEle.style.removeProperty('max-height');
        ulEle.removeEventListener('transitionend', onTransitionEnd);
      };
      ulEle.style.setProperty('transition', 'none');
      ulEle.style.removeProperty('max-height');
      const maxHeight = ulEle.getBoundingClientRect().height;
      ulEle.style.setProperty('max-height', '0px');
      ulEle.addEventListener('transitionend', onTransitionEnd);
      requestAnimationFrame(() => {
        ulEle.style.setProperty('transition', 'all .3s ease-out');
        ulEle.style.setProperty('max-height', maxHeight + 'px');
      });
    } else {
      ulEle.style.setProperty('transition', 'none');
      const maxHeight = ulEle.getBoundingClientRect().height;
      ulEle.style.setProperty('max-height', maxHeight + 'px');
      requestAnimationFrame(() => {
        ulEle.style.setProperty('transition', 'all .3s ease-out');
        ulEle.style.setProperty('max-height', '0px');
      });
    }
  }, [expand]);

  const onStart: ReactSortableProps<T>['onStart'] = useCallback(
    (evt, sortable, store) => {
      if (onDragStart) {
        onDragStart(evt, sortable, store);
      }
      setExpand(false);
    },
    [onDragStart]
  );

  const onSelect = useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      handleSelect(nodeData.id);
    },
    [nodeData.id, handleSelect]
  );

  const onMouseEnter = useCallback(
    (ev: React.MouseEvent) => {
      handleMouseEnter && handleMouseEnter(nodeData.id, ev);
    },
    [nodeData.id, handleMouseEnter]
  );

  const onContextMenu = useCallback(
    (ev: React.MouseEvent) => {
      handleContextMenu && handleContextMenu(nodeData, ev);
    },
    [handleContextMenu, nodeData]
  );

  return (
    <li className={styles.treeNodeWrapper}>
      <ReactSortable
        revertOnSpill
        list={[{ id: nodeData.id }]}
        setList={() => {}}
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
          onMouseEnter={onMouseEnter}
          onContextMenu={onContextMenu}
          className={classnames(styles.treeNode)}
          {...{
            [DATA_ATTRIBUTE_ID]: nodeData.id,
            [DATA_ATTRIBUTE_INDEX]: index,
          }}
        >
          <div style={{ width: indent * 18 }} />
          <TreeCollapse
            hasChildren={Boolean(nodeData.children?.length)}
            expand={expand}
            setExpand={setExpand}
          />
          <div className={styles.treeNodeTitle} onClick={onSelect}>
            {renderTitle(nodeData)}
          </div>
          <IconFont
            iconName='icon-drag'
            style={{ cursor: 'grab', fontSize: 12 }}
          />
        </div>
      </ReactSortable>

      <ul
        ref={ulRef}
        style={{ overflow: 'hidden' }}
        className={styles.treeNodeList}
      >
        {nodeData.children?.map((item, index) => {
          return (
            <BlockTreeItem<T>
              key={index}
              index={index}
              onSelect={handleSelect}
              onMouseEnter={handleMouseEnter}
              onContextMenu={handleContextMenu}
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
