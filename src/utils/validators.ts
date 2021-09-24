import { helpers, required, minLength, maxLength } from '@vuelidate/validators';

const email = helpers.regex(/^[a-z\d][a-z\d!#$%&'*+\-\/=?^_`{|().,:;<>@[\]]+@[a-z\d.-]+\.[\w-]{2,4}$/i);
const emailLastChars = helpers.regex(/^[a-z\d].*[a-z]$/i);
const edrpou = helpers.regex(/^\d{8}$/);
const password = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

export const emailValidator = helpers.withMessage(
  'Електронна пошта містить латинські букви, цифри, та спеціальні символи',
  email
);
export const emailMinLength = helpers.withMessage('Мінімальна довжина електронної пошти - 5 символів', minLength(5));
export const emailMaxLength = helpers.withMessage(
  'Максимальна довжина електронної пошти - 320 символів',
  maxLength(320)
);
export const emailLastCharsValidator = helpers.withMessage(
  'Перший та останній символи не можуть бути спеціальними',
  emailLastChars
);

export const requiredValidator = helpers.withMessage("Це обов'язкове поле", required);
export const edrpouValidator = helpers.withMessage('Код ЄДРПОУ складається з 8 цифр', edrpou);

export const passwordValidator = helpers.withMessage(
  'Пароль повинен містити латинські великі та маленькі літери, цифри',
  password
);
export const passwordMaxLenght = helpers.withMessage('Максимальна кількість символів - 128', maxLength(128));
export const passwordMinLenght = helpers.withMessage('Мінімальна кількість символів - 8', minLength(8));
