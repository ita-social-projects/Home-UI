<template>
  <form @submit.prevent="editPoll()" id="edit_poll_form">
    <div class="input-section">
      <label class="dialog-item" for="poll_title">Заголовок: </label>
      <InputText
        v-model.trim="pollData.header"
        :class="{
          'p-invalid': v$.pollData.header.$error,
        }"
        class="input-poll"
        id="poll_title"
        placeholder="Заголовок"
        @blur="v$.pollData.header.$touch"
        @input="isDisabled = false"
      />
      <small v-if="v$.pollData.header.$error" id="poll_title" class="p-error">{{
        v$.pollData.header.$errors[0].$message
      }}</small>
    </div>

    <div class="input-section">
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
      <small v-if="v$.pollData.description.$error" id="poll_description" class="p-error">{{
        v$.pollData.description.$errors[0].$message
      }}</small>
    </div>

    <div class="input-section">
      <label class="dialog-item" for="poll_polledHouses">Список будинків: </label>
      <div class="checkbox-section">
        <div v-for="(house, index) of houses" :key="house.id" class="p-field-checkbox">
          <Checkbox
            v-model="pollData.polledHouses"
            :value="house"
            :id="house.id"
            :class="{
              'p-invalid': v$.pollData.polledHouses.$error,
            }"
            name="category"
            @input="isDisabled = false"
            @blur="v$.pollData.polledHouses.$touch"
          />
          <label class="house-label" :for="house.id">
            {{ houseAddresses[index] }}
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
        v-model="pollData.creationDate"
        :showIcon="true"
        :class="{
          'p-invalid': v$.pollData.creationDate.$error,
        }"
        id="caledar-begin"
        dateFormat="dd.mm.yy"
        @date-select="onChangeCreationDate"
        @blur="v$.pollData.creationDate.$touch"
      />
      <small v-if="isCreationDateHelpActive" id="poll_creationDate" class="p-error сreationDate-рelp">
        Переконайтесь, що дата стоїть не раніше, ніж завтра!
      </small>
      <small v-if="v$.pollData.creationDate.$error" id="poll_creationDate" class="p-error">{{
        v$.pollData.creationDate.$errors[0].$message
      }}</small>
    </div>

    <div class="input-section">
      <label class="dialog-item" for="calendar-finish">Дата закінчення:</label>
      <Calendar
        v-model="pollData.completionDate"
        :showIcon="true"
        :disabled="true"
        id="calendar-finish"
        dateFormat="dd.mm.yy"
        @date-select="isDisabled = false"
      />
      <small id="apartment_area_help" class="p-warning">Виставляється автоматично 15 днів з дати початку.</small>
    </div>

    <div class="buttons-container">
      <Button
        :disabled="isDisabled || v$.pollData.$invalid"
        label="Зберегти зміни"
        icon="pi pi-check"
        autofocus
        class="p-button-info"
        type="submit"
        value="Submit"
      />
      <Button
        label="Скасувати"
        icon="pi pi-times"
        class="p-button-outlined p-button-info"
        @click="this.$emit('close-edit-poll')"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import {
  requiredValidator,
  pollTitleLenghtValidator,
  pollDescriptionLenghtValidator,
  cyrillicLangTitleValidator,
} from '@/utils/validators';
import { StoreModuleEnum } from '@/store/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/store/houses/types';
import { CooperationGettersEnum } from '@/store/cooperation/types';
import { PollsActionEnum, PollsGettersEnum } from '@/store/polls/types';
import { PollModel } from '@/store/polls/models/poll.model';
import useVuelidate from '@vuelidate/core';
import { HouseModel } from '@/shared/models/house.model';

