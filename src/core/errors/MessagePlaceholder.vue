<template>
  <Toast />
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import store from '@/store';
import { StoreModuleEnum } from '@/store/types';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { MessagesGetterEnum, MessagesI } from '@/core/messages/store/types';

export default defineComponent({
  name: 'MessagePlaceholder',
  components: {
    Toast,
  },
  setup() {
    const toast = useToast();
    const showError = (message: string, severity: string, status: string): void => {
      toast.add({
        severity: severity,
        summary: message,
        detail: status,
        life: 6000,
      });
    };

    watch(
      () => store.getters[`${StoreModuleEnum.messagesStore}/${MessagesGetterEnum.getMessages}`],
      function () {
        if (store.getters[`${StoreModuleEnum.messagesStore}/${MessagesGetterEnum.getMessages}`]) {
          const errorMessages = store.getters[
            `${StoreModuleEnum.messagesStore}/${MessagesGetterEnum.getMessages}`
          ].filter((message: MessagesI) => message.type === 'error');
          const last = errorMessages.at(-1);
          showError(last.status, last.type, last.message);
        }
      }
    );
    return { showError };
  },
});
</script>

<style scoped></style>
