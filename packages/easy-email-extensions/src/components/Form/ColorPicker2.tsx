/* eslint-disable react/jsx-wrap-multilines */
import { Input, Popover, PopoverProps } from '@arco-design/web-react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { PresetColorsContext } from '../../AttributePanel/components/provider/PresetColorsProvider';
import { getImg } from '@extensions/AttributePanel/utils/getImg';
import styles from './index.module.scss';

const SketchPickerCom = SketchPicker as any;

export interface ColorPickerProps extends PopoverProps {
  onChange?: (val: string) => void;
  value?: string;
  label: string;
  children?: React.ReactNode;
  showInput?: boolean;
}

const getCollapseItemEle = (node: HTMLElement | null): HTMLElement | null => {
  if (!node) return null;
  if (node.classList.contains('arco-collapse-item')) {
    return node;
  }
  return getCollapseItemEle(node.parentElement);
};

export function ColorPicker(props: ColorPickerProps) {
  const { colors: presetColors, addCurrentColor } = useContext(PresetColorsContext);
  const [color, setColor] = useState('');
  const { value = '', onChange, children, showInput = true } = props;
  const [refEle, setRefEle] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setColor(value);
  }, [value]);

  const onChangeComplete = useCallback(
    (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value && event.target.value.replace('#', '').length < 6) return;
      const newColor = color.hex;
      setColor(newColor);
      onChange?.(newColor);
      addCurrentColor(newColor);
    },
    [addCurrentColor, onChange],
  );

  const onInputChange = useCallback(
    (value: string) => {
      setColor(value);
      onChange?.(value);
      addCurrentColor(value);
    },
    [addCurrentColor, onChange],
  );
  return (
    <div style={{ flex: 1, display: 'flex' }}>
      <Popover
        title={props.label}
        trigger='click'
        {...props}
        // getPopupContainer={() => getCollapseItemEle(refEle) as any}
        position='top'
        content={
          <div className={styles.colorPicker}>
            <SketchPickerCom
              presetColors={presetColors}
              color={color}
              disableAlpha
              onChangeComplete={onChangeComplete}
            />
          </div>
        }
      >
        <div
          style={{ display: 'inline-flex' }}
          ref={setRefEle}
        >
          {children || (
            <div
              style={{
                display: 'inline-block',
                height: 32,
                width: 32,
                boxSizing: 'border-box',
                padding: 4,
                border: '1px solid var(--color-neutral-3, rgb(229, 230, 235))',
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
                    border: '1px solid var(--color-neutral-3, rgb(229, 230, 235))',

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
                    filter: 'invert(  0.78  )  drop-shadow(0 0px 0 rgb(0 0 0 / 45%))',
                  }}
                  src={getImg('AttributePanel_02')}
                />
              )}
            </div>
          )}
        </div>
      </Popover>
      {showInput && (
        <Input
          value={props.value}
          style={{ outline: 'none', flex: 1 }}
          onChange={onInputChange}
        />
      )}
    </div>
  );
}
