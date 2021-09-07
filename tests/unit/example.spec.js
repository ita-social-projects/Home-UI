import { shallowMount } from '@vue/test-utils';
import App from './../../src/App';

describe('App.vue', () => {
  it('should be exists', () => {
    const wrapper = shallowMount(App);

    expect(wrapper.exists()).toBeTruthy();
  });
});
