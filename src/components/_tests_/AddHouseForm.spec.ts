import { shallowMount } from '@vue/test-utils';
import AddHouseForm from '@/components/AddHouseForm.vue';

describe('AddHouseForm.vue', () => {
  it('should be exists', () => {
    const wrapper = shallowMount(AddHouseForm);

    expect(wrapper.exists()).toBeTruthy();
  });
});
