import { createStore } from 'vuex';
import { mount, shallowMount, VueWrapper } from '@vue/test-utils';
import ManageApartments from '@/views/ManageApartments.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import AddApartmentForm from '@/components/AddApartmentForm.vue';
import { ComponentPublicInstance, nextTick } from 'vue';

const setup = async (id: string, value: string, wrapper: VueWrapper<ComponentPublicInstance>) => {
  const el = wrapper.find(id);
  await el.setValue(value);
  await el.trigger('blur');
};

const store = createStore({
  state: {
    apartments: [
      {
        apartmentNumber: '2',
        apartmentArea: 222,
        ownerships: [],
        id: 3256,
      },
      {
        apartmentNumber: '1',
        apartmentArea: 100,
        ownerships: [],
        id: 3255,
      },
      {
        apartmentNumber: '56',
        apartmentArea: 755.78,
        ownerships: [],
        id: 3254,
      },
      {
        apartmentNumber: '11',
        apartmentArea: 123,
        ownerships: [],
        id: 3253,
      },
      {
        apartmentNumber: '22',
        apartmentArea: 405,
        ownerships: [],
        id: 3252,
      },
    ],
  },

  getters: {
    'apartmentsStore/getApartmentsData': (state) => state.apartments,
  },
  actions: {
    'housesStore/GET_HOUSE_BY_ID': () => jest.fn(),
    'apartmentsStore/SET_APARTMENTS': () => jest.fn(),
  },
});

describe('Manage apartments', () => {
  const mockRoute = {
    params: {
      id: 1,
    },
  };
  const mockRouter = {
    push: jest.fn(),
  };
  const wrapper = mount(ManageApartments, {
    global: {
      provide: {
        store: store,
      },
      stubs: {
        Breadcrumb: true,
        // AddApartmentForm,
      },
      mocks: {
        route: mockRoute,
        router: mockRouter,
      },
    },
    props: {
      id: '4567',
    },
  });

  it('should initialize correctly', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should exist component Breadcrumb', () => {
    expect(wrapper.findComponent(Breadcrumb).exists()).toBe(true);
  });

  it('props check', () => {
    expect(wrapper.props('id')).toBe('4567');
  });

  it('length of rendered list of apartments should be equal to length of state.apartments', async () => {
    const apartmentsListLength = store.state.apartments.length;
    expect(wrapper.findAll('.p-selectable-row')).toHaveLength(apartmentsListLength);
  });

  it('add house button testing', async () => {
    console.log(wrapper.html())
    // expect(wrapper.findComponent(AddApartmentForm).exists()).toBe(true);
    // const button = {
    //   click() {
    //     return true;
    //   }
    // }
    // const openApartmentModal = jest.spyOn(button, 'click');
    // const clicked = button.click();
    // await wrapper.vm.$nextTick();
    // expect(openApartmentModal).toHaveBeenCalled();

    
    // const spy = jest.spyOn(ManageApartments, 'openApartmentModal');
    // await wrapper.find('.add-btn button').trigger('click');
    // await wrapper.vm.$nextTick();

    // expect(spy).toBeCalled();
    
    
  
    // expect(store.dispatch).toHaveBeenCalledWith('housesStore/GET_HOUSE_BY_ID', {
    //   cooperationID: 1,
    //   houseID: 1,
    // });
  });

  // it('routing', async () => {
  //   const row = await wrapper.findAll('.p-selectable-row')[0];
  //   console.log('rows', row);
  //   row.trigger('click');
  //   expect(mockRouter.push).toHaveBeenCalledTimes(1);
  // });
  it('click add apartment', async () => {
    await wrapper.find('.add-btn>button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('#apartment_data_form').exists()).toBe(true);
    // expect(openApartmentModal).toHaveBeenCalled();
    // router.push('/main/cooperation/:id/:apartment');
    // await router.isReady();

  });
});
