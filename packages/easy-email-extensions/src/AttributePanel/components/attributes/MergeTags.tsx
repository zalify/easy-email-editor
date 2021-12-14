import React, { useCallback, useMemo } from 'react';
import { Tree, TreeSelect } from '@arco-design/web-react';
import { isObject } from 'lodash';
import { useEditorProps } from 'easy-email-editor';

export const MergeTags: React.FC<{
  onChange: (v: string) => void;
  value: string;
  isSelect?: boolean;
}> = React.memo((props) => {
  const { mergeTags = {}, mergeTagGenerate } = useEditorProps();

  const treeOptions = useMemo(() => {
    const treeData = [];
    const deep = (
      key: string,
      title: string,
      parent: { [key: string]: any; children?: any[] },
      mapData: Array<any> = []
    ) => {
      const currentMapData = {
        key: mergeTagGenerate(key),
        value: mergeTagGenerate(key),
        title: title,
        children: [],
      };

      mapData.push(currentMapData);
      const current = parent[key];
      if (isObject(current)) {
        Object.keys(current).map((childKey) =>
          deep(key + '.' + childKey, childKey, current, currentMapData.children)
        );
      }
    };

    Object.keys(mergeTags).map((key) => deep(key, key, mergeTags, treeData));
    return treeData;
  }, [mergeTags]);

  const onSelect = useCallback(
    (value: string) => {
      return props.onChange(value);
    },
    [props]
  );

  return (
    <div style={{ color: '#333' }}>
      {props.isSelect ? (
        <TreeSelect
          value={props.value}
          size='small'
          style={{ width: 120 }}
          dropdownMenuStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder='Please select'
          treeData={treeOptions}
          onChange={(val) => onSelect(val)}
        />
      ) : (
        <Tree
          style={{ width: 120 }}
          selectedKeys={[]}
          treeData={treeOptions}
          onSelect={(vals: any[]) => onSelect(vals[0])}
        />
      )}
    </div>
  );
});
