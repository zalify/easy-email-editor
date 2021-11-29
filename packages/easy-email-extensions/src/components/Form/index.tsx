import {
  InputNumber,
  Input as ArcoInput,
  Switch,
  DatePicker,
  Slider,
  SliderProps,
  InputNumberProps,
  SwitchProps,
  DatePickerProps,
  TextAreaProps,
  CheckboxGroupProps,
} from '@arco-design/web-react';
import { ImageUploaderProps, ImageUploader } from './ImageUploader';
import { UploadField as Uploader, UploadFieldProps } from './UploadField';
import { ColorPicker, ColorPickerProps } from './ColorPicker';
import { Select, SelectProps } from './Select';
import { RadioGroup, RadioGroupProps } from './RadioGroup';
import enhancer from './enhancer';
import { Input, InputProps } from './Input';
import { ChexkBoxGroup } from './ChexkBoxGroup';
import { EditTab, EditTabProps } from './EditTab';
import { Dayjs } from 'dayjs';
import { InlineText, InlineTextProps } from './InlineTextField';
import { AutoCompleteProps, AutoComplete } from './AutoComplete';
export { RichTextField } from './RichTextField';

export const TextField = enhancer<InputProps>(Input, (value) => value);
export const SearchField = enhancer<InputProps>(
  ArcoInput.Search,
  (e: React.ChangeEvent<HTMLTextAreaElement>) => e.target.value
);

export const TextAreaField = enhancer<TextAreaProps>(
  ArcoInput.TextArea,
  (e: React.ChangeEvent<HTMLTextAreaElement>) => e.target.value
);

export const NumberField = enhancer<InputNumberProps>(
  InputNumber,
  (e: number | string | undefined | null) => e
);
export const SliderField = enhancer<SliderProps>(Slider, (e: number) => e);

export const ColorPickerField = enhancer<ColorPickerProps>(
  ColorPicker,
  (e: string) => e
);

export const UploadField = enhancer<UploadFieldProps>(
  Uploader,
  (val: string) => val
);

export const ImageUploaderField = enhancer<ImageUploaderProps>(
  ImageUploader,
  (url: string) => url
);

export const SelectField = enhancer<SelectProps>(Select, (e: string) => e);

export const AutoCompleteField = enhancer<AutoCompleteProps>(
  AutoComplete,
  (e: string) => e
);

export const RadioGroupField = enhancer<RadioGroupProps>(
  RadioGroup,
  (value) => value
);

export const SwitchField = enhancer<SwitchProps>(Switch, (e: boolean) => e);

export const DatePickerField = enhancer<DatePickerProps>(
  DatePicker,
  (date: Dayjs) => date
);

export const CheckboxField = enhancer<CheckboxGroupProps<any>>(
  ChexkBoxGroup,
  (e: any[]) => e
);

export const EditTabField = enhancer<EditTabProps>(EditTab, (e: any[]) => e);

export const InlineTextField = enhancer<InlineTextProps>(
  InlineText,
  (value) => value
);

export { enhancer };
