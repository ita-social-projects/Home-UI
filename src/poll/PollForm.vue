<template>
  <form @submit.prevent="submitPollForm()" id="poll_data_form">
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
          @blur="v$.pollData.title.$touch"
          @input="isDisabled = false"
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
          @blur="v$.pollData.description.$touch"
          @input="isDisabled = false"
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
            <Checkbox
              v-model="pollData.polledHouses"
              :id="house.id"
              :value="house"
              name="category"
              :class="{
                'p-invalid': v$.pollData.polledHouses.$error,
              }"
              @input="isDisabled = false"
              @blur="v$.pollData.polledHouses.$touch"
            />
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
          v-if="!isEditing"
          v-model="startDate"
          :showIcon="true"
          :minDate="minDate"
          :class="{
            'p-invalid': v$.startDate.$error,
          }"
          id="caledar-begin"
          dateFormat="dd.mm.yy"
          @date-select="changeDate"
          @blur="v$.startDate.$touch"
        />
        <Calendar
          v-if="isEditing"
          v-model="pollData.creationDateInEdition"
          :showIcon="true"
          :class="{
            'p-invalid': v$.pollData.creationDateInEdition.$error,
          }"
          id="caledar-begin"
          dateFormat="dd.mm.yy"
          @date-select="onChangeCreationDate"
          @blur="v$.pollData.creationDateInEdition.$touch"
        />
        <small v-if="isCreationDateHelpActive" id="poll_creationDate" class="p-error сreationDate-help warning-message">
          Переконайтесь, що дата стоїть не раніше, ніж завтра!
        </small>
        <small v-if="v$.pollData.creationDateInEdition.$error" id="poll_creationDate" class="p-error warning-message">{{
          v$.pollData.creationDateInEdition.$errors[0].$message
        }}</small>
        <small v-if="v$.startDate.$error" id="poll_startDate" class="p-error warning-message">{{
          v$.startDate.$errors[0].$message
        }}</small>
      </section>
    </div>
    <div class="input-section">
      <section>
        <label class="dialog-item" for="calendar-finish">Дата закінчення:</label>
        <InputText v-if="!isEditing" :value="pollData.completionDate" id="calendar-finish" disabled="true"></InputText>
        <Calendar
          v-if="isEditing"
          v-model="pollData.completionDate"
          :showIcon="true"
          :disabled="true"
          id="calendar-finish"
          dateFormat="dd.mm.yy"
          @date-select="isDisabled = false"
        />
      </section>
      <small id="apartment_area_help" class="p-warning">Виставляється автоматично 15 днів з дати початку</small>
    </div>
    <div v-if="!isEditing" class="option-section">
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
        />
        <label :for="key">{{ item }}</label>
      </div>
      <small v-if="v$.pollData.acceptanceCriteria.$error" id="poll_title" class="p-error">{{
        v$.pollData.acceptanceCriteria.$errors[0].$message
      }}</small>
    </div>
    <div class="buttons-container">
      <Button
        :id="!this.isEditing && 'save-button'"
        :disabled="isDisabled || v$.pollData.$invalid || v$.startDate.$invalid"
        :label="this.isEditing ? 'Зберегти зміни' : 'Додати опитування'"
        icon="pi pi-check"
        class="p-button-info"
        type="submit"
        value="Submit"
      />
      <Button
        :id="!this.isEditing && 'cancel-button'"
        label="Скасувати"
        icon="pi pi-times"
        class="p-button-outlined p-button-info"
        @click="cancel"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import useVuelidate from '@vuelidate/core';
import { StoreModuleEnum } from '@/store/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/houses/store/types';
import { HouseModel } from '@/houses/models/house.model';
import { PollsActionEnum, PollAcceptanceCriteriaEnum, PollsGettersEnum } from '@/poll/store/types';
import { PollModel } from '@/poll/models/poll.model';
import {
  requiredValidator,
  pollTitleLenghtValidator,
  pollDescriptionLenghtValidator,
  cyrillicLangTextValidator,
} from '@/utils/validators';
import { CooperationGettersEnum } from '@/cooperation/store/types';

