<template>
  <Toast />
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import store from '@/store';
import { StoreModuleEnum } from '@/store/types';
import { ErrorsActionEnum, ErrorsGetterEnum } from '@/store/errors/types';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
  name: 'ErrorsNotify',
  components: {
    Toast,
  },
  setup() {
    const toast = useToast();
    const showError = (message: string, status: number) => {
      toast.add({
        severity: 'error',
        summary: String(status),
        detail: message,
        life: 6000,
      });
    };
    watch(
      () => store.getters[`${StoreModuleEnum.errorsStore}/${ErrorsGetterEnum.getErrorMessage}`],
      function () {
        if (store.getters[`${StoreModuleEnum.errorsStore}/${ErrorsGetterEnum.getErrorMessage}`].errorMessage) {
          const serverError = store.getters[`${StoreModuleEnum.errorsStore}/${ErrorsGetterEnum.getErrorMessage}`];
          showError(serverError.errorMessage, serverError.errorStatus);
          store.dispatch(`${StoreModuleEnum.errorsStore}/${ErrorsActionEnum.RESET_ERROR_ACTION}`);
        }
      }
    );
    return { showError };
  },
});
</script>

<style scoped></style>
