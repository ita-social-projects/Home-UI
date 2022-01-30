import { OwnershipsDTOModel } from '@/shared/models/ownershipsDTO.model';

// ----- Mock data ----
const data: Array<OwnershipsDTOModel> = [
  {
    id: 1,
    owner: {
      id: 1,
      first_name: 'Petro',
      middle_name: 'Evgenovich',
      last_name: 'Petrov',
      contacts: [
        {
          id: 1,
          type: 'email',
          main: false,
          email: 'readUserEmail@example.com',
        },
        {
          id: 2,
          type: 'email',
          main: true,
          email: 'readUserEmail@example.com',
        },
      ],
    },
    ownership_part: '0',
  },
  {
    id: 2,
    owner: {
      id: 1,
      first_name: 'Ivan',
      middle_name: 'Petrovich',
      last_name: 'Petrov',
      contacts: [
        {
          id: 1,
          type: 'email',
          main: true,
          email: 'newEmail@example.com',
        },
      ],
    },
    ownership_part: '2/3',
  },
  {
    id: 3,
    owner: {
      id: 1,
      first_name: 'Olga',
      middle_name: 'Mukolaivna',
      last_name: 'Petrov',
      contacts: [
        {
          id: 1,
          type: 'phone',
          main: false,
          phone: '+380985054044',
        },
        {
          id: 2,
          type: 'email',
          main: true,
          email: 'secondEmail@example.com',
        },
      ],
    },
    ownership_part: '1/3',
  },
];

export { data };
