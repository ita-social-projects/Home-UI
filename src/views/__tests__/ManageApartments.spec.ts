import { createStore } from 'vuex';
import { mount, VueWrapper } from '@vue/test-utils';
import { MountingOptions } from '@vue/test-utils/dist/types';
import ManageApartments from '@/views/ManageApartments.vue';
import ApartmentInfo from '@/views/ApartmentInfo.vue';
// import Breadcrumb from '@/components/Breadcrumb.vue';
// import AddApartmentForm from '@/components/AddApartmentForm.vue';
import { createRouter, createWebHistory } from 'vue-router';

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
    name: 'apartment-info',
    path: '/main/cooperation/34/67',
    component: ApartmentInfo,
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
      AddApartmentForm: true,
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

  describe('click on row in table', () => {
    it('should push user to page with apartment info', async () => {
      const rows = wrapper.findAll('.p-selectable-row');
      await rows[0].trigger('click');
      await router.isReady();
      console.log('pushed');
    });
  });
});