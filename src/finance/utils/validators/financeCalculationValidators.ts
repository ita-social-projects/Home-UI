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

export const tariffCalculatorServiceEditValidations = {
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
