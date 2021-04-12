import { Collapse, Input, message } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { getValueByIdx } from '@/utils/block';
import jsonFormat from 'json-format';
import { useBlock } from '@/hooks/useBlock';
import { transformToMjml } from '@/utils/transformToMjml';
import mjml from 'mjml-browser';
import { MjmlToJson } from '@/utils/MjmlToJson';

export function SourceCodeManager() {

  const { focusIdx, setValueByIdx, values } = useBlock();
  const value = getValueByIdx(values, focusIdx);

  const code = useMemo(() => {
    if (!value) return '';
    return jsonFormat(value, {
      type: 'space',
      size: 2
    }) || '';
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
      try {
        const parseValue = MjmlToJson(mjml(event.target.value, { validationLevel: 'strict' }).json,);
        setValueByIdx(focusIdx, parseValue);
      } catch (error) {
        message.error(error.message);
      }
    },
    [focusIdx, setValueByIdx]
  );

  if (!value) return null;
  return (
    <Collapse>
      <Collapse.Panel key="json" header="Json source">
        <Input.TextArea
          key={code}
          defaultValue={code}
          autoSize={{ maxRows: 25 }}
          onBlur={onChaneCode}
        />

      </Collapse.Panel>
      <Collapse.Panel key="mjml" header="MJML source">
        <Input.TextArea
          key={code}
          value={transformToMjml(value)}
          autoSize={{ maxRows: 25 }}
          onChange={onMjmlChange}
        />
      </Collapse.Panel>

    </Collapse>
  );
}