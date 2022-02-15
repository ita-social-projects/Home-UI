import { VueWrapper, mount } from '@vue/test-utils';
import CooperationInfo from '@/cooperation/components/CooperationInfo.vue';

describe('RegisterCooperation.vue', () => {
  let wrapper: VueWrapper<CooperationInfo>;
  beforeEach(() => {
    wrapper = mount(CooperationInfo);
  });

  it('should exist', () => {
    console.log(wrapper.html());
    expect(wrapper.exists()).toBeTruthy();
  });
});
