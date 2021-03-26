
import * as Yup from 'yup';

export enum ValidationType {
  PHONE = 'phone',
  EMAIL = 'email',
  REQUIRED = 'required',
  MIN_LENGTH = 'minLength'
}

export function getMinLengthValidation(len: number) {
  return Yup.string().min(len, `不能少于${len}个字符`);
}

export function getValidation(validations: string[]) {
  const validates = validations.map(item => {

    if (item.includes(ValidationType.MIN_LENGTH)) {
      const len = Number(item.split(`${ValidationType.MIN_LENGTH}:`)[1]);
      return Yup.string().min(len, `不能少于${len}个字符`);
    }
    switch (item) {
      case ValidationType.PHONE:
        return Yup.string().test('', '无效的手机号', (v) => v ? /^1\d{10}$/.test(v) : false);
      case ValidationType.EMAIL:
        return Yup.string().email('无效的邮箱');
      case ValidationType.MIN_LENGTH:

      case ValidationType.REQUIRED:
        return Yup.string().required('该选项不能为空');
    }
  }).filter(item => !!item);
  return async (value: string) => {
    try {
      await Promise.all(validates.map(validate => validate?.validate(value)));
    } catch (error) {
      return error.message;
    }
  };
}