import {  mount, VueWrapper } from '@vue/test-utils';
import ManageUser from '@/views/ManageUser.vue';
import store from '@/store';
import { ComponentPublicInstance } from 'vue';

const setup = async (id: string, value: string, wrapper: VueWrapper<ComponentPublicInstance>) => {
  const el = wrapper.find(id);
  await el.setValue(value);
  await el.trigger('blur');
};

const mockRouter = {
  push: jest.fn(),
};

describe('ManageUser', () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(ManageUser, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  it('should exist', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should set the value in the input firstname', async () => {
    const input = await wrapper.find('#firstName');
    await input.setValue('Alex');
    expect(input.element._value).toBe('Alex');
  });

  it('should set the value in the input middleName', async () => {
    const input = await wrapper.find('#middleName');
    await input.setValue('Alex');
    expect(input.element._value).toBe('Alex');
  });

  it('should set the value in the input lastname', async () => {
    const input = await wrapper.find('#lastname');
    await input.setValue('Alex');
    expect(input.element._value).toBe('Alex');
  });

  it('should fail the validation - firstName field [is required]', async () => {
    await setup('#firstName', '', wrapper);
    expect(wrapper.find('small#firstName-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - middleName field [is required]', async () => {
    await setup('#middleName', '', wrapper);
    expect(wrapper.find('small#middleName-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - lastname field [is required]', async () => {
    await setup('#lastname', '', wrapper);
    expect(wrapper.find('small#lastname-help').text()).toBe("Це обов'язкове поле");
  });

  it('should be cancel page ', async () => {
    await wrapper.find('#cancel-button').trigger('click');
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
  });

  it('should ', async () => {
    await wrapper.find('#submit-btn').trigger('click');
    expect(mockRouter.push).toHaveBeenCalled();
  });
});
