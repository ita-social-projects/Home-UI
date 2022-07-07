<template>
  <div class="loader-outer" v-show="isLoading">
    <ProgressSpinner />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
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

    return { showLoader, hideLoader, isLoading };
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
