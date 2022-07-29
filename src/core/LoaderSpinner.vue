<template>
  <div class="loader-outer" v-show="isLoading">
    <ProgressSpinner />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';
import { HTTP, HTTP_AUTH } from '@/core/api/http-common';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export default defineComponent({
  name: 'LoaderSpinner',
  components: {
    ProgressSpinner,
  },

  setup() {
    const isLoading = ref(false);

    HTTP.interceptors.request.use(
      (req: AxiosRequestConfig) => {
        isLoading.value = true;
        return req;
      },
      (error: AxiosError) => {
        isLoading.value = false;
        return error;
      }
    );
    HTTP.interceptors.response.use(
      (response: AxiosResponse) => {
        isLoading.value = false;
        return response;
      },
      (error: AxiosError) => {
        isLoading.value = false;
        return error;
      }
    );
    HTTP_AUTH.interceptors.request.use(
      (req: AxiosRequestConfig) => {
        isLoading.value = true;
        return req;
      },
      (error: AxiosError) => {
        isLoading.value = false;
        return error;
      }
    );
    HTTP_AUTH.interceptors.response.use(
      (response: AxiosResponse) => {
        isLoading.value = false;
        return response;
      },
      (error: AxiosError) => {
        isLoading.value = false;
        return error;
      }
    );

    return { isLoading };
  },
});
</script>

<style lang="scss" scoped>
.loader-outer {
  display: grid;
  z-index: 1;
  background: hsla(0, 0%, 25%, 0.7);
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  transition: opacity 0.2s;
}
</style>
