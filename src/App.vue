<template>
  <LoaderSpinner :isLoading="isLoading" />
  <Header />
  <Toast />
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from '@/components/Header.vue';
import Toast from 'primevue/toast';
import { HTTP, HTTP_AUTH } from '@/core/api/http-common';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export default defineComponent({
  name: 'app',
  components: {
    Header,
    Toast,
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
