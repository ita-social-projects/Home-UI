<template>
  <Toast />
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { MessagesI } from '@/core/messages/store/types';
import { useStore } from 'vuex';

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
    const store = useStore();
    const updatedList = computed(() => {
      return store.state.messagesStore.messages;
    });

    watch(
      () => updatedList.value,
      function () {
        if (updatedList.value) {
          updatedList.value.forEach((message: MessagesI) => {
            showMessage(message.status.toString(), message.type, message.message);
          });
        }
      }
    );
    return { showMessage };
  },
});
</script>

<style scoped></style>
