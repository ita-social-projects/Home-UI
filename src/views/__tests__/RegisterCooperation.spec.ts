import { shallowMount } from '@vue/test-utils';
import RegisterCooperation from '@/views/RegisterCooperation.vue';

describe('RegisterCooperation.vue', () => {
  it('should exist', () => {
    const wrapper = shallowMount(RegisterCooperation);

    expect(wrapper.exists()).toBeTruthy();
  });
});
