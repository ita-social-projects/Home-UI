import { helpers, required, minLength, maxLength } from '@vuelidate/validators';

const email = helpers.regex(/^[a-z\d][a-z\d!#$%&'*+\-\/=?^_`{|().,:;<>@[\]]+@[a-z\d.-]+\.[\w-]{2,4}$/i);
const emailLastChars = helpers.regex(/^[a-z\d].*[a-z]$/i);
const edrpou = helpers.regex(/^\d{8}$/);
const password = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

const ukranianLan = helpers.regex(/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ -]{1,50}$/);
const ukrLangMessage = 'В назві мають бути українські літери';
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

const validKey = helpers.regex(/^[a-zA-Z0-9]{36}$/);
export const keyValidator = helpers.withMessage('Ключ з E-mail, 36 символів', validKey);

const validName = helpers.regex(/^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|(),:;<>@[\]]*$/);
export const nameValidator = helpers.withMessage('Латинські літери, цифри та спец.символи', validName);
export const nameLenghtValidator = helpers.withMessage('Максимальна кількість символів - 50', maxLength(50));

const validCooperationName = helpers.regex(/^[а-яА-Я]+$/gi);
export const сooperationNameValidator = helpers.withMessage(
  'В назві мають бути кириличні літери',
  validCooperationName
);

const validIban = helpers.regex(/^UA\d{27}$/gi);
export const ibanValidator = helpers.withMessage('Складається з літр UA та 27 цифр', validIban);

const validHouseBlock = helpers.regex(/^[а-яА-Я0-9]{1,10}$/);
export const houseBlockValidator = helpers.withMessage('Цифри від 0 до 9', validHouseBlock);

const validZipCpde = helpers.regex(/^\d{5}$/);
export const zipCpdeValidator = helpers.withMessage('Цифри від 0 до 9', validZipCpde);

const validPhoneNumber = helpers.regex(/^\+?3?8?(0\d{8})$/);
export const phoneNumberValidator = helpers.withMessage('Цифри від 0 до 9', validPhoneNumber);

const validMainHouseInfo = helpers.regex(/^\d+$/);
export const mainHouseInfoValidator = helpers.withMessage('В назві мають бути цифри від 0 до 9', validMainHouseInfo);

export const addressValidator = helpers.withMessage(`${ukrLangMessage}`, ukranianLan);

export const houseNumAndHouseBlockValidator = helpers.withMessage(
  `${ukrLangMessage} або цифри від 0 до 9`,
  validHouseNumAndHouseBlock
);
const validZipCode = helpers.regex(/^\d{5}$/);
export const zipCodeValidator = helpers.withMessage('В назві мають бути 5 цифр від 0 до 9', validZipCode);
