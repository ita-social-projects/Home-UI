import { nextTick } from 'vue';
import { createStore } from 'vuex';
import { mount, VueWrapper } from '@vue/test-utils';
import store from '@/store';
import { getters } from '@/store/authorization/getters';
import { inputSetValueHandler } from '@/utils/test-utils';
import ManageUser from '@/views/ManageUser.vue';

const mockRouter = {
  push: jest.fn(),
};

describe('ManageUser', () => {
  let wrapper: VueWrapper<ManageUser>;
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

  it('should fail the validation - firstName field [is required]', async () => {
    await inputSetValueHandler(null, '', '#firstName', wrapper);
    expect(wrapper.find('small#firstName-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - middleName field [is required]', async () => {
    await inputSetValueHandler(null, '', '#middleName', wrapper);
    expect(wrapper.find('small#middleName-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - lastname field [is required]', async () => {
    await inputSetValueHandler(null, '', '#lastname', wrapper);
    expect(wrapper.find('small#lastname-help').text()).toBe("Це обов'язкове поле");
  });

  it('should be cancel page ', async () => {
    await wrapper.find('#cancel-button').trigger('click');
    await nextTick();
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/main');
  });

  it('should be open Main', async () => {
    await wrapper.find('#submit-btn').trigger('click');
    await nextTick();
    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/main');
  });

  it('input firstName must contains name from store', async () => {
    const input = await wrapper.find('#firstName');
    expect(input.element.value).toEqual(store.state.authorizationStore.user.firstName);
  });

  it('input middleName must contains name from store', async () => {
    const input = await wrapper.find('#middleName');
    expect(input.element.value).toEqual(store.state.authorizationStore.user.firstName);
  });

  it('input lastname must contains name from store', async () => {
    const input = await wrapper.find('#lastname');
    expect(input.element.value).toEqual(store.state.authorizationStore.user.firstName);
  });

  it('getter must be like a state ', () => {
    const actual = getters.userData(store.state.authorizationStore);
    expect(actual).toBe(store.state.authorizationStore.user);
  });

  it('function onSubmit must be work', async () => {
    const spy = jest.spyOn(wrapper.vm, 'onSubmit');
    wrapper.vm.onSubmit();
    expect(spy).toBeCalled();
  });

  it('function deleteContact must be work', async () => {
    const spy = jest.spyOn(wrapper.vm, 'deleteContact');
    wrapper.vm.deleteContact();
    expect(spy).toBeCalled();
  });

  it('function addContact must be work', async () => {
    const spy = jest.spyOn(wrapper.vm, 'addContact');
    wrapper.vm.addContact();
    expect(spy).toBeCalled();
  });

  describe('Mock store', () => {
    const mockStore = {
      state: {
        user: {
          first_name: 'Alex',
          middle_name: 'Petrovich',
          last_name: 'Petrov',
          email: 'admin@ukr.net',
          id: 1,
          contacts: [
            {
              type: 'email',
              main: true,
              email: 'admin@ukr.net',
              phone: 'number',
              id: 4,
            },
            {
              type: 'phone',
              main: true,
              email: '+380678889900',
              phone: 'number',
              id: 4,
            },
          ],
        },
      },
      getters: {
        'authorizationStore/userData': (state: any) => {
          return state.user;
        },
      },
      dispatch: jest.fn(),
    };

    wrapper = mount(ManageUser, {
      global: {
        mocks: {
          $store: mockStore,
        },
      },
    });
    it('initial with mock state', () => {
      expect(wrapper.exists()).toBeTruthy();
    });

    it('test for checking getter', () => {
      const data = {
        user: {
          firstName: 'Alex',
          middleName: 'Alex',
          lastName: 'Alex',
          email: 'fff@jj.ff',
          id: 0,
          contacts: [],
        },
      };
      const actual = getters.userData(data);
      expect(actual).toBe(data.user);
    });
  });

  describe('Create store', () => {
    const storeNew = createStore({
      state: {
        user: {
          first_name: 'Alex',
          middle_name: 'Petrovich',
          last_name: 'Petrov',
          email: 'admin@ukr.net',
          id: 1,
          contacts: [
            {
              type: 'email',
              main: true,
              email: 'admin@ukr.net',
              phone: 'number',
              id: 4,
            },
            {
              type: 'phone',
              main: true,
              email: '+380678889900',
              phone: 'number',
              id: 4,
            },
          ],
        },
      },
      getters: {
        'authorizationStore/userData': (state: any) => {
          return state.user;
        },
      },
      actions: {
        'authorizationStore/GET_DATA': () => jest.fn(),
      },
    });

    it('length of rendered list of contact should be equal to length of state.user.contacts', () => {
      wrapper = mount(ManageUser, {
        global: {
          plugins: [storeNew],
        },
      });
      const contactListLength = storeNew.state.user.contacts.length;
      expect(wrapper.findAll('.contact-tr')).toHaveLength(contactListLength);
    });
  });
});
