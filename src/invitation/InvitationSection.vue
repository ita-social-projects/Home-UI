<template>
  <div class="create_btn">
    <Dropdown
      class="drop-menu"
      v-model="typeContact"
      :options="contactsType"
      optionLabel="name"
      placeholder="Обрати ОСББ"
    />
    <Button
      label="Створити запрошення"
      icon="pi pi-pencil"
      class="p-button-outlined p-button-info"
      @click="this.displayCreateInvitModal = true"
    />
    <Dialog
      header="Створити запрошення"
      v-model:visible="displayModal"
      :style="{ width: '600px' }"
      :modal="true"
      :closable="false"
      :dismissableMask="true"
    >
      <CreateInvitationForm
        @close-invitation-modal="this.displayCreateInvitModal = false"
        @create-invitation="correctStatus"
      ></CreateInvitationForm>
    </Dialog>
  </div>

  <div class="container">
    <h1 class="page-title">{{ title }}</h1>
    <div class="container-invitations">
      <DataTable
        :value="invitations"
        class="p-datatable-sm"
        responsiveLayout="stack"
        breakpoint="570px"
        stripedRows
        showGridlines
      >
        <template #header>
          <span class="p-input-icon-right search-field">
            <i class="pi pi-search" />
            <InputText @input="debounceSearch" v-model="searchQuery" placeholder="Введіть електронну адресу" />
          </span>
        </template>
        <Column field="email" header="Email" :sortable="true" />
        <Column field="address" header="Адреса" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.apartment.address.street }}, {{ slotProps.data.apartment.address.houseBlock }},
            {{ slotProps.data.apartment.address.houseNumber }}
          </template>
        </Column>
        <Column field="status" header="Статус" :sortable="true" />
        <Column header="Опції">
          <template #body="slotProps">
            <Button
              icon="pi pi-cog"
              class="p-button p-button-info p-button-text"
              type="button"
              @click="toggle($event, slotProps.data)"
              aria-haspopup="true"
              aria-controls="overlay_menu"
            />
            <Menu :model="invitationActions()" id="overlay_menu" ref="menu" :popup="true" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import CreateInvitationForm from '@/invitation/CreateInvitationForm.vue';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import { StoreModuleEnum } from '@/store/types';
import {
  InvitationsGettersEnum,
  InvitationsActionsEnum,
  InvitationStatusType,
  InvitationStatusEnum,
} from '@/invitation/store/types';
import { mapGetters } from 'vuex';
import { InvitationModel } from '@/invitation/models/invitation.model';

export default defineComponent({
  name: 'InvitationSection',
  components: {
    Button,
    DataTable,
    Column,
    Menu,
    CreateInvitationForm,
    InputText,
    Dialog,
    Dropdown,
  },
  data() {
    return {
      searchQuery: '',
      debounceTimer: 0,
      title: 'Список запрошень',
      invitationActions: () => {
        return [
          {
            label: 'Видалити запрошення',
            icon: 'pi pi-times',
            command: () => {
              this.deleteInvitation();
            },
          },
          {
            label: 'Використати як шаблон',
            icon: 'pi pi-user-edit',
          },
        ];
      },
      displayCreateInvitModal: false,
      invitations: [] as Array<InvitationModel>,
      invitationInfo: {},
    };
  },
  async mounted() {
    await this.$store.dispatch(
      `${StoreModuleEnum.invitationsStore}/${InvitationsActionsEnum.SET_APARTMENT_INVITATIONS}`
    );
    this.correctStatus();
  },
  methods: {
    toggle(event: Event, data: InvitationModel): void {
      this.invitationInfo = data;
      (this.$refs.menu as any).toggle(event);
    },

    async deleteInvitation() {
      await this.$store.dispatch(
        `${StoreModuleEnum.invitationsStore}/${InvitationsActionsEnum.DEL_INVITATION}`,
        this.invitationInfo
      );
      this.correctStatus();
    },

    correctStatus() {
      this.invitations = this.invitationsList.map((invitation: any) => {
        let invitationItem = Object.assign({}, invitation);
        const status: InvitationStatusType = invitationItem.status;
        invitationItem.status = `${InvitationStatusEnum[status]}`;
        return invitationItem;
      });
    },

    searchEmail() {
      this.$store
        .dispatch(
          `${StoreModuleEnum.invitationsStore}/${InvitationsActionsEnum.SET_APARTMENT_INVITATIONS}`,
          this.searchQuery
        )
        .then(() => this.correctStatus());
    },
    debounceSearch() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(this.searchEmail, 500);
    },
  },

  computed: {
    ...mapGetters({
      invitationsList: `${StoreModuleEnum.invitationsStore}/${InvitationsGettersEnum.getInvitations}`,
    }),
    displayModal(): boolean {
      return this.displayCreateInvitModal;
    },
  },
});
</script>

<style lang="scss" scoped>
.page-title {
  text-align: center;
}
.container {
  margin-top: 70px;
  .container-invitations {
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) -1px 4px 5px 1px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    background-color: #fafafa;
    margin: 10px;
  }
}
.create_btn {
  display: flex;
  margin: 15px;
  justify-content: flex-end;
  .drop-menu {
    display: flex;
    width: 200px;
    margin-right: 26px;
    align-items: center;
    box-shadow: none;
  }
}
.search-field {
  display: block;
  text-align: right;
}

@media (min-width: 769px) {
  .create_btn .drop-menu {
    display: none;
  }
}

@media (max-width: 570px) {
  .container {
    margin-top: 50px;
  }

  .create_btn {
    flex-direction: column;
    align-items: flex-end;
    margin-top: 35px;
  }

  .create_btn .drop-menu {
    width: 235px;
    margin: 0 0 1rem 0;
  }

  h1 {
    font-size: 28px;
  }

  ::v-deep(.p-datatable-sm) {
    .p-column-title {
      margin-right: 1.5rem;
    }
  }
}
</style>
