import { IconFont } from '@/components/IconFont';
import { Button } from '@/components/UI/Button';
import { Stack } from '@/components/UI/Stack';
import { useBlock } from '@/hooks/useBlock';
import { ButtonGroup, InlineStack } from '@shopify/polaris';
import { UndoMajor, RedoMajor } from '@shopify/polaris-icons';
import React from 'react';

export function ToolsPanel() {
  const { redo, undo, redoable, undoable } = useBlock();

  // return (
  //   <InlineStack gap='100'>
  //     <Button
  //       title={t('undo')}
  //       disabled={!undoable}
  //       onClick={undo}
  //     >
  //       <IconFont
  //         iconName='icon-undo'
  //         style={{
  //           cursor: 'inherit',
  //           opacity: undoable ? 1 : 0.75,
  //         }}
  //       />
  //     </Button>

  //     <Button
  //       title={t('redo')}
  //       disabled={!redoable}
  //       onClick={redo}
  //     >
  //       <IconFont
  //         iconName='icon-redo'
  //         style={{
  //           cursor: 'inherit',
  //           opacity: redoable ? 1 : 0.75,
  //         }}
  //       />
  //     </Button>
  //     <Stack.Item />
  //   </InlineStack>
  // );

  return (
    <ButtonGroup variant='segmented'>
      <Button
        icon={UndoMajor}
        disabled={!undoable}
        onClick={undo}
      />
      <Button
        icon={RedoMajor}
        disabled={!redoable}
        onClick={redo}
      />
    </ButtonGroup>
  );
}
