<template>
  <LoaderSpinner v-if="isLoading" />
  <Header />
  <Toast />
  <router-view />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
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

    computed(() => {
      return isLoading.value;
    });

    const showLoader = () => {
      isLoading.value = true;
    };
    const hideLoader = () => {
      isLoading.value = false;
    };

    HTTP.interceptors.request.use(
      (req: AxiosRequestConfig) => {
        showLoader();
        return req;
      },
      (error: AxiosError) => {
        hideLoader();
        return error;
      }
    );

    HTTP.interceptors.response.use(
      (response: AxiosResponse) => {
        hideLoader();
        return response;
      },
      (error: AxiosError) => {
        hideLoader();
        return error;
      }
    );

    HTTP_AUTH.interceptors.request.use(
      (req: AxiosRequestConfig) => {
        showLoader();
        return req;
      },
      (error: AxiosError) => {
        hideLoader();
        return error;
      }
    );

    HTTP_AUTH.interceptors.response.use(
      (response: AxiosResponse) => {
        hideLoader();
        return response;
      },
      (error: AxiosError) => {
        hideLoader();
        return error;
      }
    );

    return { isLoading, showLoader, hideLoader };
  },
});
</script>
