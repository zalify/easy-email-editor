/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useMemo } from 'react';
import { Stack } from 'easy-email-editor';
import { Padding } from './Padding';

export function NavbarLinkPadding({ name }: { name: string; }) {
  return useMemo(() => {
    return (
      <Stack vertical spacing='extraTight'>
        <Padding name={name} />
      </Stack>
    );
  }, [name]);
}
