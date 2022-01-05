import { VueWrapper, mount, shallowMount } from '@vue/test-utils';
import { ComponentPublicInstance } from 'vue';
import EditCooperationInfo from '@/components/EditCooperationInfo.vue';
import { CooperationAddressInterface } from './../../store/cooperation/types';
import createStore from './../../store/index';

const setup = async (id: string, value: string, wrapper: VueWrapper<ComponentPublicInstance>) => {
  const el = wrapper.find(id);
  await el.setValue(value);
  await el.trigger('blur');
};

describe('EditCooperationInfo.vue', () => {
  const mockStore = {
    getters: jest.fn(),
    dispatch: jest.fn(),
  };
  const wrapper = mount(EditCooperationInfo, {
    global: {
      mocks: {
        $store: mockStore,
      },
    },
    data() {
      return {
        cooperationData: {
          id: 0,
          name: '',
          edrpou: '',
          iban: '',
          phone: '',
          email: '',
          address: {} as CooperationAddressInterface,
        },
      };
    },
    propsData: {
      cooperationId: 1,
    },
  });
  describe('right render with mockStore', () => {
    it('should exist', () => {
      const wrapper = mount(EditCooperationInfo);
      expect(wrapper.exists()).toBeTruthy();
    });

    it('should get required props', () => {
      const wrapper = mount(EditCooperationInfo, {
        propsData: {
          cooperationId: 1,
        },
      });
      expect(wrapper.props().cooperationId).toBe(1);
      expect(wrapper.props('cooperationId')).toBe(1);
    });

    it('should call initData() and emit in mounted', async () => {
      const initDataSpy = jest.spyOn(EditCooperationInfo.methods, 'initData');
      const wrapper = mount(EditCooperationInfo);
      wrapper.vm.$emit('isLoadedMode');

      expect(initDataSpy).toBeCalled();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('isLoadedMode')).toBeTruthy();
    });
  });

  describe('testing store, action, getters', () => {
    const store = createStore({
      state: {
        userCooperations: [
          {
            id: 1,
            name: 'Крила ночі',
            edrpou: 12345678,
            iban: 'UA122115518961158112111881111',
            address: ' Дніпро, Задовський, 12345',
            contacts: [
              { type: 'email', main: true, email: 'admin@email.com' },
              { type: 'phone', main: true, phone: '+380509912832' },
            ],
          },
        ],
        selectedCooperation: 1,
      },
      getters: {
        'cooperationStore/getSelectedCooperation': (state: any) => state.userCooperations,
      },
      actions: {
        'cooperationStore/SET_COOPERATION_UPDATE': () => jest.fn(),
      },
      dispatch: jest.fn(),
    });

    it('should test editCooperationInfo method and dispatch', async () => {
      const editCooperationSpy = jest.spyOn(EditCooperationInfo.methods, 'editCooperationInfo');
      const wrapper = mount(EditCooperationInfo);

      wrapper.find('#edit-coop-btn').trigger('click');
      await wrapper.vm.$nextTick();

      expect(editCooperationSpy).toBeCalled();

      const data = {
        userCooperations: [
          {
            id: 1,
            name: 'Крила ночі',
            edrpou: 12345678,
            iban: 'UA122115518961158112111881111',
            address: ' Дніпро, Задовський, 12345',
            contacts: [
              { type: 'email', main: true, email: 'admin@email.com' },
              { type: 'phone', main: true, phone: '+380509912832' },
            ],
          },
        ],
      };

      expect(store.dispatch).toHaveBeenLastCalledWith('cooperationStore/SET_COOPERATION_UPDATE', data.userCooperations);
    });

    it('testing cooperationInfo getter', async () => {
      const wrapper = mount(EditCooperationInfo);
      const data = {
        userCooperations: [
          {
            id: wrapper.props('cooperationId'),
            name: 'Крила ночі',
            edrpou: 12345678,
            iban: 'UA122115518961158112111881111',
            address: ' Дніпро, Задовський, 12345',
            contacts: [
              { type: 'email', main: true, email: 'admin@email.com' },
              { type: 'phone', main: true, phone: '+380509912832' },
            ],
          },
        ],
        selectedCooperation: 1,
      };

      const actual = store.getters['cooperationStore/getSelectedCooperation'](data);
      expect(actual).toEqual(data.userCooperations);
    });

    it('cancelCooperationEdit method should be called', async () => {
      const cancelCooperationEditSpy = jest.spyOn(EditCooperationInfo.methods, 'cancelCooperationEdit');
      const wrapper = mount(EditCooperationInfo);

      wrapper.find('#cancel-edit-coop-btn').trigger('click');
      await wrapper.vm.$nextTick();

      expect(cancelCooperationEditSpy).toHaveBeenCalled();
    });

    it('test cancelCooperationEdit method', async () => {
      const initDataSpy = jest.spyOn(EditCooperationInfo.methods, 'initData');
      const wrapper = mount(EditCooperationInfo);
      wrapper.vm.$emit('cancel-editCoopInfo');

      wrapper.find('#cancel-edit-coop-btn').trigger('click');
      await wrapper.vm.$nextTick();

      expect(initDataSpy).toHaveBeenCalled();

      expect(wrapper.emitted('cancel-editCoopInfo')).toBeTruthy();
    });
  });

  //   describe('editing cooperationform', () => {
  //     it('editCoopInfo method should be called', async () => {
  //       const editCooperationSpy = jest.spyOn(EditCooperationInfo.methods, 'editCooperationInfo');
  //       const wrapper = mount(EditCooperationInfo);

  //       wrapper.find('#edit-coop-btn').trigger('click');
  //       await wrapper.vm.$nextTick();

  //       expect(editCooperationSpy).toHaveBeenCalled();
  //     });
  //   });
});

// it('should call the init method and emit', async () => {
//   const initSpy = jest.spyOn(EditCooperationInfo.methods, 'initData');
//   const wrapper = shallowMount(EditCooperationInfo);
//   wrapper.vm.$emit('isLoadedMode');

//   expect(initSpy).toBeCalled();
//   await wrapper.vm.$nextTick();

//   expect(wrapper.emitted('isLoadedMode')).toBeTruthy();
// });

// it('tests editCooperationInfo method', async () => {
//   expect(mockStore.dispatch).toHaveBeenCalledWith('cooperationStore/SET_COOPERATION_UPDATE');
//   wrapper.vm.$emit('isLoadedMode');
//   await wrapper.vm.$nextTick();

//   expect(wrapper.emitted('isLoadedMode')).toBeTruthy();
// });

// it('tests initData method', () => {
//     const wrapper = mount(EditCooperationInfo, {
//       data() {
//         return {
//           cooperationData: {
//             id: 0,
//             name: '',
//             edrpou: '',
//             iban: '',
//             phone: '',
//             email: '',
//             address: {} as CooperationAddressInterface,
//           },
//         };
//       },
//     });

//     wrapper.find('#coopName').text();
//     wrapper.find('#coopIban').text();
//     wrapper.find('#coopEmail').text();
//     wrapper.find('#edrpou').text();
//     wrapper.find('#coopPhone').text();
//     wrapper.find('#coopRegion').text();
//     wrapper.find('#coopCity').text();
//     wrapper.find('#coopStreet').text();
//     wrapper.find('#coopDistrict').text();
//     wrapper.find('#coopHouse').text();
//     wrapper.find('#coopBlock').text();
//     wrapper.find('#coopZipCode').text();
//   });
