<template>
  <ErrorPage :errorNumber="errorNumber" :errorMessage="errorMessage" :decision="decision" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ErrorPage from '@/components/ErrorPage.vue';

export default defineComponent({
  name: 'PageErrorInvintation',
  components: { ErrorPage },
  data() {
    return {

      errorNumber: '403',
      errorMessage: 'На жаль, посилання, за яким ви перейшли недійсне або застаріле.',
      decision: 'Щоб зареєструватися, будь ласка, зверніться до адміністратора вашого кооперативу.',
    };
  },
});
</script>
