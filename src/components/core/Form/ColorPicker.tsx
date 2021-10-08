import { Input, Popover, PopoverProps } from 'antd';
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Picture } from '@/components/UI/Picture';
import { Stack } from '@/components/UI/Stack';
import { PresetColorsContext } from '@/components/Provider/PresetColorsProvider';
const SketchPickerPromise = import('react-color').then(({ SketchPicker }) => ({
  default: SketchPicker,
}));
const SketchPicker = React.lazy(() => SketchPickerPromise);

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
    (color: { hex: string }, event: React.ChangeEvent<HTMLInputElement>) => {
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
          <Suspense fallback={<div>Loading</div>}>
            <SketchPicker
              presetColors={presetColors}
              color={color}
              disableAlpha
              onChangeComplete={onChangeComplete}
            />
          </Suspense>
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
          style={{ width: '80px', outline: 'none' }}
          onChange={onInputChange}
        />
      )}
    </Stack>
  );
}
