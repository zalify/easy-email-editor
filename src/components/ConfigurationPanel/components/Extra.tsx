import { Stack } from '@/components/Stack';
import React from 'react';
import { Link } from './Link';
import { Variables } from './Variables';

export function Extra() {
  return (
    <div id='ConfigurationPanel-extra'>
      <Stack vertical>
        <Variables />
        <Link />
      </Stack>
    </div>
  );
}
