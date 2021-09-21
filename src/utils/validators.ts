import { helpers, required, minLength, maxLength } from '@vuelidate/validators';

const email = helpers.regex(/^[a-z\d][a-z\d!#$%&'*+\-/=?^_`{|().,:;<>@[\]]+@[a-z\d.-]+\.[\w-]{2,4}$/i);
export const emailValidator = helpers.withMessage(
  'Електронна пошта містить латинські букви, цифри, та спеціальні символи',
  email
);

export const emailMinLength = helpers.withMessage('Мінімальна довжина ел.пошти - 5', minLength(5));
export const emailMaxLength = helpers.withMessage('Максимальна довжина ел.пошти - 320', maxLength(320));

const emailLastChars = helpers.regex(/^[a-z\d].*[a-z]$/i);
export const emailLastCharsValidator = helpers.withMessage(
  'Перший та останній символи не можуть бути спеціальними',
  emailLastChars
);

export const requiredValidator = helpers.withMessage("Обов'язкове поле", required);

const edrpou = helpers.regex(/^\d{8}$/);
export const edrpouValidator = helpers.withMessage('Код ЄДРПОУ складається з 8 цифр', edrpou);

const validKey = helpers.regex(/^[a-zA-Z0-9]{36}$/);
export const keyValidator = helpers.withMessage('Ключ з E-mail, 36 символів', validKey);

const validPassword = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
export const passwordValidator = helpers.withMessage(
  'Пароль повинен містити латинські великі та маленькі літери, цифри',
  validPassword
);

export const passwordLenghtValidator = helpers.withMessage('Максимальна кількість символів - 128', maxLength(128));

const validName = helpers.regex(/^[A-Za-z0-9!@#$%&'*+\-/=?^_`{|().,:;<>@[\]]*$/i);
export const nameValidator = helpers.withMessage('Латинські літери, цифри та спец.символи', validName);
export const nameLenghtValidator = helpers.withMessage('Максимальна кількість символів - 50', maxLength(50));
