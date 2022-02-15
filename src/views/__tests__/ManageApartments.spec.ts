import { createStore } from 'vuex';
import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { MountingOptions } from '@vue/test-utils/dist/types';
import ManageApartments from '@/apartment/ManageApartments.vue';
import ApartmentInfo from '@/apartment/ApartmentInfo.vue';
import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import Sidebar from '@/components/Sidebar.vue';

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

const routes = [
  {
    path: '/main',
    component: MainPage,
  },
  {
    path: '/main/cooperation/:id',
    component: ManageApartments,
    params: {
      id: '2',
    },
  },
  {
    name: 'apartment-info',
    path: '/main/cooperation/:id/:apartment',
    component: ApartmentInfo,
    props: true,
    params: {
      id: '2',
      apartment: '56',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const mountingOptions: MountingOptions<any> = {
  global: {
    provide: {
      store,
    },
    plugins: [router],
    stubs: {
      Breadcrumb: true,
      ApartmentForm: true,
      Dialog: true,
    },
  },
  props: {
    id: '4567',
  },
};

describe('Manage apartments page', () => {
  let wrapper: VueWrapper<ManageApartments>;

  beforeEach(() => {
    wrapper = mount(ManageApartments, mountingOptions);
  });

  it('should initialize correctly', () => {
    expect(wrapper.exists()).toBeTruthy();
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

    await btn.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.displayApartmentModal).toBe(true);
  });

  describe('mounted lifecycle hook', () => {
    it('should call set apartments action', () => {
      store.dispatch = jest.fn();
      const wrapper = mount(ManageApartments, mountingOptions);

      expect(store.dispatch).toHaveBeenCalledWith('apartmentsStore/SET_APARTMENTS', wrapper.props('id'));
    });
  });

  describe('router testing from MainPage component', () => {
    const mockStore = {
      getters: jest.fn(),
      dispatch: jest.fn(),
    };
    const mountingOptionsMainPage: MountingOptions<any> = {
      global: {
        provide: {
          store,
        },
        mocks: {
          $store: mockStore,
        },
        plugins: [router],
        stubs: {
          Sidebar,
        },
      },
      props: {
        id: '12',
      },
    };

    const wrapperMainPage = mount(MainPage, mountingOptionsMainPage);

    it('shoud render MainPage component by path /main ', async () => {
      router.push('/main');
      await router.isReady();
      expect(wrapperMainPage.html()).toContain('main-page');
    });
    it('shoul render ManageApartment component by path /main/cooperation/:id', async () => {
      router.push('/main/cooperation/:id');
      await flushPromises();
      expect(wrapperMainPage.html()).toContain('manage-apartments');
    });
    it('click on row in table should push to page with apartment info', async () => {
      const rows = wrapperMainPage.findAll('.p-selectable-row');
      await rows[0].trigger('click');
      await flushPromises();
      expect(wrapperMainPage.html()).toContain('apartment-info');
    });
  });
});
