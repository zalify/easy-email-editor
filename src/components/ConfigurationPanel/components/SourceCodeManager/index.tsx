import { Collapse, Input, message } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getPageIdx, getValueByIdx } from '@/utils/block';
import jsonFormat from 'json-format';
import { useBlock } from '@/hooks/useBlock';
import { transformToMjml } from '@/utils/transformToMjml';
import mjml from 'mjml-browser';
import { MjmlToJson } from '@/utils/MjmlToJson';

export function SourceCodeManager() {
  const { focusIdx, setValueByIdx, values } = useBlock();
  const value = getValueByIdx(values, focusIdx);
  const isRoot = focusIdx === getPageIdx();
  const [mjmlText, setMjmlText] = useState('');

  const code = useMemo(() => {
    if (!value) return '';
    return (
      jsonFormat(value, {
        type: 'space',
        size: 2,
      }) || ''
    );
    return '';
  }, [value]);

  const onChaneCode = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {

      try {
        const parseValue = JSON.parse(event.target.value);
        setValueByIdx(focusIdx, parseValue);
      } catch (error) {
        message.error(error.message);
      }
    },
    [focusIdx, setValueByIdx]
  );

  const onMjmlChange = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      const { json, errors } = mjml(event.target.value, { validationLevel: 'soft' });
      // FIXME:
      if (errors.length > 0) {
        message.error('Parse error');
        console.log(errors);
        // return;
      }
      const parseValue = MjmlToJson(
        json
      );
      setValueByIdx(focusIdx, parseValue);
    },
    [focusIdx, setValueByIdx]
  );

  const onChangeMjmlText = useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!isRoot) {
      message.warning('Only page block can edit mjml source.');
    }
    setMjmlText(event.target.value);
  }, [isRoot]);

  useEffect(() => {
    value && setMjmlText(transformToMjml(value));
  }, [value]);

  if (!value) return null;

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
