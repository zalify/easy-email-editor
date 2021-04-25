import { Popover } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { Picture } from '@/components/Picture';

export interface ColorPickerProps {
  onChange?: (val: string) => void;
  value?: string;
  label: string;
  size?: 'small' | 'normal' | 'large';
  children?: React.ReactNode;
}

export function ColorPicker(props: ColorPickerProps) {
  const [color, setColor] = useState('');
  const { value = '', onChange, children } = props;

  useEffect(() => {
    setColor(value);
  }, [value]);

  const onChangeColor = useCallback((color: ColorResult) => {
    const newColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    setColor(newColor);
    onChange?.(newColor);
  }, [setColor, onChange]);

  const size = useMemo(() => {
    switch (props.size) {
      case 'small': return 20;
      case 'large': return 40;
    }
    return 30;
  }, [props.size]);

  return (
    <Popover
      content={(
        <SketchPicker
          color={color}
          onChangeComplete={onChangeColor}
        />
      )}
      title={props.label}
      trigger='click'
    >{
        children || (
          <div style={{
            display: 'inline-block',
            height: size,
            width: size,
            padding: 4,
            border: '1px solid #e6e6e6',
            borderRadius: 4,
            fontSize: 0,
            position: 'relative',
            cursor: 'pointer',
          }}
          >
            {
              props.value
                ? <span style={{
                  position: 'relative',
                  display: 'block',
                  border: '1px solid #999',
                  borderRadius: 2,
                  width: '100%',
                  height: '100%',
                  textAlign: 'center',
                  backgroundColor: value
                }}
                />
                : <Picture style={{ filter: 'invert(  0.78  )  drop-shadow(0 0px 0 rgb(0 0 0 / 45%))' }} src="https://assets.maocanhua.cn/3e952a6e-2506-470e-b395-3e0d995157c5.png" />
            }

          </div>
        )
      }

    </Popover>

  );
}