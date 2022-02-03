import {
  requiredValidator,
  apartmentNumberValidator,
  apartmentAreaValidator,
  apartmentDecimalValidator,
} from '@/utils/validators';

export const apartmentValidations = {
  apartmentNumber: { requiredValidator, apartmentNumberValidator },
  apartmentArea: { requiredValidator, apartmentAreaValidator, apartmentDecimalValidator },
};
