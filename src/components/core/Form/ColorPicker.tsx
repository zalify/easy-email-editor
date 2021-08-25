import { Input, Popover, PopoverProps } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { Picture } from '@/components/UI/Picture';
import { Stack } from '@/components/UI/Stack';

export interface ColorPickerProps extends PopoverProps {
  onChange?: (val: string) => void;
  value?: string;
  label: string;
  children?: React.ReactNode;
  showInput?: boolean;
}

export function ColorPicker(props: ColorPickerProps) {
  const [color, setColor] = useState('');
  const { value = '', onChange, children, showInput = true } = props;

  useEffect(() => {
    setColor(value);
  }, [value]);

  const onChangeComplete = useCallback(
    (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value && event.target.value.replace('#', '').length < 6)
        return;
      const newColor = color.hex;
      setColor(newColor);
      onChange?.(newColor);
    },
    [onChange]
  );

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setColor(event.target.value);
      onChange?.(event.target.value);
    },
    [onChange]
  );
  return (
    <Stack spacing='none' wrap={false}>
      <Popover
        {...props}
        content={
          <SketchPicker color={color} onChangeComplete={onChangeComplete} />
        }
        placement='topRight'
        title={props.label}
        trigger='click'
      >
        {children || (
          <div
            style={{
              display: 'inline-block',
              height: 32,
              width: 32,
              padding: 4,
              border: '1px solid #e6e6e6',
              borderRadius: showInput ? undefined : 4,
              fontSize: 0,
              borderRight: showInput ? 'none' : undefined,
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            {props.value ? (
              <span
                style={{
                  position: 'relative',
                  display: 'block',
                  border: '1px solid #999',
                  borderRadius: 2,
                  width: '100%',
                  height: '100%',
                  textAlign: 'center',
                  backgroundColor: value,
                }}
              />
            ) : (
              <Picture
                style={{
                  filter:
                    'invert(  0.78  )  drop-shadow(0 0px 0 rgb(0 0 0 / 45%))',
                }}
                src='https://assets.maocanhua.cn/3e952a6e-2506-470e-b395-3e0d995157c5.png'
              />
            )}
          </div>
        )}
      </Popover>
      {showInput && (
        <Input
          value={props.value}
          style={{ width: '7em', outline: 'none' }}
          onChange={onInputChange}
        />
      )}
    </Stack>
  );
}
