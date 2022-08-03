import { mount } from '@vue/test-utils';
import CooperationPolls from '@/polls/CooperationPolls.vue';
import { createStore } from 'vuex';
import { getters } from '@/polls/store/getters';
import { PollStatusType } from '@/polls/store/types';

describe('Register user', () => {
  describe('testing render with mock store', () => {
    const mockStore = {
      getters: jest.fn(),
      dispatch: jest.fn(),
    };
    const wrapper = mount(CooperationPolls, {
      global: {
        stubs: {
          BaseCooperationPoll: false,
        },
        mocks: {
          $store: mockStore,
        },
      },
    });

    it('should initialize correctly', () => {
      expect(wrapper.exists()).toBeTruthy();
    });
    it('shuold call dispatch in mount', () => {
      expect(mockStore.dispatch).toHaveBeenCalledWith('pollsStore/SET_COOPERATION_POLLS');
    });
  });
  describe('testing real store, getters, dispatch', () => {
    const store = createStore({
      state: {
        cooperationPolls: [
          {
            id: 1,
            header: 'New poll for our houses',
            creationDate: '23.10.2021, 06:00:00',
            completionDate: '20.10.2021, 18:39:41',
            polledHouses: [],
            status: 'active' as PollStatusType,
            type: 'simple',
          },
          {
            id: 2,
            header: 'Next poll',
            creationDate: '25.10.2021, 06:00:00',
            completionDate: '19.10.2021, 18:39:41',
            polledHouses: [],
            status: 'active' as PollStatusType,
            type: 'simple',
          },
        ],
      },
      getters: {
        'pollsStore/getPolls': (state) => state.cooperationPolls,
      },
      actions: {
        'pollsStore/SET_COOPERATION_POLLS': () => jest.fn(),
        'pollsStore/SET_SELECTED_POLL': () => jest.fn(),
      },
    });

    it('testing polls getter', () => {
      const data = {
        cooperationPolls: [
          {
            id: 1,
            header: 'New poll for our houses',
            creationDate: '23.10.2021, 06:00:00',
            completionDate: '20.10.2021, 18:39:41',
            polledHouses: [],
            status: 'active' as PollStatusType,
            type: 'simple',
          },
          {
            id: 2,
            header: 'Next poll',
            creationDate: '25.10.2021, 06:00:00',
            completionDate: '19.10.2021, 18:39:41',
            polledHouses: [],
            status: 'active' as PollStatusType,
            type: 'simple',
          },
        ],
        selectedPoll: null,
        displayModal: false,
      };
      const actual = getters.getPolls(data);
      expect(actual).toEqual(data.cooperationPolls);
    });
    it('length of rendered list of polls should be equal to length of state.cooperationPolls', () => {
      const wrapper = mount(CooperationPolls, {
        global: {
          plugins: [store],
        },
      });
      const pollsListLength = store.state.cooperationPolls.length;
      expect(wrapper.findAll('.poll')).toHaveLength(pollsListLength);
    });
    it('polls should render correct on page', () => {
      const wrapper = mount(CooperationPolls, {
        global: {
          plugins: [store],
        },
      });
      expect(wrapper.html()).toContain('New poll for our houses');
      expect(wrapper.html()).toContain('Next poll');
    });
    it('click on poll should set selected poll and dispatch this selected poll', async () => {
      store.dispatch = jest.fn();
      const setSelectedPoll = jest.spyOn(CooperationPolls.methods, 'setSelectedPoll');

      const wrapper = mount(CooperationPolls, {
        global: {
          plugins: [store],
        },
      });

      const testPollIndex = 0;
      const id = store.state.cooperationPolls[testPollIndex].id;
      const polls = wrapper.findAll('.poll');
      polls[testPollIndex].trigger('click');

      await wrapper.vm.$nextTick();
      expect(setSelectedPoll).toBeCalledWith(id);
      expect(store.dispatch).toHaveBeenLastCalledWith('pollsStore/SET_SELECTED_POLL', id);
    });
  });
});
