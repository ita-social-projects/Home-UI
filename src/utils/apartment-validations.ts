import { requiredValidator, apartmentNumberValidator, apartmentAreaValidator } from '@/utils/validators';

export const apartmentValidations = {
  apartmentNumber: { requiredValidator, apartmentNumberValidator },
  apartmentArea: { requiredValidator, apartmentAreaValidator },
};
