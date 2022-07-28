import { HTTP, HTTP_AUTH } from '@/core/api/http-common';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { App, ref } from 'vue';

export default {
  install: (app: App): void => {
    const isLoading = ref(false);
    app.config.globalProperties.$isLoading = isLoading;

    app.mixin({
      data() {
        return {};
      },

      created() {
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
      },
    });
  },
};
