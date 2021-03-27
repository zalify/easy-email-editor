import { Stack } from '@/components/Stack';
import React, { useEffect, useMemo, useState } from 'react';
import {
  DesktopOutlined,
  BorderOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import { Button, InputNumber, Tooltip } from 'antd';
import { TextStyle } from '@/components/TextStyle';

export const platformType = [
  {
    value: 'laptop',
    label: '电脑',
    icon: <DesktopOutlined />,
  },
  {
    value: 'mobile',
    label: '手机',
    icon: <TabletOutlined />,
  },
  {
    value: 'other',
    label: '自定义',
    icon: <BorderOutlined />,
  },
];

export const scaleOptions = [
  {
    value: 0.5,
    label: '50%',
  },
  {
    value: 0.75,
    label: '75%',
  },
  {
    value: 1,
    label: '100%',
  },
  {
    value: 1.25,
    label: '125%',
  },
  {
    value: 1.5,
    label: '150%',
  },
  {
    value: 1.75,
    label: '175%',
  },
  {
    value: 2,
    label: '200%',
  },
];

export function useDeviceToolbar() {
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(768);
  const [selectedPlatform, setSelectedPlatform] = useState('laptop');
  const [scale, setScale] = useState(1);
  const isSelectedOther = selectedPlatform === 'other';

  useEffect(() => {
    if (selectedPlatform === 'laptop') {
      setWidth(600);
      setHeight(768);
    }
    if (selectedPlatform === 'mobile') {
      setWidth(375);
      setHeight(667);
    }
  }, [selectedPlatform]);

  // useEffect(() => {
  //   patchQuery({
  //     scale
  //   });
  // }, [patchQuery, scale]);

  // 缩放的情况下，拖拽有bug
  // useEffect(() => {
  //   let isKeydown = false;
  //   const onKeydown = (ev: KeyboardEvent) => {
  //     if (ev.key === 'Control') {
  //       isKeydown = true;
  //     }

  //   };

  //   const keyup = () => {
  //     isKeydown = false;
  //   };

  //   const wheel = (ev: WheelEvent) => {
  //     if (!isKeydown) return;
  //     ev.preventDefault();
  //     if (ev.deltaY > 0) {
  //       setScale(s => +(s + 0.05).toFixed(2));
  //     } else {
  //       setScale(s => +Math.max(.1, s - 0.05).toFixed(2));
  //     }
  //   };

  //   window.addEventListener('keydown', onKeydown);
  //   window.addEventListener('keyup', keyup);
  //   window.addEventListener('wheel', wheel, { passive: false });

  //   return () => {
  //     window.removeEventListener('keydown', onKeydown);
  //     window.removeEventListener('keyup', keyup);
  //     window.removeEventListener('wheel', wheel);
  //   };
  // }, []);

  const content = useMemo(() => {
    return (
      <div
        style={{ position: 'absolute', top: 0, height: 72, lineHeight: '72px' }}
      >
        <Stack distribution='equalSpacing' alignment='center'>
          <Stack>
            <Stack spacing='extraTight'>
              {platformType.map((item) => (
                <Tooltip title={item.label} key={item.value}>
                  <Button
                    type={
                      selectedPlatform === item.value ? 'primary' : undefined
                    }
                    ghost={selectedPlatform === item.value}
                    size='small'
                    onClick={() => setSelectedPlatform(item.value)}
                  >
                    {item.icon}
                  </Button>
                </Tooltip>
              ))}
            </Stack>
            <Stack spacing='extraTight'>
              <InputNumber
                disabled={!isSelectedOther}
                size='small'
                style={{ width: 50 }}
                value={width}
                onChange={(val) => setWidth(Number(val))}
              />
              <TextStyle>X</TextStyle>
              <InputNumber
                disabled={!isSelectedOther}
                size='small'
                style={{ width: 50 }}
                value={height}
                onChange={(val) => setHeight(Number(val))}
              />
              {/* <Select value={scale} onChange={e => setScale(e)} size="small" style={{ width: 75 }}>
                {
                  scaleOptions.map(item => <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>)
                }
              </Select> */}
            </Stack>
          </Stack>
        </Stack>
      </div>
    );
  }, [height, isSelectedOther, selectedPlatform, width]);

  return {
    content,
    width,
    height,
    scale,
  };
}
