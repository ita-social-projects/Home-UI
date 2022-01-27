import { mount, VueWrapper } from '@vue/test-utils';
import { getters } from '@/store/localstorage/getters';
import { inputSetValueHandler } from '@/utils/test-utils';
import UserLogin from '@/views/UserLogin.vue';

describe('UserLogin.vue', () => {
  let wrapper: VueWrapper<UserLogin>;
  beforeEach(async () => {
    wrapper = mount(UserLogin);
  });

  it('should exists', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should set value to the email input', async () => {
    const emailInput = wrapper.find('#email');
    await emailInput.setValue('test@test.com');
    expect(wrapper.find('#email').element.value).toBe('test@test.com');
  });

  it('should set value to the password input', async () => {
    const passwordInput = wrapper.find('#password');
    await passwordInput.setValue('thisispassword');
    expect(wrapper.find('#password').element.value).toBe('thisispassword');
  });

  it('should pass the validation - email field is required', async () => {
    const emailInput = wrapper.find('#email');
    await emailInput.setValue('test@test.com');
    expect(wrapper.find('small#email-help').exists()).toBe(false);
  });

  it('should pass the validation - password field is required', async () => {
    const passwordInput = wrapper.find('#password');
    await passwordInput.setValue('thisIsPassword');
    expect(wrapper.find('small#password-help').exists()).toBe(false);
  });

  it('should fail the validation - email field is required', async () => {
    await inputSetValueHandler(null, '', '#email', wrapper);
    expect(wrapper.find('small#email-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - password field is required', async () => {
    await inputSetValueHandler(null, '', '#password', wrapper);
    expect(wrapper.find('small#password-help').text()).toBe("Це обов'язкове поле");
  });
});

describe('Mock store', () => {
  const mockStore = {
    state: {
      token: 'YWRtaW5AZXhhbXBsZS5jb206cGFzc3dvckQxMjM=',
    },
    getters: {
      'localStorageStore/isTokenExist': (state: any) => {
        return state.token;
      },
    },
  };

  const wrapper = mount(UserLogin, {
    global: {
      mocks: {
        $store: mockStore,
      },
    },
  });
  it('itinialize with mock store', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('test for checking getter', () => {
    const data = {
      token: false,
    };
    const actual = getters.isTokenExist();
    expect(actual).toEqual(data.token);
  });
});
