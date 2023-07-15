import { useBlock, useFocusIdx, useEditorProps } from 'easy-email-editor';
import { Collapse, Grid, Switch } from '@arco-design/web-react';
import { AdvancedBlock, AdvancedType } from 'easy-email-core';
import { ImageUploaderField } from '@extensions/components/Form';
import React, { useCallback } from 'react';

export function MobileImage() {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, change } = useBlock();
  const { onUploadImage } = useEditorProps();
  const mobileImage = focusBlock?.data.value?.mobileImage as
    | undefined
    | AdvancedBlock['data']['value']['mobileImage'];

  const enabled = Boolean(mobileImage && mobileImage.enabled);

  const onUseMobileImageToggle = useCallback(
    (enabled: boolean) => {
      if (enabled) {
        if (!mobileImage) {
          change(`${focusIdx}.data.value.mobileImage`, {
            enabled: true,
            sourceUrl: ''
          } as AdvancedBlock['data']['value']['mobileImage']);
        }
      }
      change(`${focusIdx}.data.value.mobileImage.enabled`, enabled);
    },
    [change, focusIdx, mobileImage]
  );

  if (
    !focusBlock?.type ||
    !Object.values(AdvancedType).includes(focusBlock?.type as any)
  ) {
    return null;
  }

  return (
    <Collapse.Item
      className='mobile-image'
      destroyOnHide
      name='mobile-image'
      header={t('Mobile Image')}
      extra={(
        <div style={{ marginRight: 10 }}>
          <Switch checked={mobileImage?.enabled} onChange={onUseMobileImageToggle} />
        </div>
      )}
    >
      {mobileImage?.enabled && (
        <Grid.Col span={24}>
          <div>
            <ImageUploaderField
              label={t('src')}
              labelHidden
              name={`${focusIdx}.attributes.src`}
              helpText={t(
                'The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.',
              )}
              uploadHandler={onUploadImage}
            />
          </div>
        </Grid.Col>
      )}
    </Collapse.Item>
  );
}
