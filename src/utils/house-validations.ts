import {
  flatQuantityAndAdjoiningAreaValidator,
  houseAreaValidator,
  houseBlockHouseNumberMaxLength,
  houseDecimalValidator,
  houseNumAndHouseBlockValidator,
  regionCityDistrictMaxLength,
  requiredValidator,
  streetMaxLength,
  ukrLangTitleValidator,
  zeroValidator,
  zipCodeValidator,
} from '@/utils/validators';

export const houseValidations = {
  flatQuantity: {
    requiredValidator,
    zeroValidator,
    flatQuantityAndAdjoiningAreaValidator,
    houseDecimalValidator,
  },
  houseArea: { requiredValidator, zeroValidator, houseAreaValidator, houseDecimalValidator },
  adjoiningArea: {
    requiredValidator,
    zeroValidator,
    flatQuantityAndAdjoiningAreaValidator,
    houseDecimalValidator,
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
