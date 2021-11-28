/* eslint-disable react/jsx-wrap-multilines */
import { Button, PopoverProps, Tooltip } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { Form } from 'react-final-form';
import { IconFont, Stack } from 'easy-email-editor';
import {
  SearchField,
  SwitchField,
} from '@extensions/components/Form';

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
  node: Node,
  matchLength: number
): HTMLAnchorElement | null {
  if (!node || !node.parentNode) return null;
  const isMatchLength =
    Number(node.parentNode?.textContent?.length) === matchLength;

  if (isMatchLength) {
    if (node.parentNode instanceof HTMLAnchorElement) {
      return node.parentNode;
    } else {
      return getAnchorElement(node.parentNode, matchLength);
    }
  }
  return null;
}

function getLinkNode(
  currentRange: Range | null | undefined
): HTMLAnchorElement | null {
  let linkNode: HTMLAnchorElement | null = null;
  if (
    currentRange &&
    currentRange.startContainer === currentRange.endContainer
  ) {
    if (currentRange.startContainer instanceof HTMLAnchorElement) {
      linkNode = currentRange.startContainer;
    } else {
      if (currentRange.startContainer.nodeType === 3) {
        linkNode = getAnchorElement(
          currentRange.startContainer,
          currentRange.endOffset - currentRange.startOffset
        );
      }
    }
  }
  return linkNode;
}

export function Link(props: LinkProps) {
  const initialValues = useMemo((): LinkParams => {
    let link = '';
    let blank = true;
    let underline = false;
    let linkNode: HTMLAnchorElement | null = getLinkNode(props.currentRange);
    if (linkNode) {
      link = linkNode.href;
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
            placement='topLeft'
            overlayInnerStyle={{ color: '#333', width: 300 }}
            title={
              <Stack vertical spacing='tight'>
                <Stack.Item />
                <SearchField
                  name='link'
                  label='Link'
                  labelHidden
                  enterButton='Apply'
                  placeholder='https://www.example.com'
                  onSearch={() => handleSubmit()}
                />
                <Stack>
                  <SwitchField
                    label='Target'
                    name='blank'
                    checkedChildren='blank'
                    unCheckedChildren='self'
                    inline
                  />
                  <SwitchField
                    label='Underline'
                    name='underline'
                    checkedChildren='off'
                    unCheckedChildren='on'
                    inline
                  />
                </Stack>
              </Stack>
            }
          >
            <Button
              title='Link'
              size='small'
              icon={<IconFont iconName='icon-link' />}
            />
          </Tooltip>
        );
      }}
    </Form>
  );
}
