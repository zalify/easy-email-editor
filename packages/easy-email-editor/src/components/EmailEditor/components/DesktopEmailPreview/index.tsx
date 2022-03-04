
import React from 'react';
import { useActiveTab } from '@/hooks/useActiveTab';
import { PreviewEmail } from '../PreviewEmail';
import { ActiveTabKeys } from '@/components/Provider/BlocksProvider';

export function DesktopEmailPreview() {
  const { activeTab } = useActiveTab();
  return (
    <div
      style={{
        height: '100%',

      }}
    >
      <PreviewEmail
        isActive={activeTab === ActiveTabKeys.PC}
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 40,
          paddingBottom: 140,
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}
