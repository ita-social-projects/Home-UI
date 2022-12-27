import {
  requiredValidator,
  tarrifCalculatorTitle,
  tarrifCalculatorComment,
  tarrifCalculatorServicePrice,
  tarrifCalculatorServiceTitle,
  tarrifCalculatorDigitsOnly,
} from '@/utils/validators';

export const tarrifCalculatorValidations = {
  title: {
    requiredValidator,
    tarrifCalculatorTitle,
  },
  comment: {
    tarrifCalculatorComment,
  },
  serviceTitle: {
    requiredValidator,
    tarrifCalculatorServiceTitle,
  },
  servicePrice: {
    requiredValidator,
    tarrifCalculatorServicePrice,
    tarrifCalculatorDigitsOnly,
  },
  $validationGroups: {
    tarrifValidations: ['title', 'comment'],
    serviceValidations: ['serviceTitle', 'servicePrice'],
  },
};
