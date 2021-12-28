import { mount, VueWrapper, shallowMount } from '@vue/test-utils';
import CooperationInfo from '@/views/CooperationInfo.vue';
import { ComponentPublicInstance } from 'vue';

const setup = async (id: string, value: string, wrapper: VueWrapper<ComponentPublicInstance>) => {
  const el = wrapper.find(id);
  await el.setValue(value);
  await el.trigger('blur');
};

describe('RegisterCooperation.vue', () => {
  it('should exist', () => {
    const wrapper = shallowMount(CooperationInfo);
    console.log(wrapper.html());
    expect(wrapper.exists()).toBeTruthy();
  });
});
