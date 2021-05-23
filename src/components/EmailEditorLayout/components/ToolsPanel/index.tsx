import { Stack } from '@/components/Stack';
import React from 'react';
import { RedoOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Switch, Tooltip } from 'antd';
import { useBlock } from '@/hooks/useBlock';
import { getShadowRoot } from '@/utils/findBlockNodeByIdx';

export function ToolsPanel() {
  const { redo, undo, redoable, undoable, reset } = useBlock();

  const toggleEnableDrag = (checked: boolean) => {
    if (checked) {
      getShadowRoot().querySelectorAll('.email-block').forEach((child) => {
        child.setAttribute('draggable', 'true');
      });
    } else {
      getShadowRoot().querySelectorAll('.email-block').forEach((child) => {
        child.setAttribute('draggable', 'false');
      });
    }

  };

  return (
    <Stack>

      <Tooltip title="undo">
        <Switch
          checkedChildren={'Drag enabled'}
          unCheckedChildren={'Drag disabled'}
          onChange={checked => toggleEnableDrag(checked)}
        />
      </Tooltip>
      <Tooltip title="undo">
        <Button disabled={!undoable} icon={<UndoOutlined onClick={undo} />} />
      </Tooltip>
      <Tooltip title="Redo">
        <Button disabled={!redoable} icon={<RedoOutlined />} onClick={redo} />
      </Tooltip>
      <Tooltip title="Reset">
        <Button icon={<DeleteOutlined />} onClick={reset} />
      </Tooltip>
      <Stack.Item />
    </Stack>
  );
}