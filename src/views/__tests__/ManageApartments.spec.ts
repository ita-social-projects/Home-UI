import { createStore } from 'vuex';
import { mount } from '@vue/test-utils';
import ManageApartments from '@/views/ManageApartments.vue';
import ApartmentInfo from '@/views/ApartmentInfo.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import AddApartmentForm from '@/components/AddApartmentForm.vue';

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
    'cooperationStore/getSelectedCooperationId': () => 1,
  },
  actions: {
    'housesStore/GET_HOUSE_BY_ID': jest.fn(),
    'apartmentsStore/SET_APARTMENTS': jest.fn(),
  },
});
const routes = {
  path: '/main/cooperation/:id/:apartment',
  params: {
    id: 1,
    apartment: 3256,
  },
};
const mockRouter = {
  push: jest.fn(),
};

describe('Manage apartments', () => {
  const wrapper = mount(ManageApartments, {
    global: {
      provide: {
        store: store,
      },
      stubs: {
        Breadcrumb: true,
        AddApartmentForm: true,
        Dialog: true,
      },
      mocks: {
        routes,
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

  it('should open AddApartment modal', async () => {
    const btn = wrapper.find('.add-btn button');
    wrapper.vm.displayApartmentModal = false;
    btn.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.displayApartmentModal).toBe(true);
  });
});

describe('In mount shoul be called set apartments dispatch', () => {
  it('', () => {
    store.dispatch = jest.fn();
    const wrapper = mount(ManageApartments, {
      global: {
        provide: {
          store,
        },
        stubs: {
          Breadcrumb: true,
          AddApartmentForm: true,
          Dialog: true,
        },
        mocks: {
          routes,
          router: mockRouter,
        },
      },
      props: {
        id: '4567',
      },
    });
    expect(store.dispatch).toHaveBeenCalledWith('apartmentsStore/SET_APARTMENTS', wrapper.props('id'));
  });
});
