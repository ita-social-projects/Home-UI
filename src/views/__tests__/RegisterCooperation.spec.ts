import { mount, VueWrapper } from '@vue/test-utils';
import RegisterCooperation from '@/views/RegisterCooperation.vue';
import { inputSetValueHandler } from '@/utils/test-utils';

const validationMessages: { [key: string]: any } = {
  required: "Це обов'язкове поле",
  email: 'Електронна пошта містить латинські букви, цифри, та спеціальні символи',
  edrpou: 'Код ЄДРПОУ складається з 8 цифр',
  firstLastSpecial: 'Перший та останній символи не можуть бути спеціальними',
  minSymbols: `Мінімальна кількість символів - 5`,
  maxSymbols: `Максимальна кількість символів - 320`,
};

const longEmail = `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;

describe('RegisterCooperation.vue', () => {
  let wrapper: VueWrapper<RegisterCooperation>;

  beforeEach(() => {
    wrapper = mount(RegisterCooperation);
  });

  it('should exist', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe('input fields validation rules', () => {
    it.each([
      ['email', 'required', ''],
      ['email', 'email', 'email@emailcom'],
      ['email', 'email', 'emailemail.email'],
      ['email', 'email', 'email@email.email'],
      ['email', 'email', 'email@email.c'],
      ['email', 'firstLastSpecial', 'email@email.com@'],
      ['email', 'firstLastSpecial', '!email@email.com'],
      ['email', 'maxSymbols', longEmail],
      ['email', 'minSymbols', 'eee'],
      ['edrpou', 'required', ''],
      ['edrpou', 'edrpou', '1234567'],
    ])('should display `%s` validation message', async (fieldName: string, message: string, value: string) => {
      await inputSetValueHandler(null, value, `#${fieldName}`, wrapper);

      expect(wrapper.find(`small#${fieldName}-help`).text()).toBe(validationMessages[message]);
    });
  });

  it('should pass the validation - email field', async () => {
    const input = wrapper.find('#email');
    await input.setValue('email@email.com');
    expect(wrapper.find('small#email-help').exists()).toBe(false);
  });

  it('should not display validation message for email on page load', () => {
    expect(wrapper.find('small#email-help').exists()).toBe(false);
  });

  it('should pass the validation - edrpou field', async () => {
    const input = wrapper.find('#edrpou');

    await input.setValue('12345678');
    expect(wrapper.find('small#edrpou-help').exists()).toBe(false);
  });

  it('should not display validation message for edrpou on page load', () => {
    expect(wrapper.find('small#edrpou-help').exists()).toBe(false);
  });
});
