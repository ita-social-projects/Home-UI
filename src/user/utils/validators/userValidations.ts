import {
  requiredValidator,
  ukrLangTitleValidator,
  someTitleLenghtValidator,
  emailValidator,
  emailMinLength,
  emailMaxLength,
  emailLastCharsValidator,
  passwordValidator,
  passwordMinLenght,
  passwordMaxLenght,
} from '@/utils/validators';

export const userFullNameValidations = {
  firstName: {
    requiredValidator,
    ukrLangTitleValidator,
    someTitleLenghtValidator,
  },
  middleName: {
    requiredValidator,
    ukrLangTitleValidator,
    someTitleLenghtValidator,
  },
  lastName: {
    requiredValidator,
    ukrLangTitleValidator,
    someTitleLenghtValidator,
  },
};

export const userEmailValidations = {
  requiredValidator,
  emailMinLength,
  emailMaxLength,
  emailLastCharsValidator,
  emailValidator,
};

export const userPasswordValidations = {
  requiredValidator,
  passwordMinLenght,
  passwordValidator,
  passwordMaxLenght,
};
