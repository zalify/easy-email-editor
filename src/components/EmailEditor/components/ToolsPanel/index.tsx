import { Stack } from '@/components/UI/Stack';
import React, { useEffect, useState } from 'react';
import { RedoOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Switch, Tooltip } from 'antd';
import { useBlock } from '@/hooks/useBlock';
import { useDraggable } from '@/hooks/useDragable';

export function ToolsPanel() {
  const { redo, undo, redoable, undoable, reset, } = useBlock();
  const { dragEnabled, setDragEnabled } = useDraggable();

  return (
    <Stack>
      <Tooltip title='undo'>
        <Switch
          checkedChildren={'Drag enabled'}
          unCheckedChildren={'Drag disabled'}
          onChange={(checked) => setDragEnabled(checked)}
          checked={dragEnabled}
        />
      </Tooltip>
      <Tooltip title='undo'>
        <Button disabled={!undoable} icon={<UndoOutlined onClick={undo} />} />
      </Tooltip>
      <Tooltip title='Redo'>
        <Button disabled={!redoable} icon={<RedoOutlined />} onClick={redo} />
      </Tooltip>
      <Tooltip title='Reset'>
        <Button icon={<DeleteOutlined />} onClick={reset} />
      </Tooltip>
      <Stack.Item />
    </Stack>
  );
}
