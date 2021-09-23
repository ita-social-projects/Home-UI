import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('should be exists', () => {
    const wrapper = shallowMount(Home);

    expect(wrapper.exists()).toBeTruthy();
  });
});