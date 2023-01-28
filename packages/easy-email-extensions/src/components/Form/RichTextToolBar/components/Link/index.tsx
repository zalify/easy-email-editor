import { Grid, PopoverProps, Space, Tooltip } from '@arco-design/web-react';
import React, { useCallback, useMemo } from 'react';
import { Form } from 'react-final-form';
import { IconFont, Stack, TextStyle } from 'easy-email-editor';
import { SearchField, SwitchField } from '@extensions/components/Form';
import { ToolItem } from '../ToolItem';
import { EMAIL_BLOCK_CLASS_NAME } from 'easy-email-core';

export interface LinkParams {
  link: string;
  blank: boolean;
  underline: boolean;
  linkNode: HTMLAnchorElement | null;
}

export interface LinkProps extends PopoverProps {
  currentRange: Range | null | undefined;
  onChange: (val: LinkParams) => void;
}

function getAnchorElement(
  node: Node | null,
): HTMLAnchorElement | null {
  if (!node) return null;
  if (node instanceof HTMLAnchorElement) {
    return node;
  }
  if (node instanceof Element && node.classList.contains(EMAIL_BLOCK_CLASS_NAME)) return null;

  return getAnchorElement(node.parentNode);
}

function getLinkNode(
  currentRange: Range | null | undefined
): HTMLAnchorElement | null {
  let linkNode: HTMLAnchorElement | null = null;
  if (!currentRange) return null;
  linkNode = getAnchorElement(currentRange.startContainer);
  return linkNode;
}

export function Link(props: LinkProps) {

  const initialValues = useMemo((): LinkParams => {
    let link = '';
    let blank = true;
    let underline = true;
    let linkNode: HTMLAnchorElement | null = getLinkNode(props.currentRange);
    if (linkNode) {
      link = linkNode.getAttribute('href') || '';
      blank = linkNode.getAttribute('target') === '_blank';
      underline = linkNode.style.textDecoration === 'underline';
    }
    return {
      link,
      blank,
      underline,
      linkNode,
    };
  }, [props.currentRange]);

  const onSubmit = useCallback(
    (values: LinkParams) => {
      props.onChange(values);
    },
    [props]
  );

  return (
    <Form
      key={initialValues.link}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <Tooltip
            {...props}
            trigger='click'
            color='#fff'
            position='tl'
            content={(
              <div style={{ color: '#333' }}>
                <Stack vertical spacing='none'>
                  <SearchField
                    size='small'
                    name='link'
                    label={t('Link')}
                    labelHidden
                    searchButton={t('Apply')}
                    placeholder={t('https://www.example.com')}
                    onSearch={() => handleSubmit()}
                  />
                </Stack>
                <Grid.Row>
                  <Grid.Col span={12}>
                    <Space align='center' size='mini'>
                      <TextStyle size='smallest'>{t('Target')}</TextStyle>
                      <SwitchField
                        size='small'
                        label={t('Target')}
                        labelHidden
                        name='blank'
                        checkedText={t('blank')}
                        uncheckedText={t('self')}
                        inline
                      />
                    </Space>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Space align='center' size='mini'>
                      <TextStyle size='smallest'>{t('Underline')}</TextStyle>
                      <SwitchField
                        size='small'
                        label={t('Underline')}
                        labelHidden
                        name='underline'
                        checkedText={t('off')}
                        uncheckedText={t('on')}
                        inline
                      />
                    </Space>
                  </Grid.Col>
                </Grid.Row>
              </div>
            )}
          >
            <ToolItem isActive={Boolean(initialValues.link)} title={t('Link')} icon={<IconFont iconName='icon-link' />} />
          </Tooltip>
        );
      }}
    </Form>
  );
}
