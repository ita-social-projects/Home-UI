<template>
  <Toast />
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useStore } from 'vuex';
import { StoreModuleEnum } from '@/store/types';
import { MessagesActionEnum } from '../messages/store/types';

export default defineComponent({
  name: 'MessagePlaceholder',
  components: {
    Toast,
  },
  setup() {
    const toast = useToast();
    const showMessage = (message: string, severity: string, status: string): void => {
      toast.add({
        severity: severity,
        summary: message,
        detail: status,
        life: 6000,
      });
    };
    const MESSAGES_CHUNK = 3;
    const store = useStore();
    const updatedList = computed(() => {
      return store.state.messagesStore.messages;
    });

    watch(
      () => updatedList.value,
      () => {
        if (updatedList.value) {
          const { length, [length - 1]: last } = updatedList.value;
          if (length > MESSAGES_CHUNK) {
            store.dispatch(`${StoreModuleEnum.messagesStore}/${MessagesActionEnum.INVOKE_MESSAGES_CUT}`);
          }
          showMessage(last.type, last.type, last.message);
        }
      }
    );
    return { showMessage };
  },
});
</script>

<style scoped></style>
