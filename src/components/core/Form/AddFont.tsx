import { FieldArray } from 'formik';
import React from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { TextField } from '.';
import { Button } from 'antd';
import { Stack } from '@/components/Stack';
import { TextStyle } from '@/components/TextStyle';
import { useBlock } from '@/hooks/useBlock';
import { IPage } from '../blocks/basic/Page';
import { Help } from '@/components/Help';
import * as Yup from 'yup';

const isUrl = async (v: string) => {
  try {
    await Yup.string().url().validate(v);
    return undefined;
  } catch (error) {
    return 'Unvalid hosted css file.';
  }
};

export function AddFont() {

  const { focusIdx, focusBlock } = useBlock();
  const value: IPage['data']['value'] = focusBlock?.data.value;
  return (

    <FieldArray
      name={`${focusIdx}.data.value.fonts`}
      render={arrayHelpers => {

        return (
          <div>
            <Stack vertical spacing="tight">
              <Stack distribution="equalSpacing">
                <TextStyle variation="strong" size="large">Import font <Help title="Points to a hosted css file" /></TextStyle>
                <Stack>
                  <Button size="small" icon={<PlusOutlined />}
                    onClick={() => arrayHelpers.push({ name: '', href: '' })}
                  />
                </Stack>
              </Stack>

              <Stack vertical spacing="extraTight">
                {value.fonts?.map((item, index) => {
                  return (

                    <div key={index}>
                      <Stack alignment="center" wrap={false}>
                        <Stack.Item fill>
                          <TextField inline name={`${focusIdx}.data.value.fonts.${index}.name`} label="Name" />
                        </Stack.Item>
                        <Stack.Item fill>
                          <TextField validate={isUrl} inline name={`${focusIdx}.data.value.fonts.${index}.href`} label="Href" />
                        </Stack.Item>
                        <Button icon={<DeleteOutlined />} onClick={() => arrayHelpers.remove(index)} />
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