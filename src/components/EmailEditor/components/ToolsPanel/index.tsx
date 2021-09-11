import { Stack } from '@/components/UI/Stack';
import React from 'react';
import { RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useBlock } from '@/hooks/useBlock';

export function ToolsPanel() {
  const { redo, undo, redoable, undoable, } = useBlock();

  return (
    <Stack>
      <Tooltip title='undo'>
        <Button disabled={!undoable} icon={<UndoOutlined onClick={undo} />} />
      </Tooltip>
      <Tooltip title='Redo'>
        <Button disabled={!redoable} icon={<RedoOutlined />} onClick={redo} />
      </Tooltip>
      <Stack.Item />
    </Stack>
  );
}
