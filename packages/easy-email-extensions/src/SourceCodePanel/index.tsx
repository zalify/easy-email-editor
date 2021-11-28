import { Collapse, Input, message } from 'antd';
import {
  BasicType,
  BlockManager,
  getPageIdx,
  getParentByIdx,
  IBlockData,
  JsonToMjml,
  MjmlToJson,
} from 'easy-email-core';
import { useBlock, useFocusIdx, useEditorContext } from 'easy-email-editor';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

export function SourceCodePanel() {
  const { setValueByIdx, focusBlock, values } = useBlock();
  const { focusIdx } = useFocusIdx();

  const [mjmlText, setMjmlText] = useState('');
  const { pageData } = useEditorContext();

  const code = useMemo(() => {
    if (!focusBlock) return '';
    return JSON.stringify(focusBlock, null, 2) || '';
  }, [focusBlock]);

  const onChaneCode = useCallback(
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
        message.error(error?.message || error);
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
        message.error('Invalid content');
      }
    },
    [focusIdx, setValueByIdx, values]
  );

  const onChangeMjmlText = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setMjmlText(event.target.value);
    },
    []
  );

  useEffect(() => {
    focusBlock &&
      setMjmlText(
        JsonToMjml({
          idx: focusIdx,
          data: focusBlock,
          context: pageData,
          mode: 'production',
        })
      );
  }, [focusBlock, focusIdx, pageData]);

  if (!focusBlock) return null;

  return (
    <Collapse>
      <Collapse.Panel key='json' header='Json source'>
        <Input.TextArea
          key={code}
          defaultValue={code}
          autoSize={{ maxRows: 25 }}
          onBlur={onChaneCode}
        />
      </Collapse.Panel>
      <Collapse.Panel key='mjml' header='MJML source'>
        <Input.TextArea
          key={code}
          value={mjmlText}
          autoSize={{ maxRows: 25 }}
          onChange={onChangeMjmlText}
          onBlur={onMjmlChange}
        />
      </Collapse.Panel>
    </Collapse>
  );
}
