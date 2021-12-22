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

  it('should set the value in the email field', async () => {
    const wrapper = mount(AddApartmentForm);
    const input = wrapper.find('#email');
    await input.setValue('email@email.com');
    expect(input.element._value).toBe('email@email.com');
  });

  it('should set the value in the edrpou field', async () => {
    const wrapper = mount(AddApartmentForm);
    const input = wrapper.find('#edrpou');
    await input.setValue('12345678');
    expect(input.element._value).toBe('12345678');
  });

  it('should pass the validation - email field', async () => {
    const wrapper = mount(AddApartmentForm);
    const input = wrapper.find('#email');
    await input.setValue('email@email.com');
    expect(wrapper.find('small#email-help').exists()).toBe(false);
  });

  it('should fail the validation - email field [is required]', async () => {
    const wrapper = mount(AddApartmentForm);
    await setup('#email', '', wrapper);
    expect(wrapper.find('small#email-help').text()).toBe("Це обов'язкове поле");
  });
});
