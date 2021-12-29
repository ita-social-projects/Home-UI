import { shallowMount, VueWrapper, mount } from '@vue/test-utils';
import AddHouseForm from '@/components/AddHouseForm.vue';
import { ComponentPublicInstance } from 'vue';
import Vuex from 'vuex';

const setup = async (id: string, value: string | number, wrapper: VueWrapper<ComponentPublicInstance>) => {
  const el = wrapper.find(id);
  await el.setValue(value);
  await el.trigger('blur');
};

describe('AddHouseForm.vue', () => {
  let actions: any;
  let store: any;

  beforeEach(() => {
    actions = {
      ADD_HOUSE: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
    });
  });

  it('should exist', () => {
    const wrapper = shallowMount(AddHouseForm);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should set the value in the quantity flat field', async () => {
    const wrapper = mount(AddHouseForm);
    const input = wrapper.find('#flatQuantity');
    await input.setValue('314');
    expect(input.element._value).toBe('314');
  });

  it('should set the value in the house area field', async () => {
    const wrapper = mount(AddHouseForm);
    const input = wrapper.find('#houseArea');
    await input.setValue('244.12');
    expect(input.element._value).toBe('244.12');
  });

  it('should set the value in the adjoining area field', async () => {
    const wrapper = mount(AddHouseForm);
    const input = wrapper.find('#adjoiningArea');
    await input.setValue('26');
    expect(input.element._value).toBe('26');
  });

  it('should set the value in the region field', async () => {
    const wrapper = mount(AddHouseForm);
    const input = wrapper.find('#region');
    await input.setValue('Дніпропетровський');
    expect(input.element._value).toBe('Дніпропетровський');
  });

  it('should set the value in the city field', async () => {
    const wrapper = mount(AddHouseForm);
    const input = wrapper.find('#city');
    await input.setValue('Дніпро');
    expect(input.element._value).toBe('Дніпро');
  });

  it('should set the value in the district field', async () => {
    const wrapper = mount(AddHouseForm);
    const input = wrapper.find('#district');
    await input.setValue('Задовський');
    expect(input.element._value).toBe('Задовський');
  });

  it('should set the value in the street field', async () => {
    const wrapper = mount(AddHouseForm);
    const input = wrapper.find('#street');
    await input.setValue('Воронцова');
    expect(input.element._value).toBe('Воронцова');
  });

  it('should set the value in the house block field', async () => {
    const wrapper = mount(AddHouseForm);
    const input = wrapper.find('#houseBlock');
    await input.setValue('Воронцова');
    expect(input.element._value).toBe('Воронцова');
  });

  it('should set the value in the street field', async () => {
    const wrapper = mount(AddHouseForm);
    const input = wrapper.find('#street');
    await input.setValue('9/Н');
    expect(input.element._value).toBe('9/Н');
  });

  it('should set the value in the house number field', async () => {
    const wrapper = mount(AddHouseForm);
    const input = wrapper.find('#houseNumber');
    await input.setValue('2-П');
    expect(input.element._value).toBe('2-П');
  });

  it('should set the value in the zip code field', async () => {
    const wrapper = mount(AddHouseForm);
    const input = wrapper.find('#zipCode');
    await input.setValue('52956');
    expect(input.element._value).toBe('52956');
  });

  it('should fail the validation - flat quantity field [is required]', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#flatQuantity', '', wrapper);
    expect(wrapper.find('small#flatQuantity-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - house area field [is required]', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#houseArea', '', wrapper);
    expect(wrapper.find('small#houseArea-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - adjoining area field [is required]', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#adjoiningArea', '', wrapper);
    expect(wrapper.find('small#adjoiningArea-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - region field [is required]', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#region', '', wrapper);
    expect(wrapper.find('small#region-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - city field [is required]', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#city', '', wrapper);
    expect(wrapper.find('small#city-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - district field [is required]', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#district', '', wrapper);
    expect(wrapper.find('small#district-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - street field [is required]', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#street', '', wrapper);
    expect(wrapper.find('small#street-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - house block field [is required]', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#houseBlock', '', wrapper);
    expect(wrapper.find('small#houseBlock-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - house number field [is required]', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#houseNumber', '', wrapper);
    expect(wrapper.find('small#houseNumber-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - zipCode field [is required]', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#zipCode', '', wrapper);
    expect(wrapper.find('small#zipCode-help').text()).toBe("Це обов'язкове поле");
  });

  it("should fail the validation - flat quantity field mustn't be zero", async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#flatQuantity', 0, wrapper);
    expect(wrapper.find('small#flatQuantity-help').text()).toBe('Перша цифра не може бути 0');
  });

  it("should fail the validation - house area field mustn't be zero", async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#houseArea', 0, wrapper);
    expect(wrapper.find('small#houseArea-help').text()).toBe('Перша цифра не може бути 0');
  });

  it("should fail the validation - adjoining area field mustn't be zero", async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#adjoiningArea', 0, wrapper);
    expect(wrapper.find('small#adjoiningArea-help').text()).toBe('Перша цифра не може бути 0');
  });

  it('should fail the validation - region field should contain ukr letters', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#region', 'Рырыры', wrapper);
    expect(wrapper.find('small#region-help').text()).toBe('Це поле має містити українські літери');
  });

  it('should fail the validation - city field should contain ukr letters', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#city', 'Рырыры', wrapper);
    expect(wrapper.find('small#city-help').text()).toBe('Це поле має містити українські літери');
  });

  it('should fail the validation - district field should contain ukr letters', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#district', 'Рырыры', wrapper);
    expect(wrapper.find('small#district-help').text()).toBe('Це поле має містити українські літери');
  });

  it('should fail the validation - street field should contain ukr letters', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#street', 'Рырыры', wrapper);
    expect(wrapper.find('small#street-help').text()).toBe('Це поле має містити українські літери');
  });

  it('should fail the validation - zipCode field should contain 5 integer symbols ', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#zipCode', 1234, wrapper);
    expect(wrapper.find('small#zipCode-help').text()).toBe('В назві мають бути 5 цифр від 0 до 9');
  });

  it('should fail the validation - house block field should contain ukr letters and integers', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#houseBlock', 'S/3', wrapper);
    expect(wrapper.find('small#houseBlock-help').text()).toBe(
      'Це поле має містити українські літери або цифри від 0 до 9'
    );
  });

  it('should fail the validation - house number field should contain ukr letters and integers', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#houseNumber', 'R-1', wrapper);
    expect(wrapper.find('small#houseNumber-help').text()).toBe(
      'Це поле має містити українські літери або цифри від 0 до 9'
    );
  });

  it('should fail the validation - max house block length is 10 ', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#houseBlock', 'Пррррррррррр2р', wrapper);
    expect(wrapper.find('small#houseBlock-help').text()).toBe('Максимальна кількість символів - 10');
  });

  it('should fail the validation - max house number length is 10', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#houseNumber', 'Прррррррррррр1', wrapper);
    expect(wrapper.find('small#houseNumber-help').text()).toBe('Максимальна кількість символів - 10');
  });

  it('should fail the validation - max region field length is 50', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#region', 'Сссссссссссссссссссссссссссссссссссссссссссссссссссссссссссс', wrapper);
    expect(wrapper.find('small#region-help').text()).toBe('Максимальна кількість символів - 50');
  });

  it('should fail the validation - max city field length is 50', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#city', 'Сссссссссссссссссссссссссссссссссссссссссссссссссссссссссссс', wrapper);
    expect(wrapper.find('small#city-help').text()).toBe('Максимальна кількість символів - 50');
  });

  it('should fail the validation - max district field length is 50', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#district', 'Сссссссссссссссссссссссссссссссссссссссссссссссссссссссссссс', wrapper);
    expect(wrapper.find('small#district-help').text()).toBe('Максимальна кількість символів - 50');
  });

  it('should fail the validation - max street field length is 25', async () => {
    const wrapper = mount(AddHouseForm);
    await setup('#street', 'Аааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааа', wrapper);
    expect(wrapper.find('small#street-help').text()).toBe('Максимальна кількість символів - 25');
  });

  it('props', () => {
    const wrapper = mount(AddHouseForm, {
      propsData: {
        id: 918,
      },
    });
    expect(wrapper.props().id).toBe(918);
  });

  it('test method addNewHouse', async () => {
    const addNewHouse = jest.spyOn(AddHouseForm.methods, 'addNewHouse');
    const wrapper = shallowMount(AddHouseForm, { global: { plugins: [store] } });
    wrapper.find('#house_data_form').trigger('submit', {
      preventDefault: () => {},
    });
    expect(addNewHouse).toBeCalled();
    expect(actions.ADD_HOUSE).toHaveBeenCalled();
  });
});
