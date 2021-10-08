import { FieldArray } from 'react-final-form-arrays';
import React from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { TextField } from '.';
import { Button } from 'antd';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { useBlock } from '@/hooks/useBlock';
import { IPage } from '../blocks/basic/Page';
import { Help } from '@/components/UI/Help';
import { useFocusIdx } from '@/hooks/useFocusIdx';

const isUrl = async (v: string) => {
  if (
    !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
      v
    )
  ) {
    return 'Unvalid hosted css file.';
  }

  return undefined;
};

export function AddFont() {
  const { focusBlock } = useBlock();
  const { focusIdx } = useFocusIdx();
  const value: IPage['data']['value'] = focusBlock?.data.value;
  return (
    <FieldArray
      name={`${focusIdx}.data.value.fonts`}
      render={(arrayHelpers) => {
        return (
          <div>
            <Stack vertical spacing='tight'>
              <Stack distribution='equalSpacing'>
                <TextStyle variation='strong'>
                  Import font <Help title='Points to a hosted css file' />
                </TextStyle>
                <Stack>
                  <Button
                    size='small'
                    icon={<PlusOutlined />}
                    onClick={() =>
                      arrayHelpers.fields.push({ name: '', href: '' })
                    }
                  />
                </Stack>
              </Stack>

              <Stack vertical spacing='extraTight'>
                {value.fonts?.map((item, index) => {
                  return (
                    <div key={index}>
                      <Stack alignment='center' wrap={false}>
                        <Stack.Item fill>
                          <TextField
                            inline
                            name={`${focusIdx}.data.value.fonts.${index}.name`}
                            label='Name'
                          />
                        </Stack.Item>
                        <Stack.Item fill>
                          <TextField
                            validate={isUrl}
                            inline
                            name={`${focusIdx}.data.value.fonts.${index}.href`}
                            label='Href'
                          />
                        </Stack.Item>
                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() => arrayHelpers.fields.remove(index)}
                        />
                      </Stack>
                    </div>
                  );
                })}
              </Stack>
            </Stack>
          </div>
        );
      }}
    />
  );
}
