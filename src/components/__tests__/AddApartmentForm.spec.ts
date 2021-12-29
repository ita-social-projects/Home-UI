import { mount, VueWrapper, shallowMount } from '@vue/test-utils';
import AddApartmentForm from '@/components/AddApartmentForm.vue';
import { ComponentPublicInstance } from 'vue';

const setup = async (id: string, value: string, wrapper: VueWrapper<ComponentPublicInstance>) => {
  const el = wrapper.find(id);
  await el.setValue(value);
  await el.trigger('blur');
};

describe('AddApartmentForm.vue', () => {
  // test('vuex', async () => {
  //   const $store = {
  //     state: {
  //       id: 5,
  //       number: 10,
  //       area: 50,
  //     },
  //     commit: jest.fn(),
  //   };
  //   const wrapper = mount(AddApartmentForm, {
  //     global: {
  //       mocks: {
  //         $store,
  //       },
  //     },
  //   });

  //   await wrapper.find('#save-button').trigger('click');
  //   expect($store.commit).toHaveBeenCalled();
  // });

  it('should exist', () => {
    const wrapper = mount(AddApartmentForm);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should set the value in the apartment_number field', async () => {
    const wrapper = mount(AddApartmentForm);
    const input = wrapper.find('#apartment_number');
    await input.setValue('123');
    expect(input.element._value).toBe('123');
  });

  it('should set the value in the apartment_area field', async () => {
    const wrapper = mount(AddApartmentForm);
    const input = wrapper.find('#apartment_area');
    await input.setValue('123');
    expect(input.element._value).toBe('123');
  });

  it('should pass the validation - apartment_number field', async () => {
    const wrapper = mount(AddApartmentForm);
    const input = wrapper.find('#apartment_number');
    await input.setValue('123');
    expect(wrapper.find('small#apartment_number_help').exists()).toBe(false);
  });

  it('should pass the validation - apartment_area field', async () => {
    const wrapper = mount(AddApartmentForm);
    const input = wrapper.find('#apartment_area');
    await input.setValue('123');
    expect(wrapper.find('small#apartment_area_help').exists()).toBe(false);
  });

  it('should fail the validation - apartment_number field [is required]', async () => {
    const wrapper = mount(AddApartmentForm);
    await setup('#apartment_number', '', wrapper);
    expect(wrapper.find('small#apartment_number_help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - apartment_area field [is required]', async () => {
    const wrapper = mount(AddApartmentForm);
    await setup('#apartment_area', '', wrapper);
    expect(wrapper.find('small#apartment_area_help').text()).toBe("Це обов'язкове поле");
  });

  it('apartment-saved emit test', async () => {
    const wrapper = mount(AddApartmentForm);

    wrapper.vm.$emit('apartment-saved');
    //wrapper.vm.$emit('apartment-saved', 123);
    await wrapper.vm.$nextTick(); // Wait until $emits have been handled
    // assert event has been emitted
    expect(wrapper.emitted('apartment-saved')).toBeTruthy();
    expect(wrapper.emitted()).toHaveProperty('apartment-saved');
    // assert event count
    //expect(wrapper.emitted('apartment-saved').length).toBe(2);
  });

  it('cancel-editing emit test', async () => {
    const wrapper = mount(AddApartmentForm);
    wrapper.vm.$emit('cancel-editing');
    //wrapper.vm.$emit('cancel-editing', 123);
    await wrapper.vm.$nextTick(); // Wait until $emits have been handled
    // assert event has been emitted
    expect(wrapper.emitted('cancel-editing')).toBeTruthy();
    expect(wrapper.emitted()).toHaveProperty('cancel-editing');
    // assert event count
    //  expect(wrapper.emitted('apartment-saved').length).toBe(2);
  });

  it('props check', () => {
    const wrapper = mount(AddApartmentForm, {
      props: {
        houseId: 5,
      },
    });
    expect(wrapper.props('houseId')).toBe(5);
  });

  it('test method cancelEditing', async () => {
    const cancelEditing = jest.spyOn(AddApartmentForm.methods, 'cancelEditing');
    const wrapper = mount(AddApartmentForm);
    wrapper.find('#cancel-button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(cancelEditing).toBeCalled();
  });

  it('test method saveApartment', async () => {
    const saveApartment = jest.spyOn(AddApartmentForm.methods, 'saveApartment');
    const wrapper = mount(AddApartmentForm);
    wrapper.find('#save-button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(saveApartment).toBeCalled();
  });

  // ?????? doesnt do anything
  test('emit check test', async () => {
    const wrapper = mount(AddApartmentForm);
    await wrapper.find('#save-button').trigger('click');
    console.log(wrapper.emitted());
    expect(wrapper.emitted()).toBeTruthy();
  });

  it('test method saveApartment and clear', async () => {
    // const saveApartment = jest.spyOn(AddApartmentForm.methods, 'saveApartment');
    const wrapper = mount(AddApartmentForm);
    wrapper.find('#apartment_number').setValue('123');
    wrapper.find('#apartment_area').setValue(555);
    wrapper.find('#save-button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('#apartment_area').text()).toBe('');
    expect(wrapper.find('#apartment_number').text()).toBe('');
  });

  // it('test method resetApartmentDataFields', async () => {
  //   const mockdata = {
  //     apartmentData: {
  //       apartmentNumber: '666',
  //       apartmentArea: 666,
  //     },
  //   };
  //   const resetApartmentDataFields = jest.spyOn(AddApartmentForm.methods, 'resetApartmentDataFields');
  //   const wrapper = mount(AddApartmentForm);

  //   await wrapper.vm.$nextTick();
  //   expect(resetApartmentDataFields).toHaveBeenCalledWith(mockdata);
  // });

  // test('Click on .btn calls the right function', () => {
  //   const wrapper = shallowMount(AddApartmentForm, {
  //     propsData: {
  //       validate: jest.fn((x) => 5),
  //     },
  //   });
  //   wrapper.setMethods({ updateCart: jest.fn() });
  //   const $btn = wrapper.find('.btn');
  //   $btn.trigger('click');
  //   expect(wrapper.vm.updateCart).toHaveBeenCalled();
  // });

  it('test method resetApartmentDataFields with jest.fn', async () => {
    const mockCallback = jest.fn();
    const wrapper = mount(AddApartmentForm);
    const resetApartmentDataFields = jest.spyOn(AddApartmentForm.methods, 'resetApartmentDataFields');
    wrapper.find('#apartment_number').setValue('123');
    wrapper.find('#apartment_area').setValue(555);
    wrapper.find('#save-button').trigger('click');
    await wrapper.vm.$nextTick();
    // expect(mockCallback.mock.results[0].value).toBeTruthy;
    expect(resetApartmentDataFields).toHaveBeenCalled();
  });

  it('test method resetApartmentDataFields with jest.fn', async () => {
    const returnsTrue = jest.fn(() => true);
    console.log(returnsTrue()); // true;
    expect(returnsTrue.mock.calls);
  });
});
