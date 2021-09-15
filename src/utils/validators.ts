import { helpers, required } from '@vuelidate/validators';

export const mustBeCool = (value: string): boolean => value.includes('cool');

export const customRequired = helpers.withMessage("Це обов'язкове поле", required);

export const notLatin = (value: string): boolean => {
  const latinReg = /[a-zA-Z]/;
  return !latinReg.test(value);
};

export const edrpouValidator = helpers.regex(/^\d{8}$/);
