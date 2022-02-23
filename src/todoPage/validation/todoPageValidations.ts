import { requiredValidator, todoMaxLength } from '@/utils/validators';

export const todoValidations = {
  todoTitle: { requiredValidator, todoMaxLength },
  todoDescription: { todoMaxLength },
};
