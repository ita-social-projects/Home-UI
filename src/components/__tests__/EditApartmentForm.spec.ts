import { VueWrapper, mount, MountingOptions, DOMWrapper } from '@vue/test-utils';
import EditApartmentForm from '@/components/EditApartmentForm.vue';
import { inputSetValueHandler, setup } from '@/utils/test-utils';
import { RootStateInterface } from '@/store/types';
import { createStore } from 'vuex';

type InputValueType = string | number;

const mockApartmentData = {
  apartmentNumber: '',
  apartmentArea: '',
};

const validationMessages: { [key: string]: any } = {
  required: () => "Це обов'язкове поле",
  apartmentNumberValidator: () => '1-6 цифр, літера через дефіс',
  apartmentAreaValidator: () => 'Площа має бути від 10 до 1000 м.кв',
  apartmentDecimalValidator: () => 'Не більше 2 значень після крапки',
};

const store = createStore({
  state: {
    apartments: [
      {
        apartmentNumber: '2',
        apartmentArea: 222,
        ownerships: [],
        id: 3256,
      },
      {
        apartmentNumber: '1',
        apartmentArea: 100,
        ownerships: [],
        id: 3255,
      },
    ],
  },
  getters: {
    'apartmentsStore/getApartmentInfo': (state) => state.apartments[1],
  },
  actions: {
    'apartmentsStore/EDIT_APARTMENT': jest.fn(),
    'apartmentsStore/SET_APARTMENT_BY_ID': jest.fn(),
  },
});

const mountingOptions: MountingOptions<any> = {
  global: {
    plugins: [store],
  },
  propsData: {
    houseId: 1,
    apartmentId: 1,
    propsApartmentData: {
      id: 2,
      apartmentNumber: '1',
      apartmentArea: 234,
    },
  },
  data() {
    return {
      mockApartmentData,
    };
  },
};

let wrapper: VueWrapper<any>;
let htmlElems: {
  [key: string]: {
    [key: string]: DOMWrapper<HTMLElement>;
  };
};

beforeEach(() => {
  wrapper = mount(EditApartmentForm, mountingOptions);
  htmlElems = {
    fields: {
      apartmentNumber: wrapper.find('#apartmentNumber'),
      apartmentArea: wrapper.find('#apartmentArea'),
    },
    btns: {
      cancelApartmentBtn: wrapper.find('#cancel-edit-apartment-btn'),
      editApartmentBtn: wrapper.find('#update-apartment-btn'),
    },
    form: {
      editApartmentForm: wrapper.find('#edit-apartment-form'),
    },
  };
});

