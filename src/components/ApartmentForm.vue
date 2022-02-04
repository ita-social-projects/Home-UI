<template>
  <form @submit.prevent="submit()" id="edit-apartment-form">
    <div>
      <label for="iban">Номер квартири : </label>
      <div class="input-block">
        <small v-if="v$.apartmentData.apartmentNumber.$error" class="p-error" id="apartmentNumber-help">{{
          v$.apartmentData.apartmentNumber.$errors[0].$message
        }}</small>
        <InputText
          v-model="apartmentData.apartmentNumber"
          :class="{ 'p-invalid': v$.apartmentData.apartmentNumber.$error }"
          id="apartmentNumber"
          placeholder="Номер квартири"
          maxlength="6"
          @input="v$.apartmentData.apartmentNumber.$touch"
        />
      </div>
    </div>
    <div>
      <label for="edrpou">Площа квартири : </label>
      <div class="input-block">
        <small v-if="v$.apartmentData.apartmentArea.$error" class="p-error" id="apartmentArea-help">{{
          v$.apartmentData.apartmentArea.$errors[0].$message
        }}</small>
        <InputText
          v-model="apartmentData.apartmentArea"
          :class="{ 'p-invalid': v$.apartmentData.apartmentArea.$error }"
          id="apartmentArea"
          placeholder="Площа квартири"
          maxlength="7"
          @input="v$.apartmentData.apartmentArea.$touch"
        />
        <span> кв.м.</span>
      </div>
    </div>
    <div class="button-div">
      <Button
        label="Зберегти зміни"
        icon="pi pi-check"
        type="submit"
        autofocus
        class="p-button-info"
        value="Submit"
        id="update-apartment-btn"
        :disabled="disabled || v$.apartmentData.$invalid"
      />
      <Button
        label="Скасувати"
        icon="pi pi-times"
        class="p-button-outlined p-button-info"
        id="cancel-edit-apartment-btn"
        @click="cancelEditing"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import useVuelidate from '@vuelidate/core';
import { apartmentValidations } from '@/utils/apartment-validations';
import { StoreModuleEnum } from '@/store/types';
import { ApartmentsActionsEnum, ApartmentsGettersEnum } from '@/store/apartments/types';

export default defineComponent({
  name: 'ApartmentForm',
  components: {
    Button,
    InputText,
  },
  props: ['houseId', 'apartmentId', 'propsApartmentData', 'type'],
  emits: ['cancel', 'apartment-saved'],
  data() {
    return {
      apartmentData: {
        ...this.$props.propsApartmentData,
      },
      disabled: true,
      v$: useVuelidate(),
      payload: {
        houseId: this.$props.houseId,
        apartmentId: this.$props.apartmentId,
      },
    };
  },
  validations() {
    return {
      apartmentData: apartmentValidations,
    };
  },
  mounted() {
    if (this.$props.type === 'edit') {
      this.$store.dispatch(
        `${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.SET_APARTMENT_BY_ID}`,
        this.payload
      );
    }
  },
  methods: {
    submit() {
      if (this.$props.type === 'edit') {
        this.editApartment();
      } else this.addApartment();
    },
    async editApartment(): Promise<void> {
      this.$store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.EDIT_APARTMENT}`, {
        body: this.apartmentData,
        ...this.payload,
      });
      this.$emit('apartment-saved');
      const message = `Дані про квартиру № ${this.apartmentData.apartmentNumber} змінено.`;
      this.showSuccessMessage(message);
    },
    async addApartment(): Promise<void> {
      const payload = {
        houseId: this.$props.houseId,
        body: this.apartmentData,
      };
      this.v$.$reset();
      this.$store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.ADD_APARTMENT}`, payload);
      this.$emit('apartment-saved');
      const message = `Квартиру № ${this.apartmentData.apartmentNumber} додано.`;
      this.showSuccessMessage(message);
    },
    showSuccessMessage(message: string) {
      this.$toast.add({
        severity: 'success',
        summary: 'Успішно!',
        detail: `${message}`,
        life: 3000,
      });
    },
    cancelEditing() {
      this.$emit('cancel');
    },
  },
  computed: {
    ...mapGetters({
      stateApartmentInfo: `${StoreModuleEnum.apartmentsStore}/${ApartmentsGettersEnum.getApartmentInfo}`,
    }),
  },
  watch: {
    apartmentData: {
      handler() {
        if (this.$props.type === 'edit') {
          this.disabled =
            this.apartmentData.apartmentNumber === this.stateApartmentInfo.apartmentNumber &&
            this.apartmentData.apartmentArea == this.stateApartmentInfo.apartmentArea;
        } else {
          this.disabled = false;
        }
      },
      deep: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.dialog-item {
  display: inline-block;
  width: 240px;
}
label {
  display: inline-block;
  width: 240px;
}

.input-block {
  display: inline-block;
  margin-bottom: 15px;
}
small {
  display: block;
  width: 280px;
}

.button-div {
  float: right;
  .p-button-outlined {
    margin-left: 20px;
  }
}
</style>
