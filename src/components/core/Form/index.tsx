import { InputNumber, Input as AntdInput, Switch, DatePicker } from 'antd';
import { SearchProps, TextAreaProps } from 'antd/lib/input';
import { InputNumberProps } from 'antd/lib/input-number';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { ImageUploaderProps, ImageUploader } from './ImageUploader';
import { UploadField as Uploader, UploadFieldProps } from './UploadField';
import { ColorPicker, ColorPickerProps } from './ColorPicker';
import { Select, SelectProps } from './Select';
import { RadioGroup, RadioGroupProps } from './RadioGroup';
import enhancer from './enhancer';
import { RadioChangeEvent } from 'antd/lib/radio';
import { TreeSelect, TreeSelectProps } from './TreeSelect';
import { Input, InputProps } from './Input';
import { SwitchProps } from 'antd/lib/switch';
import { ChexkBoxGroup } from './ChexkBoxGroup';
import { EditTab, EditTabProps } from './EditTab';
import { DatePickerProps } from 'antd/lib/date-picker';
import { Dayjs } from 'dayjs';
import { RichText, RichTextProps } from '@/components/RichText';

export const TextField = enhancer<InputProps>(Input, (value) => value);
export const SearchField = enhancer<SearchProps>(
  AntdInput.Search,
  (e: React.ChangeEvent<HTMLTextAreaElement>) => e.target.value
);
export const RichTextField = enhancer<RichTextProps>(
  RichText,
  (value) => value
);

export const TextAreaField = enhancer<TextAreaProps>(
  AntdInput.TextArea,
  (e: React.ChangeEvent<HTMLTextAreaElement>) => e.target.value
);

export const NumberField = enhancer<InputNumberProps>(
  InputNumber,
  (e: number | string | undefined | null) => e
);

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

export const RadioGroupField = enhancer<RadioGroupProps>(
  RadioGroup,
  (e: RadioChangeEvent) => e.target.value
);

export const TreeSelectField = enhancer<TreeSelectProps>(
  TreeSelect,
  (e: string) => e
);

export const SwitchField = enhancer<SwitchProps>(Switch, (e: boolean) => e);

export const DatePickerField = enhancer<DatePickerProps>(
  DatePicker,
  (date: Dayjs) => date
);

export const CheckboxField = enhancer<CheckboxGroupProps>(
  ChexkBoxGroup,
  (e: any[]) => e
);
export const EditTabField = enhancer<EditTabProps>(EditTab, (e: any[]) => e);
