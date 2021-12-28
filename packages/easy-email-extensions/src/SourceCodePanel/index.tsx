import { Collapse, Input, Message } from '@arco-design/web-react';
import {
  BasicType,
  BlockManager,
  getPageIdx,
  getParentByIdx,
  IBlockData,
  JsonToMjml,
  MjmlToJson,
} from 'easy-email-core';
import {
  useBlock,
  useFocusIdx,
  useEditorContext,
  useEditorProps,
} from 'easy-email-editor';
import { cloneDeep } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

export function SourceCodePanel() {
  const { setValueByIdx, focusBlock, values } = useBlock();
  const { focusIdx } = useFocusIdx();

  const [mjmlText, setMjmlText] = useState('');
  const { pageData } = useEditorContext();
  const { mergeTags } = useEditorProps();

  const code = useMemo(() => {
    if (!focusBlock) return '';
    return JSON.stringify(focusBlock, null, 2) || '';
  }, [focusBlock]);

  const onChangeCode = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      try {
        const parseValue = JSON.parse(
          JSON.stringify(eval('(' + event.target.value + ')'))
        ) as IBlockData;

        const block = BlockManager.getBlockByType(parseValue.type);
        if (!block) {
          throw new Error('Invalid content');
        }
        if (
          !parseValue.data ||
          !parseValue.data.value ||
          !parseValue.attributes ||
          !Array.isArray(parseValue.children)
        ) {
          throw new Error('Invalid content');
        }
        setValueByIdx(focusIdx, parseValue);
      } catch (error: any) {
        Message.error(error?.message || error);
      }
    },
    [focusIdx, setValueByIdx]
  );

  const onMjmlChange = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      try {
        const parseValue = MjmlToJson(event.target.value);
        if (parseValue.type !== BasicType.PAGE) {
          const parentBlock = getParentByIdx(values, focusIdx)!;
          const parseBlock = BlockManager.getBlockByType(parseValue.type);

          if (!parseBlock?.validParentType.includes(parentBlock?.type)) {
            throw new Error('Invalid content');
          }
        } else if (focusIdx !== getPageIdx()) {
          throw new Error('Invalid content');
        }

        setValueByIdx(focusIdx, parseValue);
      } catch (error) {
        Message.error('Invalid content');
      }
    },
    [focusIdx, setValueByIdx, values]
  );

  const onChangeMjmlText = useCallback((value: string) => {
    setMjmlText(value);
  }, []);

  useEffect(() => {
    focusBlock &&
      setMjmlText(
        JsonToMjml({
          idx: focusIdx,
          data: focusBlock,
          context: pageData,
          mode: 'production',
          dataSource: cloneDeep(mergeTags),
        })
      );
  }, [focusBlock, focusIdx, pageData, mergeTags]);

  if (!focusBlock) return null;

  return (
    <Collapse>
      <Collapse.Item
        name='json'
        header='Json source'
        contentStyle={{ padding: '8px 13px' }}
      >
        <Input.TextArea
          key={code}
          defaultValue={code}
          autoSize={{ maxRows: 25 }}
          onBlur={onChangeCode}
        />
      </Collapse.Item>
      <Collapse.Item
        name='mjml'
        header='MJML source'
        contentStyle={{ padding: '8px 13px' }}
      >
        <Input.TextArea
          key={code}
          value={mjmlText}
          autoSize={{ maxRows: 25 }}
          onChange={onChangeMjmlText}
          onBlur={onMjmlChange}
        />
      </Collapse.Item>
    </Collapse>
  );
}
