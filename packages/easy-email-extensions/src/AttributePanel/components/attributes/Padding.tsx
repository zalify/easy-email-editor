import {
  Bleed,
  BlockStack,
  Button,
  InlineGrid,
  InlineStack,
  Text,
  Tooltip,
} from '@shopify/polaris';
import { CancelMinor } from '@shopify/polaris-icons';
import { createBlockDataByType } from 'easy-email-core';
import { useBlock, useFocusIdx } from 'easy-email-editor';
import { get } from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Form, useFormState } from 'react-final-form';
import { RangeSliderField } from '../../../components/Form';
import { pixelAdapter } from '../adapter';

export interface PaddingProps {
  title?: string;
  attributeName?: 'padding' | 'inner-padding' | 'text-padding';
  name?: string;
  showResetAll?: boolean;
}
export function Padding(props: PaddingProps = {}) {
  const { title = t('Padding'), attributeName = 'padding', name, showResetAll } = props;
  const { focusBlock, change, values } = useBlock();
  const { focusIdx } = useFocusIdx();

  const type = focusBlock && focusBlock.type;

  const defaultConfig = useMemo(
    () => (type ? createBlockDataByType(type) : undefined),
    [type],
  );

  const paddingValue: string | undefined = useMemo(() => {
    if (name) {
      return get(values, name);
    }
    return focusBlock?.attributes[attributeName];
  }, [attributeName, focusBlock?.attributes, name, values]);

  const defaultPaddingValue: string | undefined = useMemo(() => {
    if (name) {
      return null;
    }
    return defaultConfig?.attributes[attributeName];
  }, [attributeName, defaultConfig?.attributes, name]);

  const paddingFormValues = useMemo(() => {
    const paddingList = paddingValue?.split(' ');
    const defaultPaddingList = defaultPaddingValue?.split(' ');

    const top = paddingList ? paddingList[0] : defaultPaddingList?.[0] || '';
    const right = paddingList ? paddingList[1] : defaultPaddingList?.[1] || '';
    const bottom = paddingList ? paddingList[2] : defaultPaddingList?.[2] || '';
    const left = paddingList ? paddingList[3] : defaultPaddingList?.[3] || '';
    return {
      top,
      left,
      bottom,
      right,
    };
  }, [defaultPaddingValue, paddingValue]);

  const onChangePadding = useCallback(
    (val: string) => {
      if (name) {
        change(name, val);
      } else {
        change(focusIdx + `.attributes[${attributeName}]`, val);
      }
    },
    [name, change, focusIdx, attributeName],
  );
  const onResetPadding = useCallback(() => {
    if (name) {
      change(name, '0px 0px 0px 0px');
    } else {
      change(focusIdx + `.attributes[${attributeName}]`, '0px 0px 0px 0px');
    }
  }, [name, change, focusIdx, attributeName]);

  return (
    <Form<{ top: string; right: string; left: string; bottom: string }>
      initialValues={paddingFormValues}
      subscription={{ submitting: true, pristine: true }}
      enableReinitialize
      onSubmit={() => {}}
    >
      {() => {
        return (
          <>
            <BlockStack gap='100'>
              <InlineStack
                blockAlign='center'
                gap='100'
              >
                <Text
                  as='p'
                  variant='headingMd'
                >
                  {title}
                </Text>
                {showResetAll && (
                  <Tooltip content='Remove all padding'>
                    <Bleed marginBlockEnd='200'>
                      <Button
                        onClick={onResetPadding}
                        icon={CancelMinor}
                        variant='plain'
                      />
                    </Bleed>
                  </Tooltip>
                )}
              </InlineStack>
              <InlineGrid
                columns={2}
                gap='300'
              >
                <RangeSliderField
                  label='Top'
                  name='top'
                  autoComplete='off'
                  config={pixelAdapter}
                  suffix='px'
                  min={0}
                  max={200}
                  showTextField={false}
                />

                <RangeSliderField
                  label='Left'
                  name='left'
                  autoComplete='off'
                  config={pixelAdapter}
                  suffix='px'
                  min={0}
                  max={200}
                  showTextField={false}
                  output
                />

                <RangeSliderField
                  label='Bottom'
                  name='bottom'
                  config={pixelAdapter}
                  autoComplete='off'
                  suffix='px'
                  min={0}
                  max={200}
                  showTextField={false}
                  output
                />

                <RangeSliderField
                  label='Right'
                  name='right'
                  autoComplete='off'
                  config={pixelAdapter}
                  suffix='px'
                  min={0}
                  max={200}
                  showTextField={false}
                  output
                />
              </InlineGrid>
            </BlockStack>
            <PaddingChangeWrapper onChange={onChangePadding} />
          </>
        );
      }}
    </Form>
  );
}

const PaddingChangeWrapper: React.FC<{ onChange: (val: string) => void }> = props => {
  const {
    values: { top, right, bottom, left },
  } = useFormState();
  const { onChange } = props;

  useEffect(() => {
    onChange([top, right, bottom, left].join(' '));
  }, [top, right, bottom, left, onChange]);

  return <></>;
};
