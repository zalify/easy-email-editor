import { InputNumber, Input as AntdInput, Switch, DatePicker } from 'antd';
import { SearchProps, TextAreaProps } from 'antd/lib/input';
import { InputNumberProps } from 'antd/lib/input-number';
import { Select, SelectProps } from './Select';
import { RadioGroup, RadioGroupProps } from './RadioGroup';
import enhancer from './enhancer';
import { RadioChangeEvent } from 'antd/lib/radio';
import { TreeSelect, TreeSelectProps } from './TreeSelect';
import { Input, InputProps } from './Input';
import { SwitchProps } from 'antd/lib/switch';
import { DatePickerProps } from 'antd/lib/date-picker';
import { Dayjs } from 'dayjs';

export const TextField = enhancer<InputProps>(Input, (value) => value);
export const SearchField = enhancer<SearchProps>(
  AntdInput.Search,
  (e: React.ChangeEvent<HTMLTextAreaElement>) => e.target.value
);

export const TextAreaField = enhancer<TextAreaProps>(
  AntdInput.TextArea,
  (e: React.ChangeEvent<HTMLTextAreaElement>) => e.target.value
);

export const NumberField = enhancer<InputNumberProps>(
  InputNumber,
  (e: number | string | undefined | null) => e
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
