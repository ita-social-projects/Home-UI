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

const validKey = helpers.regex(/^[a-zA-Z0-9]{36}$/);
export const keyValidator = helpers.withMessage('Ключ з E-mail, 36 символів', validKey);

const validName = helpers.regex(/^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|(),:;<>@[\]]*$/);
export const nameValidator = helpers.withMessage('Латинські літери, цифри та спец.символи', validName);
export const nameLenghtValidator = helpers.withMessage('Максимальна кількість символів - 50', maxLength(50));

// const validCooperationName = helpers.regex(/^[а-яА-Я]+$/gi);
// /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/;
// export const сooperationNameValidator = helpers.withMessage(' літери ...', validCooperationName);
// export const nameLenghtValidator = helpers.withMessage('Максимальна кількість символів - 50', maxLength(50));

// const validIban = helpers.regex(/^UA\d{27}$/gi);

// const validAddress = helpers.regex(/^[а-яА-Я]{1,50}$/);

// const validHouseBlock = helpers.regex(/^[а-яА-Я0-9]{1,10}$/);

// const validZipCpde = helpers.regex(/^[0-9]{5}$/);

// const validPhoneNumber = helpers.regex(/^\+?3?8?(0[0-9]\d{8})$/);

// =Cooperation name: length 1 to 50 Symbols are uppercase and lowercase letters (A-Z, a-z)
// =IBAN: Length 29 symbols Pattern: ^UA\d{27}$
// =Email: 5 to 320 chars. Pattern: ^([\w!#$%&'*+\/=?{|}~^-]|.){1,60}@(?!-)(?:[a-zA-Z0-9-]{2,250}+.)+[a-zA-Z]{2,6}$
// =Address: region, city, district, street - Symbols are uppercase and lowercase letters (A-Z, a-z) 1 to 50 chars;
// =house block - digits from 0 to 9, symbols uppercase and lowercase letters (A-Z, a-z) length 1 to 10 chars
// =zip code: 5 digits symbols, from 0 to 9
// =Phone number: Length – 13 symbols. Symbols are ‘+’ sign and digits from 0 to 9, a special character ‘+’
//appears only as the first character and only once.
