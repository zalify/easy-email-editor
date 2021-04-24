import services from '@example/services';
import { Input as AntdInput, message } from 'antd';
import { InputProps as AntdInputProps } from 'antd/lib/input';
import React, { useCallback } from 'react';

export interface InputProps extends Omit<AntdInputProps, 'onChange'> {
  quickchange?: boolean;
  value: string;
  onChange: (val: string) => void;
}

export function Input(props: InputProps) {
  const { quickchange, value = '', onKeyDown: onPropsKeyDown } = props;

  const onChange = useCallback((val: string) => {
    props.onChange(val);
  }, [props]);

  const onKeyDown = useCallback((ev: React.KeyboardEvent<HTMLInputElement>) => {
    onPropsKeyDown?.(ev);
    if (quickchange) {
      let step = 0;
      if (ev.key === 'ArrowUp') {
        step = 1;
      }
      if (ev.key === 'ArrowDown') {
        step = -1;
      }

      if (step) {
        if (/^\d+/.test(value)) {
          onChange(value.replace(/^(\d+)/, (_, match) => {
            return (Number(match) + step).toString();
          }));
        }
      }

    }
  }, [onPropsKeyDown, quickchange, value, onChange]);

  const onPaste = useCallback(
    async (e: React.ClipboardEvent<HTMLInputElement>) => {
      const clipboardData = e.clipboardData!;

      for (let i = 0; i < clipboardData.items.length; i++) {
        const item = clipboardData.items[i];
        if (item.kind == 'file') {
          const blob = item.getAsFile();

          if (!blob || blob.size === 0) {
            return;
          }
          message.loading('Uploading picture...');
          const picture = await services.common.uploadByQiniu(blob);
          props.onChange(picture);
          message.destroy();
        }
      }
    },
    [props.onChange]
  );

  return <AntdInput {...{ ...props, quickchange: undefined }} onChange={(e) => onChange(e.target.value)} onKeyDown={onKeyDown} onPaste={onPaste} />;
}
