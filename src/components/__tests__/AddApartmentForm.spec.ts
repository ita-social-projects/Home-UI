import { mount, VueWrapper } from '@vue/test-utils';
import AddApartmentForm from '@/components/AddApartmentForm.vue';
import { ComponentPublicInstance } from 'vue';

const setup = async (id: string, value: string, wrapper: VueWrapper<ComponentPublicInstance>) => {
  const el = wrapper.find(id);
  await el.setValue(value);
  await el.trigger('blur');
};

describe('AddApartmentForm.vue', () => {
  it('should exist', () => {
    const wrapper = mount(AddApartmentForm);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should set the value in the apartment_number field', async () => {
    const wrapper = mount(AddApartmentForm);
    const input = wrapper.find('#apartment_number');
    await input.setValue('123');
    expect(input.element._value).toBe('123');
  });

  it('should set the value in the apartment_area field', async () => {
    const wrapper = mount(AddApartmentForm);
    const input = wrapper.find('#apartment_area');
    await input.setValue('123');
    expect(input.element._value).toBe('123');
  });

  it('should pass the validation - apartment_number field', async () => {
    const wrapper = mount(AddApartmentForm);
    const input = wrapper.find('#apartment_number');
    await input.setValue('123');
    expect(wrapper.find('small#apartment_number_help').exists()).toBe(false);
  });

  it('should pass the validation - apartment_area field', async () => {
    const wrapper = mount(AddApartmentForm);
    const input = wrapper.find('#apartment_area');
    await input.setValue('123');
    expect(wrapper.find('small#apartment_area_help').exists()).toBe(false);
  });

  it('should fail the validation - apartment_number field [is required]', async () => {
    const wrapper = mount(AddApartmentForm);
    await setup('#apartment_number', '', wrapper);
    expect(wrapper.find('small#apartment_number_help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - apartment_area field [is required]', async () => {
    const wrapper = mount(AddApartmentForm);
    await setup('#apartment_area', '', wrapper);
    expect(wrapper.find('small#apartment_area_help').text()).toBe("Це обов'язкове поле");
  });

  it('apartment-saved emit test', async () => {
    const wrapper = mount(AddApartmentForm);
    wrapper.vm.$emit('apartment-saved');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('apartment-saved')).toBeTruthy();
    expect(wrapper.emitted()).toHaveProperty('apartment-saved');
  });

  it('cancel-editing emit test', async () => {
    const wrapper = mount(AddApartmentForm);
    wrapper.vm.$emit('cancel-editing');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('cancel-editing')).toBeTruthy();
    expect(wrapper.emitted()).toHaveProperty('cancel-editing');
  });

  it('props check', () => {
    const wrapper = mount(AddApartmentForm, {
      props: {
        houseId: 5,
      },
    });
    expect(wrapper.props('houseId')).toBe(5);
  });

  it('test method cancelEditing', async () => {
    const cancelEditing = jest.spyOn(AddApartmentForm.methods, 'cancelEditing');
    const wrapper = mount(AddApartmentForm);
    wrapper.find('#cancel-button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(cancelEditing).toBeCalled();
  });

  it('test method saveApartment', async () => {
    const saveApartment = jest.spyOn(AddApartmentForm.methods, 'saveApartment');
    const wrapper = mount(AddApartmentForm);
    wrapper.find('#save-button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(saveApartment).toBeCalled();
  });

  test('emit check test', async () => {
    const wrapper = mount(AddApartmentForm);
    await wrapper.find('#save-button').trigger('click');
    console.log(wrapper.emitted());
    expect(wrapper.emitted()).toBeTruthy();
  });

  it('test method saveApartment and clear', async () => {
    const wrapper = mount(AddApartmentForm);
    wrapper.find('#apartment_number').setValue('123');
    wrapper.find('#apartment_area').setValue(555);
    wrapper.find('#save-button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('#apartment_area').text()).toBe('');
    expect(wrapper.find('#apartment_number').text()).toBe('');
  });

  it('test jest.fn', async () => {
    const returnsTrue = jest.fn(() => true);
    console.log(returnsTrue());
    expect(returnsTrue.mock.calls);
  });
});
