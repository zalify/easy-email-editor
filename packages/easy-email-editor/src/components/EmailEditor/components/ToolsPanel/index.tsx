import { Stack } from '@/components/UI/Stack';
import React from 'react';
import { useBlock } from '@/hooks/useBlock';
import { IconFont } from '@/components/IconFont';
import { Button } from '@/components/UI/Button';

export function ToolsPanel() {
  const { redo, undo, redoable, undoable } = useBlock();

  return (
    <Stack>
      <Button title='undo' disabled={!undoable} onClick={undo}>
        <IconFont
          iconName='icon-undo'
          style={{
            cursor: 'inherit',
            color: undoable ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.25)',
          }}
        />
      </Button>

      <Button title='redo' disabled={!redoable} onClick={redo}>
        <IconFont
          iconName='icon-redo'
          style={{
            cursor: 'inherit',
            color: redoable ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.25)',
          }}
        />
      </Button>
      <Stack.Item />
    </Stack>
  );
}
