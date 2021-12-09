import { helpers, required, minLength, maxLength } from '@vuelidate/validators';

const email = helpers.regex(/^[a-z\d][a-z\d!#$%&'*+\-\/=?^_`{|().,:;<>@[\]]+@[a-z\d.-]+\.[\w-]{2,4}$/i);
const emailLastChars = helpers.regex(/^[a-z\d].*[a-z]$/i);
const password = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
const validKey = helpers.regex(/^[a-zA-Z0-9]{36}$/);
const validName = helpers.regex(/^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|(),:;<>@[\]]*$/);
const ukranianLan = helpers.regex(/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ -]{1,50}$/);
const ukrLangMessage = 'В назві мають бути українські літери';

const edrpou = helpers.regex(/^\d{8}$/);
const validIban = helpers.regex(/^UA\d{27}$/);
const validZipCpde = helpers.regex(/^\d{5}$/);
const validPhoneNumber = helpers.regex(/^\+38(0\d{9})$/);
const validHouseNumAndHouseBlock = helpers.regex(/^[0-9а-щА-ЩЬьЮюЯяЇїІіЄєҐґ-]{1,10}$/);

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
export const keyValidator = helpers.withMessage('Ключ з E-mail, 36 символів', validKey);
export const nameValidator = helpers.withMessage('Латинські літери, цифри та спец.символи', validName);
export const nameLenghtValidator = helpers.withMessage('Максимальна кількість символів - 50', maxLength(50));
export const ukrLangTitleValidator = helpers.withMessage('В назві мають бути українські літери', ukranianLan);
export const ibanValidator = helpers.withMessage('Складається з літр UA та 27 цифр', validIban);
export const houseNumAndHouseBlockValidator = helpers.withMessage(
  `${ukrLangMessage} або цифри від 0 до 9`,
  validHouseNumAndHouseBlock
);
export const zipCodeValidator = helpers.withMessage('5 цифр від 0 до 9', validZipCpde);
export const phoneNumberValidator = helpers.withMessage('Введіть номер коректно.', validPhoneNumber);

