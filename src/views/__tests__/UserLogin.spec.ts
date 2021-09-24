import { mount } from '@vue/test-utils';
import UserLogin from '@/views/UserLogin.vue';

describe('UserLogin.vue', () => {
  it('should be exists', () => {
    const wrapper = mount(UserLogin);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should set the value in the email field', async () => {
    const wrapper = mount(UserLogin);
    const input = wrapper.find('#email');
    await input.setValue('email@email.com');
    expect(input.element._value).toBe('email@email.com');
  });

  it('should set the value in the password field', async () => {
    const wrapper = mount(UserLogin);
    const input = wrapper.find('#password');
    await input.setValue('12345678');
    expect(input.element._value).toBe('12345678');
  });
});
