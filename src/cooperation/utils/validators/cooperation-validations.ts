import {
  requiredValidator,
  edrpouValidator,
  emailLastCharsValidator,
  emailMaxLength,
  emailMinLength,
  emailValidator,
  someTitleLenghtValidator,
  ukrLangTitleValidator,
  ibanValidator,
  userPhoneValidator,
  houseNumAndHouseBlockValidator,
  zipCodeValidator,
  regionCityDistrictMaxLength,
  streetMaxLength,
  houseBlockHouseNumberMaxLength,
} from '@/utils/validators';

export const cooperationValidations = {
  name: {
    requiredValidator,
    ukrLangTitleValidator,
    someTitleLenghtValidator,
  },
  edrpou: { requiredValidator, edrpouValidator },
  iban: { requiredValidator, ibanValidator },
  phone: { requiredValidator, userPhoneValidator },
  email: {
    requiredValidator,
    emailMinLength,
    emailLastCharsValidator,
    emailValidator,
    emailMaxLength,
  },
  address: {
    region: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
    city: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
    district: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
    street: { requiredValidator, ukrLangTitleValidator, streetMaxLength },
    houseBlock: {
      requiredValidator,
      houseNumAndHouseBlockValidator,
      houseBlockAndNumberMaxLength: houseBlockHouseNumberMaxLength,
    },
    houseNumber: {
      requiredValidator,
      houseNumAndHouseBlockValidator,
      houseBlockAndNumberMaxLength: houseBlockHouseNumberMaxLength,
    },
    zipCode: { requiredValidator, zipCodeValidator },
  },
};
