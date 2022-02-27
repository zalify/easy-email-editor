
import React from 'react';
import { useActiveTab } from '@/hooks/useActiveTab';
import { PreviewEmail } from '../PreviewEmail';

export function DesktopEmailPreview() {

  return (
    <div
      style={{
        height: '100%',

      }}
    >
      <PreviewEmail style={{
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 40,
        paddingBottom: 40,
        boxSizing: 'border-box',
      }}
      />
    </div>
  );
}
