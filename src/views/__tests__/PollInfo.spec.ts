import PollInfo from '@/views/PollInfo.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import store from '@/store';
import { nextTick } from 'vue';

const mockRouter = {
  push: jest.fn(),
};

describe('PollInfo', () => {
  let wrapper: VueWrapper<PollInfo>;
  beforeEach(async () => {
    wrapper = mount(PollInfo, {
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

  it('should be cancel page ', async () => {
    await wrapper.find('#cancel-button').trigger('click');
    await nextTick();
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/main/polls');
  });

  it('function returnAllPollsPage must be work', () => {
    const spy = jest.spyOn(wrapper.vm, 'returnAllPollsPage');
    wrapper.vm.returnAllPollsPage();
    expect(spy).toBeCalled();
  });
});
