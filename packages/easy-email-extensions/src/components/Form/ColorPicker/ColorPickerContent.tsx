import { Button, Space } from '@arco-design/web-react';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import styles from '../index.module.scss';

import Color from 'color';

import { PresetColorsContext } from '@extensions/AttributePanel/components/provider/PresetColorsProvider';

export interface ColorPickerContentProps {
  onChange: (val: string) => void;
  value: string;
}

const transparentColor = 'rgba(0,0,0,0)';

export function ColorPickerContent(props: ColorPickerContentProps) {
  const { colors: presetColors } = useContext(PresetColorsContext);

  const { onChange } = props;
  const [color, setColor] = useState(props.value);

  useEffect(() => {
    setColor(props.value);
  }, [props.value]);

  const presetColorList = useMemo(() => {
    return [...presetColors.filter(item => item !== transparentColor).slice(-14)];
  }, [presetColors]);

  let adapterColor = color;

  try {
    if (Color(color).hex()) {
      adapterColor = Color(color).hex();
    }
  } catch (error) {}

  return (
    <div
      className={styles.colorPicker}
      style={{ width: 202, paddingTop: 12, paddingBottom: 12 }}
    >
      <div style={{ padding: '0px 16px' }}>
        <Space
          wrap
          size='mini'
        >
          {presetColorList.map(item => {
            return (
              <div
                title={item}
                onClick={() => onChange(item)}
                key={item}
                style={{
                  border: '1px solid var(--color-neutral-3, rgb(229, 230, 235))',
                  display: 'inline-block',
                  height: 20,
                  width: 20,
                  boxSizing: 'border-box',
                  padding: 4,
                  borderRadius: 3,
                  backgroundColor: item,
                  position: 'relative',
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </Space>
      </div>
      <div
        style={{
          padding: '6px 6px 0px 6px',
        }}
      >
        <Button
          type='text'
          size='small'
          style={{
            color: '#333',
            fontSize: 12,
            width: '100%',
            textAlign: 'left',
            paddingLeft: 10,
            position: 'relative',
          }}
        >
          <span>{t('Picker...')}</span>
          <input
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 1,
              left: 0,
              top: 0,
              opacity: 0,
            }}
            type='color'
            value={adapterColor}
            onChange={e => onChange(e.target.value)}
          />
        </Button>
      </div>
      <style>
        {`
          .form-alpha-picker {
            outline: 1px solid rgb(204, 204, 204, 0.6);
          }
          `}
      </style>
    </div>
  );
}
