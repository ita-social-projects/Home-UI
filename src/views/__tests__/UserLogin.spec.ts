import { mount } from '@vue/test-utils';
import UserLogin from '@/views/UserLogin.vue';

describe('UserLogin.vue', () => {
  it('should exists', () => {
    const wrapper = mount(UserLogin);
    expect(wrapper.exists()).toBeTruthy();
  });
});

