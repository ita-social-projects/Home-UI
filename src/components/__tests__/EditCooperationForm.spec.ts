import { VueWrapper, mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { inputSetValueHandler } from '@/utils/test-utils';
import EditCooperationInfo from '@/components/EditCooperationInfo.vue';
import { CooperationAddressInterface } from '@/store/cooperation/types';

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
          id: 1,
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
      expect(wrapper.exists()).toBeTruthy();
    });

    it('should get required props', () => {
      expect(wrapper.props().cooperationId).toBe(1);
      expect(wrapper.props('cooperationId')).toBe(1);
    });

    it('initData should be called and event should emit in mounted hook', async () => {
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
        userCooperations: {
          id: 1,
          name: 'Крила ночі',
          edrpou: '12345678',
          iban: 'UA122115518961158112111881111',
          address: {
            region: 'Дніпропетровський',
            city: 'Дніпро',
            district: 'Задовський',
            street: 'Моторна',
            houseBlock: '11',
            houseNumber: '12',
            zipCode: '12345',
          },
          contacts: [
            { type: 'email', main: true, email: 'admin@email.com' },
            { type: 'phone', main: true, phone: '+380509912832' },
          ],
        },
        selectedCooperation: 1,
      },
      getters: {
        'cooperationStore/getSelectedCooperation': (state) => state.userCooperations,
      },
      actions: {
        'cooperationStore/SET_COOPERATION_UPDATE': () => jest.fn(),
      },
    });

    it('should test editCooperationInfo method and dispatch', async () => {
      store.dispatch = jest.fn();
      const editCooperationInfoSpy = jest.spyOn(EditCooperationInfo.methods, 'editCooperationInfo');
      const wrapper = mount(EditCooperationInfo, {
        global: {
          plugins: [store],
        },
      });

      wrapper.find('#edit-coop-btn').trigger('click');
      wrapper.find('#edit-coop-form').trigger('submit', {
        preventDefault: () => {},
      });

      const data = {
        userCooperations: {
          id: 1,
          name: 'Крила ночі',
          edrpou: '12345678',
          iban: 'UA122115518961158112111881111',
          address: {
            region: 'Дніпропетровський',
            city: 'Дніпро',
            district: 'Задовський',
            street: 'Моторна',
            houseBlock: '11',
            houseNumber: '12',
            zipCode: '12345',
          },
          contacts: [
            { type: 'email', main: true, email: 'admin@email.com' },
            { type: 'phone', main: true, phone: '+380509912832' },
          ],
        },
        selectedCooperation: 1,
      };
      await wrapper.vm.$nextTick();

      expect(editCooperationInfoSpy).toBeCalled();
      expect(store.dispatch).toHaveBeenLastCalledWith('cooperationStore/SET_COOPERATION_UPDATE', data);
    });

    it('testing cooperationInfo getter', async () => {
      const data = {
        userCooperations: {
          id: 1,
          name: 'Крила ночі',
          edrpou: '12345678',
          iban: 'UA122115518961158112111881111',
          address: {
            region: 'Дніпропетровський',
            city: 'Дніпро',
            district: 'Задовський',
            street: 'Моторна',
            houseBlock: '11',
            houseNumber: '12',
            zipCode: '12345',
          },
          contacts: [
            { type: 'email', main: true, email: 'admin@email.com' },
            { type: 'phone', main: true, phone: '+380509912832' },
          ],
        },
        selectedCooperation: 1,
      };

      const actual = store.getters['cooperationStore/getSelectedCooperation'];
      expect(actual).toEqual(data.userCooperations);
    });

    describe('testing methods', () => {
      it('cancelCooperationEdit method should be called', async () => {
        const cancelCooperationEditSpy = jest.spyOn(EditCooperationInfo.methods, 'cancelCooperationEdit');
        const wrapper = mount(EditCooperationInfo);

        wrapper.find('#cancel-edit-coop-btn').trigger('click');
        await wrapper.vm.$nextTick();

        expect(cancelCooperationEditSpy).toHaveBeenCalled();
      });

      it('test cancelCooperationEdit method', async () => {
        const initDataSpy = jest.spyOn(EditCooperationInfo.methods, 'initData');

        wrapper.vm.$emit('cancel-editCoopInfo');
        wrapper.find('#cancel-edit-coop-btn').trigger('click');
        await wrapper.vm.$nextTick();

        expect(initDataSpy).toHaveBeenCalled();
        expect(wrapper.emitted('cancel-editCoopInfo')).toBeTruthy();
      });
    });
  });

  describe('testing validatots', () => {
    //TODO: refactor tests to it.each
    describe('testing required fields', () => {
      it('should fail the validation - coop name field [is required]', async () => {
        await inputSetValueHandler(null, '', '#coopName', wrapper);
        expect(wrapper.find('small#coopName-help').text()).toBe("Це обов'язкове поле");
      });

      it('should fail the validation - coop Iban field [is required]', async () => {
        await inputSetValueHandler(null, '', '#coopIban', wrapper);
        expect(wrapper.find('small#coopIban-help').text()).toBe("Це обов'язкове поле");
      });

      it('should fail the validation - coop email field [is required]', async () => {
        await inputSetValueHandler(null, '', '#coopEmail', wrapper);
        expect(wrapper.find('small#coopEmail-help').text()).toBe("Це обов'язкове поле");
      });

      it('should fail the validation - edrpou field [is required]', async () => {
        await inputSetValueHandler(null, '', '#edrpou', wrapper);
        expect(wrapper.find('small#edrpou-help').text()).toBe("Це обов'язкове поле");
      });

      it('should fail the validation - coop phone field [is required]', async () => {
        await inputSetValueHandler(null, '', '#coopPhone', wrapper);
        expect(wrapper.find('small#coopPhone-help').text()).toBe("Це обов'язкове поле");
      });

      it('should fail the validation - coop region field [is required]', async () => {
        await inputSetValueHandler(null, '', '#coopRegion', wrapper);
        expect(wrapper.find('small#coopRegion-help').text()).toBe("Це обов'язкове поле");
      });

      it('should fail the validation - coop city field [is required]', async () => {
        await inputSetValueHandler(null, '', '#coopCity', wrapper);
        expect(wrapper.find('small#coopCity-help').text()).toBe("Це обов'язкове поле");
      });

      it('should fail the validation - coop district field [is required]', async () => {
        await inputSetValueHandler(null, '', '#coopDistrict', wrapper);
        expect(wrapper.find('small#coopDistrict-help').text()).toBe("Це обов'язкове поле");
      });

      it('should fail the validation - coop street field [is required]', async () => {
        await inputSetValueHandler(null, '', '#coopStreet', wrapper);
        expect(wrapper.find('small#coopStreet-help').text()).toBe("Це обов'язкове поле");
      });

      it('should fail the validation - coop house field [is required]', async () => {
        await inputSetValueHandler(null, '', '#coopHouse', wrapper);
        expect(wrapper.find('small#coopHouse-help').text()).toBe("Це обов'язкове поле");
      });

      it('should fail the validation - coop block field [is required]', async () => {
        await inputSetValueHandler(null, '', '#coopBlock', wrapper);
        expect(wrapper.find('small#coopBlock-help').text()).toBe("Це обов'язкове поле");
      });

      it('should fail the validation - coop zipcode field [is required]', async () => {
        await inputSetValueHandler(null, '', '#coopZipCode', wrapper);
        expect(wrapper.find('small#coopZipCode-help').text()).toBe("Це обов'язкове поле");
      });
    });
  });
});
