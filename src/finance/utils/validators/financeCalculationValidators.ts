import {
  requiredValidator,
  tarrifCalculatorTitle,
  tarrifCalculatorComment,
  tarrifCalculatorExpenseItemCost,
  tarrifCalculatorExpenseTitle,
  tarrifCalculatorDigitsOnly,
} from '@/utils/validators';

export const tarrifCalculatorValidations = {
  tarrifTitle: {
    requiredValidator,
    tarrifCalculatorTitle,
  },
  tarrifComment: {
    tarrifCalculatorComment,
  },
  tarrifExpenseTitle: {
    requiredValidator,
    tarrifCalculatorExpenseTitle,
  },
  tarrifExpenseCost: {
    requiredValidator,
    tarrifCalculatorExpenseItemCost,
    tarrifCalculatorDigitsOnly,
  },
};
