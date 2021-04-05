import { Stack } from '@/components/Stack';
import React, { useEffect, useMemo, useState } from 'react';
import {
  DesktopOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import { Button, InputNumber, Tooltip } from 'antd';

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
        style={{ height: 72, lineHeight: '72px', background: '#fff', display: 'flex', alignItems: 'center', paddingLeft: 16 }}
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

            </Stack>
          </Stack>
        </Stack>
      </div>
    );
  }, [isSelectedOther, selectedPlatform, width]);

  return {
    content,
    width,
  };
}
