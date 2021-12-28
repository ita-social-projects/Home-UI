import { mount } from '@vue/test-utils';
import ManageUser from '@/views/ManageUser.vue';
import store from '@/store';

describe('ManageUser', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(ManageUser, {
      global: {
        plugins: [store],
      },
    });
  });

  it('should exist', () => {
    console.log(wrapper.html());
    expect(wrapper.exists()).toBeTruthy();
  });
});
