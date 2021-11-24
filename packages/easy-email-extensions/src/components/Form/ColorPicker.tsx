import { Input, Popover, PopoverProps } from 'antd';
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { Stack } from 'easy-email-editor';
import { PresetColorsContext } from '../../AttributePanel/components/provider/PresetColorsProvider';
import { getImg } from '@extensions/AttributePanel/utils/getImg';

export interface ColorPickerProps extends PopoverProps {
  onChange?: (val: string) => void;
  value?: string;
  label: string;
  children?: React.ReactNode;
  showInput?: boolean;
}

export function ColorPicker(props: ColorPickerProps) {
  const { colors: presetColors, addCurrentColor } =
    useContext(PresetColorsContext);
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
      addCurrentColor(newColor);
    },
    [addCurrentColor, onChange]
  );

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setColor(event.target.value);
      onChange?.(event.target.value);
      addCurrentColor(event.target.value);
    },
    [addCurrentColor, onChange]
  );
  return (
    <Stack spacing='none' wrap={false}>
      <Popover
        title={props.label}
        trigger='click'
        {...props}
        content={(
          <SketchPicker
            presetColors={presetColors}
            color={color}
            disableAlpha
            onChangeComplete={onChangeComplete}
          />
        )}
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
              <img
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  filter:
                    'invert(  0.78  )  drop-shadow(0 0px 0 rgb(0 0 0 / 45%))',
                }}
                src={getImg('AttributePanel_02')}
              />
            )}
          </div>
        )}
      </Popover>
      {showInput && (
        <Input
          value={props.value}
          style={{ width: '80px', outline: 'none' }}
          onChange={onInputChange}
        />
      )}
    </Stack>
  );
}
