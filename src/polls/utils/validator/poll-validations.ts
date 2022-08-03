import {
  pollTitleLenghtValidator,
  cyrillicLangTextValidator,
  pollDescriptionLenghtValidator,
  requiredValidator,
} from '@/utils/validators';

export const pollValidations = {
  title: { requiredValidator, cyrillicLangTextValidator, pollTitleLenghtValidator },
  description: { requiredValidator, cyrillicLangTextValidator, pollDescriptionLenghtValidator },
  polledHouses: { requiredValidator },
  acceptanceCriteria: { requiredValidator },
};
