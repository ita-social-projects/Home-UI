import { mount, VueWrapper } from '@vue/test-utils';
import AddApartmentForm from '@/components/AddApartmentForm.vue';
import { inputSetValueHandler } from '@/utils/test-utils';

describe('AddApartmentForm.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(AddApartmentForm, {
      props: {
        houseId: 5,
      },
    });
  });

  it('should exist', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should pass the validation - apartment_number field', async () => {
    const input = wrapper.find('#apartment_number');
    await input.setValue('123');

    expect(wrapper.find('small#apartment_number_help').exists()).toBe(false);
  });

  it('should pass the validation - apartment_area field', async () => {
    const input = wrapper.find('#apartment_area');
    await input.setValue('123');

    expect(wrapper.find('small#apartment_area_help').exists()).toBe(false);
  });

  it('should fail the validation - apartment_number field [is required]', async () => {
    await inputSetValueHandler(null, '', '#apartment_number', wrapper);

    expect(wrapper.find('small#apartment_number_help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - apartment_area field [is required]', async () => {
    await inputSetValueHandler(null, '', '#apartment_area', wrapper);

    expect(wrapper.find('small#apartment_area_help').text()).toBe("Це обов'язкове поле");
  });

  it('apartment-saved emit test', async () => {
    wrapper.vm.$emit('apartment-saved');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('apartment-saved')).toBeTruthy();
    expect(wrapper.emitted()).toHaveProperty('apartment-saved');
  });

  it('cancel-editing emit test', async () => {
    wrapper.vm.$emit('cancel-editing');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('cancel-editing')).toBeTruthy();
    expect(wrapper.emitted()).toHaveProperty('cancel-editing');
  });

  it('props check', () => {
    expect(wrapper.props('houseId')).toBe(5);
  });

  it('test method cancelEditing', async () => {
    const cancelEditing = jest.spyOn(wrapper.vm, 'cancelEditing');

    await wrapper.find('#cancel-button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(cancelEditing).toBeCalled();
  });

  it('test method saveApartment', async () => {
    const saveApartment = jest.spyOn(wrapper.vm, 'saveApartment');

    await wrapper.find('#save-button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(saveApartment).toBeCalled();
  });

  test('emit check test', async () => {
    await wrapper.find('#save-button').trigger('click');
    console.log(wrapper.emitted());

    expect(wrapper.emitted()).toBeTruthy();
  });

  it('test method saveApartment and clear', async () => {
    await wrapper.find('#apartment_number').setValue('123');
    await wrapper.find('#apartment_area').setValue(555);
    await wrapper.find('#save-button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('#apartment_area').text()).toBe('');
    expect(wrapper.find('#apartment_number').text()).toBe('');
  });

  it('test jest.fn', async () => {
    const returnsTrue = jest.fn(() => true);
    console.log(returnsTrue());

    expect(returnsTrue.mock.calls);
  });
});