describe('EditApartmentForm.vue', () => {
  describe('Testing right render', () => {
    it('should exist', () => {
      expect(wrapper.exists()).toBeTruthy();
    });

    it('should get required props', () => {
      expect(wrapper.props().houseId).toBe(1);
      expect(wrapper.props('houseId')).toBe(1);
      expect(wrapper.props().apartmentId).toBe(1);
      expect(wrapper.props('apartmentId')).toBe(1);
    });
  });

  describe('Testing validation', () => {
    const requiredCases = Object.keys(mockApartmentData).map((fieldName: string) => [fieldName]);
    it.each(requiredCases)('%s field should display required validation message', async (fieldName: string) => {
      await Object.keys(mockApartmentData).map((field: string) => htmlElems.fields[field].setValue(''));

      expect(wrapper.find(`small#${fieldName}-help`).text()).toBe(validationMessages.required());
    });
    it.each([
      ['apartmentNumber', 'apartmentNumberValidator', 0],
      ['apartmentArea', 'apartmentAreaValidator', 0],
    ])(
      '%s field should display validation message',
      async (fieldName: string, message: string, value: InputValueType) => {
        await inputSetValueHandler(htmlElems.fields[fieldName], value);
        expect(wrapper.find(`small#${fieldName}-help`).text()).toBe(validationMessages[message]());
      }
    );
    it('apartmentArea field should display message', async () => {
      await htmlElems.fields.apartmentNumber.setValue('4');
      await htmlElems.fields.apartmentArea.setValue('60.9008');
      expect(wrapper.find(`small#apartmentArea-help`).text()).toBe('Не більше 2 значень після крапки');
    });
  });

  describe('Testing store, action, getters', () => {
    store.dispatch = jest.fn();

    it('should call dispatch in mount', async () => {
      const wrapper = mount(EditApartmentForm, mountingOptions);
      const payload = {
        apartmentId: wrapper.props('apartmentId'),
        houseId: wrapper.props('houseId'),
      };
      expect(store.dispatch).toHaveBeenCalledWith('apartmentsStore/SET_APARTMENT_BY_ID', payload);
    });

    it('testing apartmentInfo getter', async () => {
      const data = {
        stateApartmentInfo: {
          apartmentNumber: '1',
          apartmentArea: 100,
          ownerships: [],
          id: 3255,
        },
      };
      const actual = store.getters['apartmentsStore/getApartmentInfo'];
      expect(actual).toEqual(data.stateApartmentInfo);
    });
  });

  describe('Testing EditApartmentForm methods', () => {
    const cancelEditingSpy = jest.spyOn(EditApartmentForm.methods, 'cancelEditing');
    const updateApartmentSpy = jest.spyOn(EditApartmentForm.methods, 'updateApartment');
    const showSuccessEditSpy = jest.spyOn(EditApartmentForm.methods, 'showSuccessEdit');
    const submitEvent: [string, { preventDefault: () => void }] = [
      'submit',
      {
        preventDefault: () => {
          return;
        },
      },
    ];

    it('Click on Cancel button should call cancelEditing method', async () => {
      htmlElems.btns.cancelApartmentBtn.trigger('click');
      await wrapper.vm.$nextTick();

      expect(cancelEditingSpy).toHaveBeenCalled();
    });

    it('Click on Cancel button should emit cancel-editing', async () => {
      htmlElems.btns.cancelApartmentBtn.trigger('click');
      await wrapper.vm.$nextTick();
      console.log(wrapper.emitted());

      expect(wrapper.emitted('cancel-editing')).toBeTruthy();
    });

    it('Click on Edit button should call updateApartment method', async () => {
      const apartmentData = {
        apartmentNumber: '23',
        apartmentArea: '120',
      };
      await Object.keys(apartmentData).map((field: string) => htmlElems.fields[field].setValue(apartmentData[field]));

      htmlElems.btns.editApartmentBtn.trigger('click');
      htmlElems.form.editApartmentForm.trigger(...submitEvent);

      await wrapper.vm.$nextTick();
      expect(updateApartmentSpy).toHaveBeenCalled();
    });
    it('Click on Edit button should call dispatch', async () => {
      const apartmentData = {
        apartmentNumber: '22',
        apartmentArea: '219',
      };
      await Object.keys(apartmentData).map((field: string) => htmlElems.fields[field].setValue(apartmentData[field]));

      htmlElems.btns.editApartmentBtn.trigger('click');
      htmlElems.form.editApartmentForm.trigger(...submitEvent);
      await wrapper.vm.$nextTick();

      expect(store.dispatch).toHaveBeenCalled();
    });
    it('Click on Edit button should call showSuccessEdit method', async () => {
      const apartmentData = {
        apartmentNumber: '345',
        apartmentArea: '98.09',
      };
      await Object.keys(apartmentData).map((field: string) => htmlElems.fields[field].setValue(apartmentData[field]));

      htmlElems.btns.editApartmentBtn.trigger('click');
      htmlElems.form.editApartmentForm.trigger(...submitEvent);
      await wrapper.vm.$nextTick();

      expect(showSuccessEditSpy).toHaveBeenCalled();
    });

    it('should clear fields after submit', async () => {
      const apartmentData = {
        apartmentNumber: '23',
        apartmentArea: '120',
      };
      await Object.keys(apartmentData).map((field: string) => htmlElems.fields[field].setValue(apartmentData[field]));

      htmlElems.btns.editApartmentBtn.trigger('click');
      htmlElems.form.editApartmentForm.trigger(...submitEvent);
      await wrapper.vm.$nextTick();

      expect(htmlElems.fields.apartmentNumber.text()).toBe('');
      expect(htmlElems.fields.apartmentArea.text()).toBe('');
    });
  });
});
