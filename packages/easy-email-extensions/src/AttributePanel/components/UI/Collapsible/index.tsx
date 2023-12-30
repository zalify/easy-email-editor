import React from 'react';
import {
  BlockStack,
  Button,
  InlineStack,
  Text,
  Collapsible as PolarisCollapsible,
  Divider,
  Bleed,
} from '@shopify/polaris';
import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons';
import { useToggle } from 'react-use';

export type CollapsibleProps = {
  title: string;
  children: React.ReactNode;
};

const Collapsible = ({ title, children }: CollapsibleProps) => {
  const [value, toggle] = useToggle(true);

  return (
    <BlockStack gap='300'>
      <Bleed marginInline='500'>{/* <Divider /> */}</Bleed>
      <BlockStack gap='300'>
        <InlineStack align='space-between'>
          <Text
            as='p'
            variant='headingMd'
          >
            {title}
          </Text>
          <Button
            icon={value ? ChevronUpMinor : ChevronDownMinor}
            onClick={toggle}
            variant='plain'
          />
        </InlineStack>
        <PolarisCollapsible
          open={value}
          id='app-collapsible'
          transition={{ duration: '200ms', timingFunction: 'ease-in-out' }}
          expandOnPrint
        >
          {children}
        </PolarisCollapsible>
      </BlockStack>
      <Bleed marginInline='500'>
        <Divider />
      </Bleed>
    </BlockStack>
  );
};

export default Collapsible;
