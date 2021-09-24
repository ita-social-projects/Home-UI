import { AxiosError, AxiosResponse } from 'axios';

export interface RootStateInterface {
  hello: string;
  world: string;
}

export type requestPayload = {
  params: { [key: string]: string | number | boolean };
  successCallback(response: AxiosResponse): void;
  errorCallback(error?: AxiosError): void;
};
