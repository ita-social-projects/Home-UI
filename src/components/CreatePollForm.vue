<template>
  <form @submit.prevent="createPoll()" id="poll_data_form">
    <div class="input-section">
      <label class="dialog-item" for="poll_title">Заголовок: </label>
      <InputText
        class="input-poll"
        id="poll_title"
        placeholder="Заголовок"
        v-model.trim="pollData.title"
        :class="{
          'p-invalid': v$.pollData.title.$error,
        }"
        @input="v$.pollData.title.$touch"
      />
      <small v-if="v$.pollData.title.$error" id="poll_title" class="p-error">{{
        v$.pollData.title.$errors[0].$message
      }}</small>
    </div>
    <div class="input-section">
      <label class="dialog-item" for="poll_description">Опис: </label>
      <Textarea
        id="poll_description"
        placeholder="Детальний опис"
        v-model.trim="pollData.description"
        rows="8"
        :class="{
          'p-invalid': v$.pollData.description.$error,
        }"
        @input="v$.pollData.description.$touch"
      />
      <small v-if="v$.pollData.description.$error" id="poll_description" class="p-error">{{
        v$.pollData.description.$errors[0].$message
      }}</small>
    </div>
    <div class="input-section">
      <label class="dialog-item" for="poll_question">Запитання: </label>
      <Textarea
        id="poll_question"
        placeholder="Запитання"
        v-model.trim="pollData.question"
        rows="4"
        :class="{
          'p-invalid': v$.pollData.question.$error,
        }"
        @input="v$.pollData.question.$touch"
      />
      <small v-if="v$.pollData.question.$error" id="poll_question" class="p-error">{{
        v$.pollData.question.$errors[0].$message
      }}</small>
    </div>
    <div class="input-section">
      <label class="dialog-item" for="poll_polledHouses">Список будинків: </label>
      <div class="checkbox-section">
        <div v-for="house of houses" :key="house.id" class="p-field-checkbox">
          <Checkbox :id="house.id" name="category" :value="house" v-model="pollData.polledHouses" />
          <label class="house-label" :for="house.id">
            {{ house.address?.houseNumber }}, {{ house.address?.houseBlock }}, {{ house.address?.district }},
            {{ house.address?.street }}
          </label>
        </div>
      </div>
      <small v-if="v$.pollData.polledHouses.$error" id="poll_polledHouses" class="p-error">{{
        v$.pollData.polledHouses.$errors[0].$message
      }}</small>
    </div>
    <div class="input-section">
      <label class="dialog-item" for="caledar-begin">Дата початку:</label>
      <Calendar
        id="caledar-begin"
        v-model="pollData.creationDate"
        :showIcon="true"
        :minDate="minDate"
        dateFormat="dd.mm.yy"
      />
    </div>
    <div class="input-section">
      <label class="dialog-item" for="calendar-finish">Дата закінчення:</label>
      <!-- <small id="apartment_area_help" class="p-error">(виставляється автоматично на 15 днів)</small> -->
      <Calendar id="calendar-finish" v-model="pollData.completionDate" :showIcon="true" dateFormat="dd.mm.yy" />
    </div>
    <div class="button-div">
      <Button
        id="save-button"
        label="Додати опитування"
        icon="pi pi-check"
        autofocus
        class="p-button-info"
        type="submit"
        value="Submit"
        :disabled="v$.$invalid"
      />
      <Button
        id="cancel-button"
        label="Відмінити"
        icon="pi pi-times"
        @click="cancelEditing"
        class="p-button-outlined p-button-info"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import {
  requiredValidator,
  pollTitleLenghtValidator,
  pollDescriptionLenghtValidator,
  pollQuestionLenghtValidator,
  cyrillicLangTitleValidator,
} from '@/utils/validators';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import Calendar from 'primevue/calendar';
import { StoreModuleEnum } from '@/store/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/store/houses/types';
import { HouseModel } from '@/shared/models/house.model';
import { PollsActionEnum } from '@/store/polls/types';

export default defineComponent({
  name: 'CreatePollForm',
  components: {
    Button,
    InputText,
    Textarea,
    Checkbox,
    Calendar,
  },
  props: {
    cooperationId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      pollData: {
        title: '',
        description: '',
        question: '',
        polledHouses: [],
        creationDate: new Date(),
        completionDate: new Date(),
      },
      displayCreatePollModal: false,
      minDate: new Date(),
      submitted: false,
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      pollData: {
        title: { requiredValidator, pollTitleLenghtValidator, cyrillicLangTitleValidator },
        description: { requiredValidator, pollDescriptionLenghtValidator, cyrillicLangTitleValidator },
        question: { requiredValidator, pollQuestionLenghtValidator, cyrillicLangTitleValidator },
        polledHouses: { requiredValidator },
        creationDate: { requiredValidator },
        completionDate: { requiredValidator },
      },
    };
  },
  created() {
    this.$watch(
      () => this.pollData.creationDate,
      (newVal: Date) => {
        this.pollData.completionDate = new Date();
        this.pollData.completionDate.setDate(newVal.getDate() + 14);
      }
    );
    this.minDate.setDate(this.minDate.getDate() + 1);
  },
  methods: {
    cancelEditing() {
      this.resetPollDataFields();
      this.$emit('cancel-creating-poll');
    },
    resetPollDataFields() {
      this.pollData.title = '';
      this.pollData.description = '';
      this.pollData.question = '';
      this.pollData.polledHouses = [];
      this.pollData.creationDate = new Date();
      this.pollData.completionDate = new Date();
    },
    async createPoll() {
      const isFormValid = await this.v$.$validate();
      console.log(isFormValid);
      if (!isFormValid) {
        return;
      }
      const payload = {
        cooperationId: this.$props.cooperationId,
        ...this.pollData,
      };
      console.log(payload);
      this.$store.dispatch(`${StoreModuleEnum.pollsStore}/${PollsActionEnum.ADD_COOPERATION_POLL}`, payload);
      this.resetPollDataFields();
      this.v$.$reset();
      this.$emit('create-poll');
    },
  },
  computed: {
    houses(): Array<HouseModel> {
      return this.$store.getters[`${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`];
    },
  },
  mounted() {
    this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, this.$props.cooperationId);
  },
});
</script>

<style lang="scss" scoped>
%error-message {
  margin: 0.4em 0.5rem;
  width: 100%;
}

.address-details {
  margin-left: 2rem;
  .dialog-item-address {
    margin-right: -2rem;
  }
}
.dialog-item {
  position: relative;
  width: 150px;
  margin-bottom: 13px;
}
.input-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.checkbox-section {
  border: 1px solid #d4d4d8;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 15px;
  width: 400px;
  height: 140px;
  overflow: auto;
}
.p-field-checkbox {
  height: 30px;
}
.p-error {
  display: flex;
  position: absolute;
  justify-content: right;
  margin: -26px -25px 0 -50px;
  @extend %error-message;
}

.house-label {
  padding-left: 10px;
}

.button-div {
  float: right;
  .p-button-outlined {
    margin-left: 20px;
  }
  margin-top: 30px;
}

.p-inputtext.p-component {
  width: 400px;
}

.p-calendar {
  width: 200px;
}
</style>
