import React, { useCallback, useEffect, useState } from 'react';
import {
  DesktopOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

export const platformList = [
  {
    value: 'laptop',
    label: 'Preview on laptop',
    icon: <DesktopOutlined />,
  },
  {
    value: 'mobile',
    label: 'Preview on mobile',
    icon: <TabletOutlined />,
  },
];

export function useDeviceToolbar() {
  const [width, setWidth] = useState(1200);
  const [selectedPlatform, setSelectedPlatform] = useState('laptop');

  useEffect(() => {
    if (selectedPlatform === 'laptop') {
      setWidth(600);
    }
    if (selectedPlatform === 'mobile') {
      setWidth(375);
    }
  }, [selectedPlatform]);

  const renderPlatform = useCallback((item: {
    value: string;
    label: string;
    icon: JSX.Element;
  }) => {
    return (
      <Tooltip title={item.label} key={item.value}>
        <Button
          type={
            selectedPlatform === item.value ? 'primary' : undefined
          }
          ghost={selectedPlatform === item.value}
          size='small'
          onClick={() => setSelectedPlatform(item.value)}
        >
          {<DesktopOutlined />}
        </Button>
      </Tooltip>
    );
  }, [selectedPlatform]);

  return {
    laptopIcon: renderPlatform(platformList[0]),
    mobileIcon: renderPlatform(platformList[1]),
    width,
  };
}
