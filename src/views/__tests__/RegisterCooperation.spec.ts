import { mount, VueWrapper } from '@vue/test-utils';
import RegisterCooperation from '@/views/RegisterCooperation.vue';
import { ComponentPublicInstance } from 'vue';

const setup = async (id: string, value: string, wrapper: VueWrapper<ComponentPublicInstance>) => {
  const el = wrapper.find(id);
  await el.setValue(value);
  await el.trigger('blur');
};

describe('RegisterCooperation.vue', () => {
  it('should exist', () => {
    const wrapper = mount(RegisterCooperation);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should set the value in the email field', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#email');
    await input.setValue('email@email.com');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(input.element._value).toBe('email@email.com');
  });

  it('should set the value in the edrpou field', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#edrpou');
    await input.setValue('12345678');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(input.element._value).toBe('12345678');
  });

  // validation passes
  /// email

  it('should pass the validation - email field', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#email');
    await input.setValue('email@email.com');
    expect(wrapper.find('small#email-help').exists()).toBe(false);
  });

  it('should not display validation message for email on page load', () => {
    const wrapper = mount(RegisterCooperation);
    expect(wrapper.find('small#email-help').exists()).toBe(false);
  });

  /// edrpou

  it('should pass the validation - edrpou field', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#edrpou');

    await input.setValue('12345678');
    expect(wrapper.find('small#edrpou-help').exists()).toBe(false);
  });

  it('should not display validation message for edrpou on page load', () => {
    const wrapper = mount(RegisterCooperation);
    expect(wrapper.find('small#edrpou-help').exists()).toBe(false);
  });

  // validation fails with messages
  /// email

  it('should fail the validation - email field [is required]', async () => {
    const wrapper = mount(RegisterCooperation);
    await setup('#email', '', wrapper);
    expect(wrapper.find('small#email-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - email field [less than 5 symbols]', async () => {
    const wrapper = mount(RegisterCooperation);
    await setup('#email', 'eee', wrapper);
    expect(wrapper.find('small#email-help').text()).toBe('Мінімальна довжина електронної пошти - 5 символів');
  });

  it('should fail the validation - email field [more than 320 symbols]', async () => {
    const wrapper = mount(RegisterCooperation);
    const longEmail = `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
    await setup('#email', longEmail, wrapper);
    expect(wrapper.find('small#email-help').text()).toBe('Максимальна довжина електронної пошти - 320 символів');
  });

  it('should fail the validation - email field [first symbol is a special symbol]', async () => {
    const wrapper = mount(RegisterCooperation);
    await setup('#email', '!email@email.com', wrapper);
    expect(wrapper.find('small#email-help').text()).toBe('Перший та останній символи не можуть бути спеціальними');
  });

  it('should fail the validation - email field [last symbol is a special symbol]', async () => {
    const wrapper = mount(RegisterCooperation);
    await setup('#email', 'email@email.com@', wrapper);
    expect(wrapper.find('small#email-help').text()).toBe('Перший та останній символи не можуть бути спеціальними');
  });

  it('should fail the validation - email field [domain name less than 2 symbols]', async () => {
    const wrapper = mount(RegisterCooperation);
    await setup('#email', 'email@email.c', wrapper);
    expect(wrapper.find('small#email-help').text()).toBe(
      'Електронна пошта містить латинські букви, цифри, та спеціальні символи'
    );
  });

  it('should fail the validation - email field [domain name more than 4 symbols]', async () => {
    const wrapper = mount(RegisterCooperation);
    await setup('#email', 'email@email.email', wrapper);
    expect(wrapper.find('small#email-help').text()).toBe(
      'Електронна пошта містить латинські букви, цифри, та спеціальні символи'
    );
  });

  it('should fail the validation - email field [must contain @ symbol]', async () => {
    const wrapper = mount(RegisterCooperation);
    await setup('#email', 'emailemail.email', wrapper);
    expect(wrapper.find('small#email-help').text()).toBe(
      'Електронна пошта містить латинські букви, цифри, та спеціальні символи'
    );
  });

  it('should fail the validation - email field [must contain domain name]', async () => {
    const wrapper = mount(RegisterCooperation);
    await setup('#email', 'email@emailcom', wrapper);
    expect(wrapper.find('small#email-help').text()).toBe(
      'Електронна пошта містить латинські букви, цифри, та спеціальні символи'
    );
  });

  /// edrpou

  it('should fail the validation - edrpou field [is required]', async () => {
    const wrapper = mount(RegisterCooperation);
    await setup('#edrpou', '', wrapper);
    expect(wrapper.find('small#edrpou-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - edrpou field [less than 8 symbols]', async () => {
    const wrapper = mount(RegisterCooperation);
    await setup('#edrpou', '1234567', wrapper);
    expect(wrapper.find('small#edrpou-help').text()).toBe('Код ЄДРПОУ складається з 8 цифр');
  });
});
