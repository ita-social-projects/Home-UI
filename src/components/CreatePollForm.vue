<template>
  <form @submit.prevent="createPoll()" id="poll_data_form">
    <div class="input-section">
      <section>
        <label class="dialog-item" for="poll_title">Заголовок: </label>
        <Textarea
          v-model.trim="pollData.title"
          :class="{
            'p-invalid': v$.pollData.title.$error,
          }"
          class="input-poll"
          id="poll_title"
          placeholder="Заголовок"
          rows="3"
          @input="v$.pollData.title.$touch"
        />
      </section>
      <small v-if="v$.pollData.title.$error" id="poll_title" class="p-error">{{
        v$.pollData.title.$errors[0].$message
      }}</small>
    </div>
    <div class="input-section">
      <section>
        <label class="dialog-item" for="poll_description">Опис: </label>
        <Textarea
          v-model.trim="pollData.description"
          :class="{
            'p-invalid': v$.pollData.description.$error,
          }"
          id="poll_description"
          placeholder="Детальний опис"
          rows="8"
          @input="v$.pollData.description.$touch"
        />
      </section>
      <small v-if="v$.pollData.description.$error" id="poll_description" class="p-error">{{
        v$.pollData.description.$errors[0].$message
      }}</small>
    </div>
    <div class="input-section">
      <section>
        <label class="dialog-item" for="poll_polledHouses">Список будинків: </label>
        <div class="checkbox-section">
          <div v-for="(house, index) of houses" :key="house.id" class="p-field-checkbox">
            <Checkbox v-model="pollData.polledHouses" :id="house.id" :value="house" name="category" />
            <label :for="house.id" class="house-label">
              {{ houseAddresses[index] }}
            </label>
          </div>
        </div>
      </section>
      <small v-if="v$.pollData.polledHouses.$error" id="poll_polledHouses" class="p-error">{{
        v$.pollData.polledHouses.$errors[0].$message
      }}</small>
    </div>
    <div class="input-section">
      <section>
        <label class="dialog-item" for="caledar-begin">Дата початку:</label>
        <Calendar
          v-model="startDate"
          :showIcon="true"
          :minDate="minDate"
          id="caledar-begin"
          dateFormat="dd.mm.yy"
          @date-select="ChangeDate"
        />
      </section>
    </div>
    <div class="input-section">
      <section>
        <label class="dialog-item" for="calendar-finish">Дата закінчення:</label>
        <InputText :value="pollData.completionDate" id="calendar-finish" disabled="true"></InputText>
      </section>
      <small id="apartment_area_help" class="p-warning">виставляється автоматично 15 днів з дати початку</small>
    </div>
    <div class="option-section">
      <div v-for="(item, key) in PollAcceptanceCriteriaEnum" :key="key">
        <RadioButton
          :name="key"
          :value="item"
          v-model="pollData.acceptanceCriteria"
          :id="key"
          :class="{
            'p-invalid': v$.pollData.acceptanceCriteria.$error,
          }"
          class="radio-button"
        ></RadioButton>
        <label for="item.name">{{ item }}</label>
      </div>
      <small v-if="v$.pollData.acceptanceCriteria.$error" id="poll_title" class="p-error">{{
        v$.pollData.acceptanceCriteria.$errors[0].$message
      }}</small>
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
      />
      <Button
        id="cancel-button"
        label="Відмінити"
        icon="pi pi-times"
        class="p-button-outlined p-button-info"
        @click="cancelEditing"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import useVuelidate from '@vuelidate/core';
import { pollValidations } from '@/utils/poll-validations';
import { StoreModuleEnum } from '@/store/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/houses/store/types';
import { HouseModel } from '@/houses/models/house.model';
import { PollsActionEnum, PollAcceptanceCriteriaEnum } from '@/store/polls/types';

export default defineComponent({
  name: 'CreatePollForm',
  components: {
    Button,
    Textarea,
    Checkbox,
    Calendar,
    InputText,
    RadioButton,
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
        polledHouses: [] as Array<HouseModel>,
        creationDate: new Date(),
        completionDate: '',
        acceptanceCriteria: '',
      },
      startDate: null,
      finishDate: new Date(),
      displayCreatePollModal: false,
      minDate: new Date(),
      submitted: false,
      v$: useVuelidate(),
      PollAcceptanceCriteriaEnum,
    };
  },
  validations() {
    return {
      pollData: pollValidations,
    };
  },
  created() {
    this.$watch(
      () => this.startDate,
      (newVal: Date) => {
        if (newVal === null) {
          this.pollData.completionDate = '';
          return;
        }
        this.finishDate = new Date(newVal.getTime() + 14 * 86400000);
        this.finishDate.setHours(23, 59, 59, 59);
        this.pollData.completionDate = this.finishDate.toLocaleString('uk-UA').split(',')[0];
      }
    );
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.minDate.setHours(0, 0, 0, 0);
  },
  methods: {
    cancelEditing() {
      this.resetPollDataFields();
      this.$emit('cancel-creating-poll');
    },
    resetPollDataFields() {
      this.pollData.title = '';
      this.pollData.description = '';
      this.pollData.polledHouses = [];
      this.pollData.creationDate = new Date();
      this.pollData.completionDate = '';
      this.pollData.acceptanceCriteria = '';
    },
    ChangeDate(value: Date) {
      this.pollData.creationDate = value;
    },
    async createPoll() {
      const isFormValid = await this.v$.$validate();
      if (!isFormValid) {
        return;
      }
      const payload = {
        cooperationId: this.cooperationId,
        body: {
          polledHouses: this.pollData.polledHouses.reduce((acc: Array<any>, cur: HouseModel) => {
            acc.push({
              id: cur.id,
            });
            return acc;
          }, []),
          header: this.pollData.title,
          description: this.pollData.description,
          creationDate: '',
          completionDate: '',
          acceptanceCriteria: this.pollData.acceptanceCriteria,
        },
      };
      if (this.startDate !== null) {
        payload.body.creationDate = this.pollData.creationDate.toISOString();
        payload.body.completionDate = this.finishDate.toISOString();
      }
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
    houseAddresses(): Array<string> {
      return this.houses.reduce((acc: Array<string>, cur) => {
        acc.push(
          `${cur.address?.houseNumber}, ${cur.address?.houseBlock}, ${cur.address?.district},${cur.address?.street}`
        );
        return acc;
      }, []);
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

#calendar-finish {
  width: 230px;
}

.p-disabled,
.p-component:disabled {
  opacity: 1;
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
  flex-direction: column;
  margin-bottom: 30px;
}
.input-section section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input-section small {
  justify-self: flex-end;
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
  @extend %error-message;
}

.p-warning {
  display: flex;
  flex-direction: column;
  width: 200px;
  color: #3b82f6;
  margin: 25px 0 0 0;
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
.p-monthpicker {
  left: 590px;
}
.option-section div {
  padding-bottom: 15px;
}
.radio-button {
  margin-right: 15px;
}
</style>