export default defineComponent({
  name: 'PollForm',
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
    isEditing: {
      type: Boolean,
      required: true,
    },
    poll: {
      type: PollModel,
      required: true,
    },
    showSuccessOperation: {
      type: Function,
      required: true,
    },
    displayEditPollModal: {
      type: Boolean,
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
        creationDateInEdition: '' as any,
        completionDate: '' || ('' as any),
        acceptanceCriteria: '',
      },
      startDate: null,
      finishDate: new Date(),
      displayCreatePollModal: false,
      minDate: new Date(),
      submitted: false,
      v$: useVuelidate(),
      PollAcceptanceCriteriaEnum,

      isDisabled: true,
      isCreationDateHelpActive: false,
    };
  },
  validations() {
    return {
      pollData: {
        title: { requiredValidator, cyrillicLangTextValidator, pollTitleLenghtValidator },
        description: { requiredValidator, cyrillicLangTextValidator, pollDescriptionLenghtValidator },
        polledHouses: { requiredValidator },
        acceptanceCriteria: !this.isEditing ? { requiredValidator } : '',
        creationDateInEdition: this.isEditing ? { requiredValidator } : '',
      },
      startDate: !this.isEditing ? { requiredValidator } : '',
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
        const fifteenDaysInMilliseconds = 15 * 86400000;
        this.finishDate = new Date(newVal.getTime() + fifteenDaysInMilliseconds);
        this.finishDate.setHours(23, 59, 59, 59);
        this.pollData.completionDate = this.finishDate.toLocaleString('uk-UA').split(',')[0];
      }
    );
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.minDate.setHours(0, 0, 0, 0);
  },
  methods: {
    cancel() {
      if (this.isEditing) {
        this.$emit('close-edit-poll');
      } else {
        this.$emit('cancel-creating-poll');
        this.resetPollDataFields();
      }
    },

    resetPollDataFields() {
      this.pollData.title = '';
      this.pollData.description = '';
      this.pollData.polledHouses = [];
      this.pollData.creationDate = new Date();
      this.pollData.completionDate = '';
      this.pollData.acceptanceCriteria = '';
    },

    changeDate(value: Date) {
      this.pollData.creationDate = value;
    },

    onChangeCreationDate() {
      const dateTomorrow = new Date();
      dateTomorrow.setDate(dateTomorrow.getDate() + 1);
      dateTomorrow.setHours(0, 0, 0, 0);
      const forteenDaysInMilliseconds = 14 * 86400000;
      if (this.pollData.creationDateInEdition < dateTomorrow) {
        this.isDisabled = true;
        this.isCreationDateHelpActive = true;
      } else {
        this.finishDate = new Date(this.pollData.creationDateInEdition.getTime() + forteenDaysInMilliseconds);
        this.pollData.completionDate = this.finishDate.toLocaleString('uk-UA').split(',')[0];

        this.isCreationDateHelpActive = false;
        this.isDisabled = false;
      }
    },

    async initData() {
      await this.$store.dispatch(
        `${StoreModuleEnum.pollsStore}/${PollsActionEnum.SET_SELECTED_POLL}`,
        this.$props.poll.id
      );

      this.pollData.title = this.selectedPoll?.header;
      this.pollData.description = this.selectedPoll?.description;
      this.pollData.polledHouses = this.selectedPoll?.polledHouses;
      this.pollData.creationDateInEdition = this.selectedPoll?.creationDate;
      this.pollData.completionDate = this.selectedPoll?.completionDate;
      this.finishDate = this.selectedPoll?.completionDate;
    },

    submitPollForm() {
      if (this.isEditing) {
        this.editPoll();
      } else {
        this.createPoll();
      }
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

    async editPoll() {
      const yearInUTC = this.pollData.creationDateInEdition.getFullYear();
      const monthInUTC = this.pollData.creationDateInEdition.getMonth();
      const dateInUTC = this.pollData.creationDateInEdition.getDate();
      const hoursInUTC = this.pollData.creationDateInEdition.getHours();
      const minutesInUTC = this.pollData.creationDateInEdition.getMinutes();
      const secondsInUTC = this.pollData.creationDateInEdition.getSeconds();
      const millisecondsInUTC = this.pollData.creationDateInEdition.getMilliseconds();

      const poll = {
        header: this.pollData.title,
        description: this.pollData.description,
        creationDate: new Date(
          Date.UTC(yearInUTC, monthInUTC, dateInUTC, hoursInUTC, minutesInUTC, secondsInUTC, millisecondsInUTC)
        ).toISOString(),
        completionDate: new Date(this.finishDate.getTime()).toISOString(),
        status: this.poll.status,
        polledHouses: this.pollData.polledHouses,
      };

      const ids = { cooperationId: this.cooperationIdEdit, pollId: this.$props.poll.id };

      await this.$store.dispatch(`${StoreModuleEnum.pollsStore}/${PollsActionEnum.UPDATE_POLL}`, {
        poll,
        ids,
      });

      this.$props.showSuccessOperation('редаговано');
      this.$emit('close-edit-poll');
    },
  },
  computed: {
    ...mapGetters({
      cooperationIdEdit: `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`,
      selectedPoll: `${StoreModuleEnum.pollsStore}/${PollsGettersEnum.getSelectedPoll}`,
      houses: `${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`,
    }),
    houseAddresses(): Array<string> {
      return this.houses.reduce((acc: Array<string>, cur: HouseModel) => {
        acc.push(
          `${cur.address?.houseNumber}, ${cur.address?.houseBlock}, ${cur.address?.district},${cur.address?.street}`
        );
        return acc;
      }, []);
    },
  },
  mounted() {
    if (this.isEditing) {
      try {
        this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, this.cooperationIdEdit);
        this.initData();
      } catch {
        console.log('error was caught during mounting BaseCooperationPoll');
      }
    } else {
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, this.cooperationId);
    }
  },
});
</script>

<style lang="scss" scoped>
%error-message {
  margin: 0.4em 0.5rem;
}

#calendar-finish {
  width: 200px;
}
.address-details {
  margin-left: 2rem;
  .dialog-item-address {
    margin-right: -2rem;
  }
}
.dialog-item {
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
  position: relative;
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
.p-inputtext.p-component {
  width: 400px;
}
.buttons-container {
  padding: 1rem 0;
  float: right;
  .p-button-outlined {
    margin-left: 20px;
  }
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

.warning-message {
  position: absolute;
  top: 3rem;
  right: 0rem;
}
</style>
