import { helpers, required, minLength, maxLength } from '@vuelidate/validators';

const ukrLangMessage = 'Це поле має містити українські літери';
const cyrillicLangMessage = 'Це поле має містити літери кирилиці';

const validEmail = helpers.regex(/^[a-z\d][a-z\d!#$%&'*+\-\/=?^_`{|().,:;<>@[\]]+@[a-z\d.-]+\.[\w-]{2,4}$/i);
const validEmailLastChars = helpers.regex(/^[a-z\d].*[a-z]$/i);
const validPassword = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

const validUserName = helpers.regex(/^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|(),:;<>@[\]]*$/);
const validUkranianLan = helpers.regex(/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ -]*$/);
const validCyrillicLan = helpers.regex(/^[а-яА-Яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9!#$%&№'"*+\-/=?^_`{|(),:;.<>@[\]\\ ]*$/);

const validEdrpou = helpers.regex(/^\d{8}$/);
const validIban = helpers.regex(/^UA\d{27}$/);

const validHouseNumAndHouseBlock = helpers.regex(/^[/0-9а-щА-ЩЬьЮюЯяЇїІіЄєҐґ-]*$/);
const validQuantityAndArea = helpers.regex(/^(?<![-.])\b[\d]+\b(?!\.[\d])/);
const validHouseArea = helpers.regex(/^[-+]?[\d]*[.,]?[\d]+(?:[eE][-+]?[\d]+)?$/);
const validZipCode = helpers.regex(/^\d{5}$/);

const validPhoneNumber = helpers.regex(/^\+380\d{3}\d{2}\d{2}\d{2}$/);

const validApartmentArea = helpers.regex(/(^(\d{2,3}){1}(\.\d{1,9})?$)|(1000$)/);
const validApartmentDecimal = helpers.regex(/(^(\d{2,3}){1}(\.\d{1,2})?$)|(1000$)/);
const validApartmentNumber = helpers.regex(/^(?!(0))\d{1,4}(\-[a-zа-я])?$/);
const validHouseDecimal = helpers.regex(/(^(\d{1,100}){1}(\.\d{1,3})?$)/);

const validNonZeroFields = helpers.regex(/^[^0]/);

const lengthMessage = (number: number, description: string): string => {
  const max = `Максимальна кількість символів - ${number}`;
  const min = `Мінімальна кількість символів - ${number}`;
  return description === 'max' ? max : min;
};
const correctNumberMessage = (additionalInfo: string) => {
  return `В полі мають бути ${additionalInfo} цифри від 0 до 9`;
};
const validFlatQuantityAndAdjoiningArea = helpers.regex(/^\d+$/);

export const requiredValidator = helpers.withMessage("Це обов'язкове поле", required);
export const someTitleLenghtValidator = helpers.withMessage(lengthMessage(50, 'max'), maxLength(50));
export const ukrLangTitleValidator = helpers.withMessage(`${ukrLangMessage}`, validUkranianLan);
export const zeroValidator = helpers.withMessage('Перша цифра не може бути 0', validNonZeroFields);

export const emailValidator = helpers.withMessage(
  'Електронна пошта містить латинські букви, цифри, та спеціальні символи',
  validEmail
);
export const emailMinLength = helpers.withMessage(lengthMessage(5, 'min'), minLength(5));
export const emailMaxLength = helpers.withMessage(lengthMessage(320, 'max'), maxLength(320));
export const emailLastCharsValidator = helpers.withMessage(
  'Перший та останній символи не можуть бути спеціальними',
  validEmailLastChars
);
export const passwordValidator = helpers.withMessage(
  'Пароль повинен містити латинські великі та маленькі літери, цифри',
  validPassword
);
export const passwordMaxLenght = helpers.withMessage(lengthMessage(128, 'max'), maxLength(128));
export const passwordMinLenght = helpers.withMessage(lengthMessage(8, 'min'), minLength(8));

export const edrpouValidator = helpers.withMessage(lengthMessage(8, 'max'), validEdrpou);
export const ibanValidator = helpers.withMessage('Складається з літр UA та 27 цифр', validIban);
export const zipCodeValidator = helpers.withMessage(correctNumberMessage('5'), validZipCode);

export const userNameValidator = helpers.withMessage('Латинські літери, цифри та спец.символи', validUserName);
export const userPhoneValidator = helpers.withMessage(
  'Номер повинен починатися з + 38, а далi цифри від 0 до 9',
  validPhoneNumber
);

export const quantityAndResidentialAreasValidator = helpers.withMessage(
  correctNumberMessage('цілі'),
  validQuantityAndArea
);
export const houseAreaValidator = helpers.withMessage(correctNumberMessage(''), validHouseArea);
export const houseNumAndHouseBlockValidator = helpers.withMessage(
  `${ukrLangMessage} або цифри від 0 до 9`,
  validHouseNumAndHouseBlock
);
export const regionCityDistrictMaxLength = helpers.withMessage(lengthMessage(50, 'max'), maxLength(50));
export const streetMaxLength = helpers.withMessage(lengthMessage(25, 'max'), maxLength(25));
export const houseBlockHouseNumberMaxLength = helpers.withMessage(lengthMessage(10, 'max'), maxLength(10));

export const apartmentAreaValidator = helpers.withMessage('Площа має бути від 10 до 1000 м.кв', validApartmentArea);
export const apartmentDecimalValidator = helpers.withMessage('Не більше 2 значень після крапки', validApartmentDecimal);
export const apartmentNumberValidator = helpers.withMessage('1-6 цифр, літера через дефіс', validApartmentNumber);

export const houseDecimalValidator = helpers.withMessage('Не більше 3 значень після крапки', validHouseDecimal);

export const flatQuantityAndAdjoiningAreaValidator = helpers.withMessage(
  'Це поле має містити цілі цифри',
  validFlatQuantityAndAdjoiningArea
);

export const pollTitleLenghtValidator = helpers.withMessage(lengthMessage(250, 'max'), maxLength(250));
export const pollDescriptionLenghtValidator = helpers.withMessage(lengthMessage(1000, 'max'), maxLength(1000));
export const cyrillicLangTitleValidator = helpers.withMessage(`${cyrillicLangMessage}`, validCyrillicLan);
