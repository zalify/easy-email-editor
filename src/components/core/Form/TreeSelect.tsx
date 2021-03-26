
import { TreeSelectProps as AntdTreeSelectProps } from 'antd/lib/tree-select';
import { TreeSelect as AntdTreeSelect } from 'antd';
import { merge } from 'lodash';
import React from 'react';

interface TreeSelectOption { value: string; label: React.ReactNode; selectable?: boolean; options?: TreeSelectOption[]; }

export interface TreeSelectProps extends AntdTreeSelectProps<string> {
  options: TreeSelectOption[];
  onChange?: (val: string) => void;
  label: string;
  title?: string;
}
const TreeNode = AntdTreeSelect.TreeNode;

const renderTreeNode = (options?: TreeSelectOption[]) => {
  return (
    options?.map((item) => {
      return (
        <TreeNode selectable={item.selectable} key={item.value} value={item.value} title={item.label}>
          {
            item.options?.map(child => {
              return (
                <TreeNode selectable={child.selectable} key={child.value} value={child.value} title={child.label}>
                  { renderTreeNode(child.options)}
                </TreeNode>
              );
            })
          }
        </TreeNode>
      );
    })

  );
};

export function TreeSelect(props: TreeSelectProps) {

  return (

    <AntdTreeSelect {...props} style={merge({ width: '100%' }, props.style)} value={props.value} onChange={props.onChange}>

      <TreeNode selectable={false} value="" title={props.title || props.label}>
        {renderTreeNode(props.options)}
      </TreeNode>

    </AntdTreeSelect>
  );
}