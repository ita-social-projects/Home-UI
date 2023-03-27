import { requiredValidator, tariffCalculatorTitle, tariffCalculatorComment } from '@/utils/validators';

export const tariffCalculatorValidations = {
  title: {
    requiredValidator,
    tariffCalculatorTitle,
  },
  comment: {
    tariffCalculatorComment,
  },
};
