import { Stack } from '@/components/Stack';
import React, { useEffect, useMemo, useState } from 'react';
import {
  DesktopOutlined,
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
];

export function useDeviceToolbar() {
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(800);
  const [selectedPlatform, setSelectedPlatform] = useState('laptop');
  const isSelectedOther = selectedPlatform === 'other';

  useEffect(() => {
    if (selectedPlatform === 'laptop') {
      setWidth(600);
    }
    if (selectedPlatform === 'mobile') {
      setWidth(375);
    }
  }, [selectedPlatform]);

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
  };
}
