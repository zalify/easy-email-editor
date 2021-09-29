import { IEmailTemplate } from '@/typings';
import { Form, useForm, useFormState, useField } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import React, { useMemo, useRef } from 'react';
import { BlocksProvider } from '..//BlocksProvider';
import { HoverIdxProvider } from '../HoverIdxProvider';
import { PropsProvider, PropsProviderProps } from '../PropsProvider';
import { RecordProvider } from '../RecordProvider';
import { SelectionRangeProvider } from '../SelectionRangeProvider';
import { ScrollProvider } from '../ScrollProvider';
import { Config, FormApi, FormState } from 'final-form';
import { useEffect, useState } from 'react';
import setFieldTouched from 'final-form-set-field-touched';
import { PresetColorsProvider } from '../PresetColorsProvider';

export interface EmailEditorProviderProps<T extends IEmailTemplate = any>
  extends PropsProviderProps {
  data: T;
  children: (
    props: FormState<T>,
    helper: FormApi<IEmailTemplate, Partial<IEmailTemplate>>
  ) => React.ReactNode;
  onSubmit?: Config<IEmailTemplate, Partial<IEmailTemplate>>['onSubmit'];
  validationSchema?: Config<
    IEmailTemplate,
    Partial<IEmailTemplate>
  >['validate'];
}

export const EmailEditorProvider = (
  props: EmailEditorProviderProps<IEmailTemplate>
) => {
  const { data, children, onSubmit = () => {}, validationSchema } = props;

  const initialValues = useMemo(() => {
    return {
      subject: data.subject,
      subTitle: data.subTitle,
      content: data.content,
    };
  }, [data]);

  if (!initialValues.content) return null;

  return (
    <Form<IEmailTemplate>
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validate={validationSchema}
      mutators={{ ...arrayMutators, setFieldTouched }}
      subscription={{ submitting: true, pristine: true }}
    >
      {() => (
        <>
          <PropsProvider {...props}>
            <RecordProvider>
              <BlocksProvider>
                <HoverIdxProvider>
                  <SelectionRangeProvider>
                    <ScrollProvider>
                      <PresetColorsProvider>
                        <FormikWrapper children={children} />
                      </PresetColorsProvider>
                    </ScrollProvider>
                  </SelectionRangeProvider>
                </HoverIdxProvider>
              </BlocksProvider>
            </RecordProvider>
          </PropsProvider>
          <RegisterFields />
        </>
      )}
    </Form>
  );
};

function FormikWrapper({
  children,
}: {
  children: EmailEditorProviderProps['children'];
}) {
  const data = useFormState<IEmailTemplate>();
  const helper = useForm<IEmailTemplate>();
  return <>{children(data, helper)}</>;
}

// final-form bug https://github.com/final-form/final-form/issues/169

const RegisterFields = React.memo(() => {
  const { touched } = useFormState<IEmailTemplate>();
  const [touchedMap, setTouchedMap] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (touched) {
      Object.keys(touched)
        .filter((key) => touched[key])
        .forEach((key) => {
          setTouchedMap((obj) => {
            obj[key] = true;
            return { ...obj };
          });
        });
    }
  }, [touched]);

  return (
    <>
      {Object.keys(touchedMap).map((key) => {
        return <RegisterField key={key} name={key} />;
      })}
    </>
  );
});

function RegisterField({ name }: { name: string }) {
  useField(name);
  return <></>;
}
