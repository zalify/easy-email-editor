import React, { useCallback, useEffect, useMemo } from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx, Stack, useBlock, TextStyle, IconFont } from 'easy-email-editor';
import { createBlockDataByType } from 'easy-email-core';
import { Form, useFormState } from 'react-final-form';
import { Button, Grid, Space, Tooltip } from '@arco-design/web-react';
import { get } from 'lodash';
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

  const onChancePadding = useCallback(
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
            <Stack
              vertical
              spacing='extraTight'
            >
              <Space align='center'>
                <TextStyle variation='strong'>{title}</TextStyle>
                {showResetAll && (
                  <Tooltip content='Remove all padding'>
                    <Button
                      onClick={onResetPadding}
                      size='mini'
                      icon={(
                        <IconFont
                          iconName='icon-remove'
                          size={12}
                        />
                      )}
                    />
                  </Tooltip>
                )}
              </Space>

              <Grid.Row>
                <Grid.Col span={11}>
                  <InputWithUnitField
                    label={t('Top (px)')}
                    name='top'
                    autoComplete='off'
                    config={pixelAdapter}
                  />
                </Grid.Col>
                <Grid.Col
                  offset={1}
                  span={11}
                >
                  <InputWithUnitField
                    label={t('Left (px)')}
                    name='left'
                    autoComplete='off'
                    config={pixelAdapter}
                  />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Grid.Col span={11}>
                  <InputWithUnitField
                    label={t('Bottom (px)')}
                    name='bottom'
                    config={pixelAdapter}
                    autoComplete='off'
                  />
                </Grid.Col>
                <Grid.Col
                  offset={1}
                  span={11}
                >
                  <InputWithUnitField
                    label={t('Right (px)')}
                    name='right'
                    autoComplete='off'
                    config={pixelAdapter}
                  />
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
