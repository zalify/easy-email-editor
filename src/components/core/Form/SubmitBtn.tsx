import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { useFormikContext } from 'formik';
import React from 'react';

export interface SubmitBtnProps extends ButtonProps {
  children: React.ReactNode;
}
export function SubmitBtn(props: SubmitBtnProps) {
  const { children } = props;
  const { handleSubmit } = useFormikContext();

  return (
    <Button onClick={() => handleSubmit()}>{children}</Button>
  );
}