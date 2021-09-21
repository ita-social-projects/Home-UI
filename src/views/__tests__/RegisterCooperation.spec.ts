import { mount } from '@vue/test-utils';
import RegisterCooperation from '@/views/RegisterCooperation.vue';

describe('RegisterCooperation.vue', () => {
  it('should exist', () => {
    const wrapper = mount(RegisterCooperation);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should set the value in the email field', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#email');

    await input.setValue('email@email.com');
    expect(input.element._value).toBe('email@email.com');
  });

  it('should set the value in the edrpou field', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#edrpou');

    await input.setValue('12345678');
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

  // it('should pass the validation - email is not registered', async () => {
  //   const wrapper = mount(RegisterCooperation);  // jest.mock('@/utils/__mocks__/http-common');
  //   const input = wrapper.find('#email');
  //   await input.setValue('email@email.com');
  //   await input.trigger('blur');
  //   expect(http.get).toHaveBeenCalledTimes(1);
  //   expect(http.get).toHaveBeenCalledWith('/users');
  //   await flushPromises();
  //   expect(wrapper.find('small#email-help').exists()).toBe(false);
  // });

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
    const input = wrapper.find('#email');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.find('small#email-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - email field [less than 5 symbols]', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#email');
    await input.setValue('eee');
    await input.trigger('blur');

    expect(wrapper.find('small#email-help').text()).toBe('Мінімальна довжина електронної пошти - 5 символів');
  });

  it('should fail the validation - email field [more than 320 symbols]', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#email');
    const longEmail = `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
    await input.setValue(longEmail);
    await input.trigger('blur');

    expect(wrapper.find('small#email-help').text()).toBe('Максимальна довжина електронної пошти - 320 символів');
  });

  it('should fail the validation - email field [first symbol is a special symbol]', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#email');
    await input.setValue('!email@email.com');
    await input.trigger('blur');

    expect(wrapper.find('small#email-help').text()).toBe('Перший та останній символи не можуть бути спеціальними');
  });

  it('should fail the validation - email field [last symbol is a special symbol]', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#email');
    await input.setValue('email@email.com@');
    await input.trigger('blur');

    expect(wrapper.find('small#email-help').text()).toBe('Перший та останній символи не можуть бути спеціальними');
  });

  it('should fail the validation - email field [domain name less than 2 symbols]', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#email');
    await input.setValue('email@email.c');
    await input.trigger('blur');

    expect(wrapper.find('small#email-help').text()).toBe(
      'Електронна пошта містить латинські букви, цифри, та спеціальні символи'
    );
  });

  it('should fail the validation - email field [domain name more than 4 symbols]', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#email');
    await input.setValue('email@email.email');
    await input.trigger('blur');

    expect(wrapper.find('small#email-help').text()).toBe(
      'Електронна пошта містить латинські букви, цифри, та спеціальні символи'
    );
  });

  it('should fail the validation - email field [must contain @ symbol]', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#email');
    await input.setValue('emailemail.com');
    await input.trigger('blur');

    expect(wrapper.find('small#email-help').text()).toBe(
      'Електронна пошта містить латинські букви, цифри, та спеціальні символи'
    );
  });

  it('should fail the validation - email field [must contain domain name]', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#email');
    await input.setValue('email@emailcom');
    await input.trigger('blur');

    expect(wrapper.find('small#email-help').text()).toBe(
      'Електронна пошта містить латинські букви, цифри, та спеціальні символи'
    );
  });

  /// edrpou

  it('should fail the validation - edrpou field [is required]', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#edrpou');

    await input.trigger('focus');
    await input.trigger('blur');
    expect(wrapper.find('small#edrpou-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - edrpou field [less than 8 symbols]', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#edrpou');

    await input.setValue('1234567');
    await input.trigger('blur');
    expect(wrapper.find('small#edrpou-help').text()).toBe('Код ЄДРПОУ складається з 8 цифр');
  });

  it('should fail the validation - edrpou field [already registered]', async () => {
    const wrapper = mount(RegisterCooperation);
    const input = wrapper.find('#edrpou');

    await input.setValue('1234567');
    await input.trigger('blur');
    expect(wrapper.find('small#edrpou-help').text()).toBe('Код ЄДРПОУ складається з 8 цифр');
  });

  // Submit button
  /// Is enabled

  // it('should display success message on submit', async () => {
  //   const wrapper = mount(RegisterCooperation);
  //   const emailInput = wrapper.find('#email');
  //   const edrpouInput = wrapper.find('#edrpou');
  //   const submit = wrapper.find('button[type="submit"]');
  //
  //   await emailInput.setValue('email@email.com');
  //   await emailInput.trigger('blur');
  //   await edrpouInput.setValue('00002222');
  //
  //   await edrpouInput.trigger('blur');
  //   await submit.trigger('click');
  //   await flushPromises();
  //   expect(wrapper.get('.popup.success').isVisible()).toBe(true);
  // });
});
