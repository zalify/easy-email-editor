import React, { useCallback, useMemo } from 'react';
import { Tree, TreeSelect } from '@arco-design/web-react';
import { isObject } from 'lodash';
import { useBlock, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { getContextMergeTags } from '@extensions/utils/getContextMergeTags';

export const MergeTags: React.FC<{
  onChange: (v: string) => void;
  value: string;
  isSelect?: boolean;
}> = React.memo((props) => {
  const { focusIdx } = useFocusIdx();
  const {
    mergeTags = {},
    mergeTagGenerate = (m: string) => `{{${m}}}`,
    renderMergeTagContent,
  } = useEditorProps();
  const { values } = useBlock();

  const contextMergeTags = useMemo(
    () => getContextMergeTags(mergeTags, values, focusIdx),
    [mergeTags, values, focusIdx]
  );

  const treeOptions = useMemo(() => {
    const treeData: Array<{
      key: any;
      value: any;
      title: string;
      children: never[];
    }> = [];
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
        disabled: isObject(parent[key]) || !parent[title],
        children: [],
      };

      mapData.push(currentMapData);
      const current = parent[title];
      if (current && typeof current === 'object') {
        Object.keys(current).map((childKey) =>
          deep(key + '.' + childKey, childKey, current, currentMapData.children)
        );
      }
    };

    Object.keys(contextMergeTags).map((key) =>
      deep(key, key, contextMergeTags, treeData)
    );
    return treeData;
  }, [contextMergeTags]);

  const onSelect = useCallback(
    (value: string) => {
      return props.onChange(value);
    },
    [props]
  );

  const mergeTagContent = useMemo(
    () =>
      renderMergeTagContent({
        onChange: props.onChange,
        isSelect: props.isSelect,
      }),
    [renderMergeTagContent, props.onChange, props.isSelect]
  );

  if (renderMergeTagContent) {
    return mergeTagContent;
  }

  return (
    <div style={{ color: '#333' }}>
      {props.isSelect ? (
        <TreeSelect
          value={props.value}
          size='small'
          dropdownMenuStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder='Please select'
          treeData={treeOptions}
          onChange={(val) => onSelect(val)}
        />
      ) : (
        <Tree
          defaultExpandedKeys={[]}
          selectedKeys={[]}
          treeData={treeOptions}
          onSelect={(vals: any[]) => onSelect(vals[0])}
        />
      )}
    </div>
  );
});
