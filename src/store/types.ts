import { AxiosError, AxiosResponse } from 'axios';
import { UserStateInterface, UserStoreType } from '@/store/user/types';
import { AuthorizationStateInterface, AuthorizationStoreType } from '@/store/authorization/types';
import { CooperationStateInterface, CooperationStoreType } from '@/store/cooperation/types';

export interface RootStateInterface {
  cooperationStore: CooperationStateInterface;
  userStore: UserStateInterface;
  authorizationStore: AuthorizationStateInterface;
}

export type StoreType = CooperationStoreType<CooperationStateInterface> &
  AuthorizationStoreType<AuthorizationStateInterface> &
  UserStoreType<UserStateInterface>;

// export type StoreType<S> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
//   commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
//     key: K,
//     payload: P,
//     options?: CommitOptions
//   ): ReturnType<Mutations[K]>;
// } & {
//   dispatch<K extends keyof Actions>(
//     key: K,
//     payload: Parameters<Actions[K]>[1],
//     options?: DispatchOptions
//   ): ReturnType<Actions[K]>;
// } & {
//   getters: {
//     [K in keyof Getters]: ReturnType<Getters[K]>;
//   };
// };

export type requestPayload<T> = {
  data: T;
  successCallback(response?: AxiosResponse): void;
  errorCallback(error?: AxiosError): void;
};
