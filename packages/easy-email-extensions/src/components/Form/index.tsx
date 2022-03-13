import {
  InputNumber,
  Input as ArcoInput,
  InputProps as ArcoInputProps,
  Switch,
  DatePicker,
  Slider,
  SliderProps,
  InputNumberProps,
  SwitchProps,
  DatePickerProps,
  TextAreaProps,
  CheckboxGroupProps,
  TreeSelect,
  TreeSelectProps,
} from '@arco-design/web-react';
import { ImageUploaderProps, ImageUploader } from './ImageUploader';
import { UploadField as Uploader, UploadFieldProps } from './UploadField';
import { ColorPicker, ColorPickerProps } from './ColorPicker';
import { Select, SelectProps } from './Select';
import { RadioGroup, RadioGroupProps } from './RadioGroup';
import enhancer from './enhancer';
import { Input, InputProps } from './Input';
import { InputWithUnit, InputWithUnitProps } from './InputWithUnit';
import { CheckBoxGroup } from './CheckBoxGroup';
import { EditTab, EditTabProps } from './EditTab';
import { EditGridTab, EditGridTabProps } from './EditGridTab';
import { Dayjs } from 'dayjs';
import { InlineText, InlineTextProps } from './InlineTextField';
import { AutoCompleteProps, AutoComplete } from './AutoComplete';
import { InputSearchProps } from '@arco-design/web-react/es/Input';
export { RichTextField } from './RichTextField';

export const TextField = enhancer<
  InputProps,
  Required<ArcoInputProps>['onChange']
>(Input, (value) => value);

export const InputWithUnitField = enhancer<
  InputWithUnitProps,
  Required<InputWithUnitProps>['onChange']
>(InputWithUnit, (value) => value);

export const SearchField = enhancer<
  InputProps,
  Required<InputSearchProps>['onChange']
>(ArcoInput.Search, (val) => val);

export const TextAreaField = enhancer<
  TextAreaProps,
  Required<ArcoInputProps>['onChange']
>(ArcoInput.TextArea, (val) => val);

export const NumberField = enhancer<
  InputNumberProps,
  Required<InputNumberProps>['onChange']
>(InputNumber, (e) => e);

export const SliderField = enhancer<
  SliderProps,
  Required<SliderProps>['onChange']
>(Slider, (e) => e);

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

export const TreeSelectField = enhancer<TreeSelectProps>(
  TreeSelect,
  (e: any) => e
);

export const AutoCompleteField = enhancer<AutoCompleteProps>(
  AutoComplete,
  (e: string) => e
);

export const RadioGroupField = enhancer<
  RadioGroupProps,
  Required<RadioGroupProps>['onChange']
>(RadioGroup, (value) => value);

export const SwitchField = enhancer<
  SwitchProps,
  Required<SwitchProps>['onChange']
>(Switch, (e) => e);

export const DatePickerField = enhancer<DatePickerProps>(
  DatePicker,
  (date: Dayjs) => date
);

export const CheckboxField = enhancer<
  CheckboxGroupProps<any>,
  Required<CheckboxGroupProps<any>>['onChange']
>(CheckBoxGroup, (e) => e);

export const EditTabField = enhancer<EditTabProps>(EditTab, (e: any[]) => e);
export const EditGridTabField = enhancer<EditGridTabProps>(EditGridTab, (e: any[]) => e);

export const InlineTextField = enhancer<
  InlineTextProps,
  Required<InlineTextProps>['onChange']
>(InlineText, (value) => value);

export { enhancer };
