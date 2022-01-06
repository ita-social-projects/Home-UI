import { createStore } from 'vuex';
import { VueWrapper, mount, DOMWrapper } from '@vue/test-utils';
import { RootStateInterface } from '@/store/types';
import { inputSetValueHandler } from '@/utils/test-utils';
import AddHouseForm from '@/components/AddHouseForm.vue';

type InputValueType = string | number;

const mockFieldValues: { [key: string]: InputValueType } = {
  flatQuantity: 111,
  houseArea: 111.11,
  adjoiningArea: 56,
  region: 'Дніпропетровський',
  city: 'Дніпро',
  district: 'Сонячний',
  street: 'Воронцова',
  houseBlock: 'Н/2',
  houseNumber: '5',
  zipCode: '12345',
};

const longStrings = {
  num11: '12345678901',
  num18: '123456789012345678',
  num30: '123456789012345678901234567890',
  num55: '1234567890123456789012345678901234567890123456789012345',
  ukr11: 'йцукенгшщз',
  ukr30: 'йцукенгшщзйцукенгшщзйцукенгшщз',
  ukr60: 'йцукенгшщзйцукенгшщзйцукенгшщзйцукенгшщзйцукенгшщзйцукенгшщз',
};

const validationMessages: { [key: string]: any } = {
  required: () => "Це обов'язкове поле",
  firstDigitNonZero: () => 'Перша цифра не може бути 0',
  ukrSymbols: () => 'Це поле має містити українські літери',
  zipCode: () => 'В полі мають бути 5 цифри від 0 до 9',
  house: () => 'Це поле має містити українські літери або цифри від 0 до 9',
  maxSymbols: (max: number) => `Максимальна кількість символів - ${max}`,
};

const store = createStore<RootStateInterface>({});

describe('AddHouseForm.vue', () => {
  let wrapper: VueWrapper<any>;
  let fields: { [key: string]: DOMWrapper<HTMLElement> };

  beforeEach(() => {
    wrapper = mount(AddHouseForm, {
      global: {
        provide: {
          store: store,
        },
      },
      props: {
        id: 2,
      },
    });

    fields = {
      flatQuantity: wrapper.find('#flatQuantity'),
      houseArea: wrapper.find('#houseArea'),
      adjoiningArea: wrapper.find('#adjoiningArea'),
      region: wrapper.find('#region'),
      city: wrapper.find('#city'),
      district: wrapper.find('#district'),
      street: wrapper.find('#street'),
      houseBlock: wrapper.find('#houseBlock'),
      houseNumber: wrapper.find('#houseNumber'),
      zipCode: wrapper.find('#zipCode'),
    };
  });

  it('should exist', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe('input fields validation rules', () => {
    const requiredCases = Object.keys(mockFieldValues).map((fieldName: string) => [fieldName]);

    it.each(requiredCases)('%s field should display required validation message', async (fieldName: string) => {
      await inputSetValueHandler(fields[fieldName], '');

      expect(wrapper.find(`small#${fieldName}-help`).text()).toBe(validationMessages.required());
    });

    it.each([
      ['region', 50, longStrings.ukr60],
      ['city', 50, longStrings.ukr60],
      ['district', 50, longStrings.ukr60],
      ['street', 25, longStrings.ukr30],
      ['houseBlock', 10, longStrings.num11],
      ['houseNumber', 10, longStrings.num11],
    ])(
      '%s field should display max (%s) length validation message',
      async (fieldName: string, max: number, longString: string) => {
        await inputSetValueHandler(fields[fieldName], longString);

        expect(wrapper.find(`small#${fieldName}-help`).text()).toBe(validationMessages.maxSymbols(max));
      }
    );

    it.each([
      ['flatQuantity', 'firstDigitNonZero', 0],
      ['houseArea', 'firstDigitNonZero', 0],
      ['adjoiningArea', 'firstDigitNonZero', 0],
      ['region', 'ukrSymbols', 'Рырыры'],
      ['city', 'ukrSymbols', 'Рырыры'],
      ['district', 'ukrSymbols', 'Рырыры'],
      ['street', 'ukrSymbols', 'Рырыры'],
      ['houseBlock', 'house', 'S/3'],
      ['houseNumber', 'house', 'R-1'],
      ['zipCode', 'zipCode', 1234],
    ])(
      '%s field should display `%s` validation message',
      async (fieldName: string, message: string, value: InputValueType) => {
        await inputSetValueHandler(fields[fieldName], value);

        expect(wrapper.find(`small#${fieldName}-help`).text()).toBe(validationMessages[message]());
      }
    );
  });

  describe('addNewHouse method', () => {
    let addNewHouseBtn: DOMWrapper<HTMLElement>;
    let houseForm: DOMWrapper<HTMLElement>;
    const submitEvent: [string, { preventDefault: () => void }] = ['submit', { preventDefault: () => {} }];

    beforeEach(() => {
      addNewHouseBtn = wrapper.find('#add-new-house-btn');
      houseForm = wrapper.find('#house_data_form');
      wrapper.vm.closeAddHouseModal = jest.fn();
      store.dispatch = jest.fn();
    });

    it('should call addNewHouse method on add house button click', async () => {
      const addNewHouseSpy = jest.spyOn(wrapper.vm, 'addNewHouse');
      await addNewHouseBtn.trigger('click');
      await houseForm.trigger(...submitEvent);
      await wrapper.vm.$nextTick();

      expect(addNewHouseSpy).toBeCalled();
    });

    it('should dispatch action', async () => {
      await addNewHouseBtn.trigger('click');
      await houseForm.trigger(...submitEvent);
      await wrapper.vm.$nextTick();

      expect(store.dispatch).toBeCalled();
    });

    it('should call closeAddHouseModal method', async () => {
      await addNewHouseBtn.trigger('click');
      await houseForm.trigger(...submitEvent);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.closeAddHouseModal).toBeCalled();
    });

    it('should clear fields after submit', async () => {
      Object.keys(fields).forEach(async (field: string) => await fields[field].setValue(mockFieldValues[field]));

      await houseForm.trigger(...submitEvent);

      const isAllFieldsEmpty = !Object.values(fields).some((field) => field.text() !== '');

      expect(isAllFieldsEmpty).toBe(true);
    });
  });

  describe('closeAddHouseModal method', () => {
    let cancelBtn: DOMWrapper<HTMLElement>;

    beforeEach(() => {
      cancelBtn = wrapper.find('#cancel-btn');
    });

    it('should emit event on cancel btn click', async () => {
      await cancelBtn.trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('cancel-addHouseModal')).toBeTruthy();
    });

    it('should call resetHouseDataFields method', async () => {
      wrapper.vm.resetHouseDataFields = jest.fn();
      await cancelBtn.trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.resetHouseDataFields).toBeCalled();
    });
  });
});
