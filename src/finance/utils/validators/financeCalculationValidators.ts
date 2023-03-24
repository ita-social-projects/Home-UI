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
  serviceTitle: {
    requiredValidator,
    tariffCalculatorServiceTitle,
  },
  servicePrice: {
    requiredValidator,
    tariffCalculatorServicePrice,
    tariffCalculatorDigitsOnly,
  },
};
