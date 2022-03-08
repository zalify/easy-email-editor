import React, { useCallback, useEffect, useMemo } from 'react';
import { InputWithUnitField, TextField } from '../../../components/Form';
import { useFocusIdx, Stack, useBlock, TextStyle } from 'easy-email-editor';
import { createBlockDataByType } from 'easy-email-core';
import { Form, useFormState } from 'react-final-form';
import { Grid } from '@arco-design/web-react';
import { get } from 'lodash';

export interface PaddingProps {
  title?: string;
  attributeName?: 'padding' | 'inner-padding' | 'text-padding';
  name?: string;
}
export function Padding(props: PaddingProps = {}) {
  const { title = 'Padding', attributeName = 'padding', name } = props;
  const { focusBlock, change, values } = useBlock();
  const { focusIdx } = useFocusIdx();

  const type = focusBlock && focusBlock.type;

  const defaultConfig = useMemo(
    () => (type ? createBlockDataByType(type) : undefined),
    [type]
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

  const onChancePadding = useCallback(
    (val: string) => {
      if (name) {
        change(name, val);
      } else {
        change(focusIdx + `.attributes[${attributeName}]`, val);
      }

    },
    [name, change, focusIdx, attributeName]
  );

  return (
    <Form<{ top: string; right: string; left: string; bottom: string; }>
      initialValues={paddingFormValues}
      subscription={{ submitting: true, pristine: true }}
      enableReinitialize
      onSubmit={() => { }}
    >
      {() => {
        return (
          <>
            <Stack vertical spacing='extraTight'>
              <TextStyle variation='strong'>{title}</TextStyle>

              <Grid.Row>
                <Grid.Col span={11}>
                  <InputWithUnitField label='Top' name='top' />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <InputWithUnitField label='Left' name='left' />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Grid.Col span={11}>
                  <InputWithUnitField label='Bottom' name='bottom' />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <InputWithUnitField label='Right' name='right' />
                </Grid.Col>
              </Grid.Row>
            </Stack>
            <PaddingChangeWrapper onChange={onChancePadding} />
          </>
        );
      }}
    </Form>
  );
}

const PaddingChangeWrapper: React.FC<{ onChange: (val: string) => void; }> = (
  props
) => {
  const {
    values: { top, right, bottom, left },
  } = useFormState();
  const { onChange } = props;

  useEffect(() => {
    onChange([top, right, bottom, left].join(' '));
  }, [top, right, bottom, left, onChange]);

  return <></>;
};
