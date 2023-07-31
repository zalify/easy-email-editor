import { IconSettings } from '@arco-design/web-react/icon';
import { IconFont } from 'easy-email-editor';
import React from 'react';

export function SettingIcon(
  openConfig:any
){
  return(
    <IconSettings
      onClick={() => openConfig}
    />
  )
}