export default defineComponent({
  name: 'EditCooperationPollForm',
  components: {
    Button,
    Calendar,
    Checkbox,
    Textarea,
    InputText,
  },
  data() {
    return {
      pollData: {
        header: '',
        description: '',
        polledHouses: [] as Array<HouseModel>,
        creationDate: '' as any,
        completionDate: '' as any,
      },

      isDisabled: true,
      isCreationDateHelpActive: false,

      beginDate: new Date(),
      finishDate: new Date(),

      v$: useVuelidate(),
    };
  },
  props: {
    poll: {
      type: PollModel,
      required: true,
    },
    displayEditPollModal: {
      type: Boolean,
      required: true,
    },
    showSuccessOperation: {
      type: Function,
      required: true,
    },
  },
  validations() {
    return {
      pollData: {
        header: { requiredValidator, pollTitleLenghtValidator, cyrillicLangTitleValidator },
        description: { requiredValidator, pollDescriptionLenghtValidator, cyrillicLangTitleValidator },
        polledHouses: { requiredValidator },
        creationDate: { requiredValidator },
      },
    };
  },
  mounted() {
    try {
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, this.cooperationId);
      this.initData();
    } catch {
      console.log('error was caught during mounting BaseCooperationPoll');
    }
  },
  methods: {
    async initData() {
      await this.$store.dispatch(
        `${StoreModuleEnum.pollsStore}/${PollsActionEnum.SET_SELECTED_POLL}`,
        this.$props.poll.id
      );

      this.pollData.header = this.selectedPoll.header ?? '';
      this.pollData.description = this.selectedPoll?.description ?? 'Повний опис опитування';
      this.pollData.polledHouses = this.selectedPoll?.polledHouses ?? [];
      this.pollData.creationDate = this.selectedPoll?.creationDate.toLocaleString('uk-UA');
      this.pollData.completionDate = this.selectedPoll?.completionDate.toLocaleString('uk-UA');

      this.beginDate = this.selectedPoll?.creationDate;
      this.finishDate = this.selectedPoll?.completionDate;
    },
    async editPoll() {
      const poll = {
        header: this.pollData.header,
        description: this.pollData.description,
        creationDate: new Date(this.beginDate.toLocaleString('en-US')).toISOString(),
        completionDate: new Date(this.finishDate.toLocaleString('en-US')).toISOString(),
        status: this.$props.poll.status,
        polledHouses: this.pollData.polledHouses,
      };

      const ids = { cooperationId: this.cooperationId, pollId: this.$props.poll.id };

      await this.$store.dispatch(`${StoreModuleEnum.pollsStore}/${PollsActionEnum.UPDATE_POLL}`, {
        poll,
        ids,
      });

      this.$props.showSuccessOperation('редаговано');
      this.$emit('close-edit-poll');
    },
    onChangeCreationDate() {
      const dateTomorrow = new Date();
      dateTomorrow.setDate(dateTomorrow.getDate() + 1);
      dateTomorrow.setHours(0, 0, 0, 0);

      if (this.pollData.creationDate < dateTomorrow) {
        this.isDisabled = true;
        this.isCreationDateHelpActive = true;
      } else {
        this.beginDate.setHours(0, 0, 0, 0);

        this.finishDate = new Date(this.pollData.creationDate.getTime() + 14 * 86400000);
        this.finishDate.setHours(23, 59, 59, 59);
        this.pollData.completionDate = this.finishDate.toLocaleString('uk-UA').split(',')[0];

        this.isCreationDateHelpActive = false;
        this.isDisabled = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      cooperationId: `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`,
      selectedPoll: `${StoreModuleEnum.pollsStore}/${PollsGettersEnum.getSelectedPoll}`,
      houses: `${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`,
    }),
    houseAddresses(): Array<string> {
      return this.houses.reduce((acc: Array<string>, cur: HouseModel) => {
        acc.push(
          `${cur.address?.houseNumber}, ${cur.address?.houseBlock}, ${cur.address?.district}, ${cur.address?.street}`
        );
        return acc;
      }, []);
    },
  },
});
</script>

<style scoped lang="scss">
%error-message {
  padding-top: 1.2em;
  margin: 0.2em 0.9rem;
  width: 80%;
}
form {
  .input-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    .dialog-item {
      display: inline-block;
      width: 260px;
    }
    .checkbox-section {
      border: 1px solid #d4d4d8;
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
      border-radius: 5px;
      padding: 15px;
      width: 400px;
      height: 140px;
      overflow: auto;

      .p-field-checkbox {
        height: 30px;
        .house-label {
          padding-left: 10px;
        }
      }
    }
    .p-error {
      display: flex;
      position: absolute;
      justify-content: right;
      margin: -35px -25px 0 -50px;
      @extend %error-message;
    }
    .p-warning {
      display: flex;
      position: absolute;
      justify-content: right;
      width: 400px;
      color: #3b82f6;
      margin: 3em 0 0 8rem;
      @extend %error-message;
    }
    .сreationDate-рelp {
      display: flex;
      justify-content: right;
      width: 400px;
      color: #f63b3b;
      margin: 3em 0 0 8rem;
      @extend %error-message;
    }
  }

  .p-inputtext.p-component {
    width: 400px;
  }
  .buttons-container {
    margin: 1rem 0 0 0;
    float: right;
    .p-button-outlined {
      margin-left: 20px;
    }
  }
}
</style>
