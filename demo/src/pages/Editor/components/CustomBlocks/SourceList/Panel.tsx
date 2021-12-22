import { Collapse } from '@arco-design/web-react';
import { useBlock, useEditorProps, useFocusIdx } from 'easy-email-editor';
import {
  AttributesPanelWrapper,
  getContextMergeTags,
  NumberField,
  TreeSelectField,
} from 'easy-email-extensions';
import React, { useCallback, useMemo } from 'react';
import { isObject, set } from 'lodash';
import { getParentIdx } from 'easy-email-core';

export function Panel() {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, values } = useBlock();

  const { mergeTags } = useEditorProps();

  const filterMergeTags = useMemo(() => {
    const data: { [key: string]: any; } = {};
    const loop = (obj: { [key: string]: any; }, prefix: string) => {
      Object.keys(obj).forEach((key) => {
        const currentKey = prefix ? prefix + '.' + key : key;
        if (Array.isArray(obj[key])) {
          set(data, currentKey, obj[key]);
        } else if (isObject(obj[key])) {
          loop(obj[key], currentKey);
        }
      });
    };
    const contextMergeTags = getContextMergeTags(
      mergeTags,
      values,
      getParentIdx(focusIdx)! // ignore current
    );

    loop(contextMergeTags, '');
    return data;
  }, [mergeTags, focusIdx, values]);

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
      parent: { [key: string]: any; children?: any[]; },
      mapData: Array<any> = []
    ) => {
      const currentMapData = {
        key: key,
        value: key,
        title: title,
        children: [],
      };

      mapData.push(currentMapData);
      const current = parent[key];
      if (!Array.isArray(current) && isObject(current)) {
        Object.keys(current).map((childKey) =>
          deep(key + '.' + childKey, childKey, current, currentMapData.children)
        );
      }
    };

    Object.keys(filterMergeTags).map((key) =>
      deep(key, key, filterMergeTags, treeData)
    );
    return treeData;
  }, [filterMergeTags]);

  const onChangeAdapter = useCallback((selected: string) => {
    return `{{${selected.replace(/{{([^}}]+)}}/g, '$1') + '.0'}}}`;
  }, []);

  const valueAdapter = useCallback((value: string) => {
    return value.replace(/\.0/, '');
  }, []);

  const tag =
    focusBlock?.data.value.dataSource &&
    Object.keys(focusBlock?.data.value.dataSource)[0];

  if (!tag) return <></>;

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapse defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item name='0' header='Setting'>
          <TreeSelectField
            placeholder={'Select data source'}
            treeData={treeOptions}
            label='Data source'
            name={`${focusIdx}.data.value.dataSource.${tag}`}
            onChangeAdapter={onChangeAdapter}
            valueAdapter={valueAdapter}
          />
          <NumberField
            inline
            label='Max size'
            name={`${focusIdx}.data.value.maxSize`}
          />
          <NumberField
            inline
            label='Mock size'
            name={`${focusIdx}.data.value.mockSize`}
          />
        </Collapse.Item>
      </Collapse>
    </AttributesPanelWrapper>
  );
}
