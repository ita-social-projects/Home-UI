import {
  requiredValidator,
  tariffCalculatorTitle,
  tariffCalculatorComment,
  tariffCalculatorServicePrice,
  tariffCalculatorServiceTitle,
  tariffCalculatorDigitsOnly,
} from '@/utils/validators';

export const tariffCalculatorValidations = {
  title: {
    requiredValidator,
    tariffCalculatorTitle,
  },
  comment: {
    tariffCalculatorComment,
  },
};

export const tariffCalculatorServiceValidations = {
  title: {
    requiredValidator,
    tariffCalculatorServiceTitle,
  },
  price: {
    requiredValidator,
    tariffCalculatorServicePrice,
    tariffCalculatorDigitsOnly,
  },
};
