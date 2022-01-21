<template>
  <form>
    <div class="input-section">
      <label class="dialog-item" for="poll_title">Заголовок: </label>
      <InputText
        class="input-poll"
        id="poll_title"
        placeholder="Заголовок"
        v-model.trim="pollData.header"
        :class="{
          'p-invalid': v$.pollData.header.$error,
        }"
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
        id="poll_description"
        placeholder="Детальний опис"
        v-model.trim="pollData.description"
        rows="8"
        :class="{
          'p-invalid': v$.pollData.description.$error,
        }"
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
        <div v-for="house of houses" :key="house.id" class="p-field-checkbox">
          <Checkbox
            :id="house.id"
            name="category"
            :value="house"
            v-model="pollData.polledHouses"
            @input="isDisabled = false"
          />
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
        dateFormat="dd.mm.yy"
        @date-select="onChangeCreationDate"
      />
      <small v-if="isCreationDateHelpActive" id="poll_creationDate" class="p-error">
        Переконайтесь, що дата стоїть не раніше, ніж завтра!
      </small>
    </div>

    <div class="input-section">
      <label class="dialog-item" for="calendar-finish">Дата закінчення:</label>
      <Calendar
        id="calendar-finish"
        v-model="pollData.completionDate"
        :showIcon="true"
        dateFormat="dd.mm.yy"
        @date-select="isDisabled = false"
        :disabled="true"
      />
      <small id="apartment_area_help" class="p-warning">Виставляється автоматично 15 днів з дати початку</small>
    </div>
  </form>

  <div class="buttons-container">
    <Button
      label="Зберегти зміни"
      icon="pi pi-check"
      @click="editPoll"
      autofocus
      class="p-button-info"
      :disabled="isDisabled || v$.pollData.$invalid"
    />
    <Button
      label="Скасувати"
      icon="pi pi-times"
      @click="this.$emit('close-edit-poll')"
      class="p-button-outlined p-button-info"
    />
  </div>
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
import { PollsActionEnum, PollsGettersEnum, PutPollInterface } from '@/store/polls/types';
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
      const data = {
        header: this.pollData.header,
        description: this.pollData.description,
        creationDate: new Date(this.beginDate.toLocaleString('en-US')).toISOString(),
        completionDate: new Date(this.finishDate.toLocaleString('en-US')).toISOString(),
        status: this.$props.poll.status,
        polledHouses: this.pollData.polledHouses,
      };

      const ids = { cooperationId: this.cooperationId, pollId: this.$props.poll.id };

      await this.$store.dispatch(`${StoreModuleEnum.pollsStore}/${PollsActionEnum.UPDATE_POLL}`, {
        data,
        ids,
      });

      this.$props.showSuccessOperation('редаговано');
      this.$emit('close-edit-poll');
    },
    onChangeCreationDate() {
      const dateTomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);

      if (this.pollData.creationDate < dateTomorrow) {
        this.isDisabled = true;
        this.isCreationDateHelpActive = true;
      } else {
        this.beginDate.setHours(0, 0, 0, 0);

        this.finishDate = new Date();
        this.finishDate.setDate(this.pollData.creationDate.getDate() + 14);
        this.finishDate.setHours(23, 59, 59, 59);
        this.pollData.completionDate = this.finishDate;

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
  },
});
</script>

<style scoped lang="scss">
.buttons-container {
  float: right;
  .p-button-outlined {
    margin-left: 20px;
  }
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
.p-calendar {
  width: 200px;
}
.dialog-item {
  display: inline-block;
  width: 260px;
}

.p-inputtext.p-component {
  width: 400px;
}
</style>
