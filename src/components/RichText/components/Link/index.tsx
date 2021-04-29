/* eslint-disable react/jsx-wrap-multilines */
import { Button, Tooltip } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import { LinkOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import { Stack } from '@/components/Stack';
import { SearchField, SwitchField } from '@/components/core/Form';

import * as Yup from 'yup';

const schema = Yup.object().shape({
  link: Yup.string().url().required(),
});
export interface LinkParams {
  link: string;
  blank: boolean;
  underline: boolean;
  linkNode: HTMLAnchorElement | null;
}
export function Link(props: {
  currentRange: Range | null | undefined;
  onChange: (val: LinkParams) => void;
}) {
  const initialValues = useMemo((): LinkParams => {
    let link = '';
    let blank = true;
    let underline = false;
    let linkNode = null;

    if (
      props.currentRange &&
      props.currentRange.startContainer === props.currentRange.endContainer
    ) {
      linkNode =
        props.currentRange.startContainer instanceof HTMLAnchorElement
          ? props.currentRange.startContainer
          : props.currentRange.startContainer.nodeType === 3 &&
            props.currentRange.startContainer.parentNode instanceof
              HTMLAnchorElement &&
            Number(
              props.currentRange.startContainer.parentNode.textContent?.length
            ) ===
              props.currentRange.endOffset - props.currentRange.startOffset
          ? props.currentRange.startContainer.parentNode
          : null;
      if (linkNode) {
        link = linkNode.href;
        blank = linkNode.getAttribute('target') === '_blank';
        underline = linkNode.style.textDecoration === 'underline';
      }
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
    <Formik
      enableReinitialize
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <Tooltip
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
                  lableHidden
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
            <Button size='small' icon={<LinkOutlined />} />
          </Tooltip>
        );
      }}
    </Formik>
  );
}
