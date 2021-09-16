import { helpers, required, minLength, maxLength } from '@vuelidate/validators';

const email = helpers.regex(/[a-z\d][a-z\d!#$%&'*+\-/=?^_`{|().,:;<>@[\]]+@[a-z\d.-]+\.[\w-]{2,4}/i);

export const emailValidator = helpers.withMessage(
  'Електронна пошта містить латинські букви, цифри, та спеціальні символи',
  email
);

export const emailMinLength = helpers.withMessage('Мінімальна довжина електронної пошти - 5 символів', minLength(5));
export const emailMaxLength = helpers.withMessage(
  'Максимальна довжина електронної пошти - 320 символів',
  maxLength(320)
);

const emailLastChars = helpers.regex(/^[a-z\d].*[a-z]$/i);
export const emailLastCharsValidator = helpers.withMessage(
  'Перший та останній символи не можуть бути спеціальними',
  emailLastChars
);

export const requiredValidator = helpers.withMessage("Це обов'язкове поле", required);

const edrpou = helpers.regex(/^\d{8}$/);
export const edrpouValidator = helpers.withMessage('Код ЄДРПОУ складається з 8 цифр', edrpou);
