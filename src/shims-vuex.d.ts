import { RootStateInterface, StoreType } from '@/store/types';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: StoreType<RootStateInterface>;
    //      required      ^^^^^^^^^
  }
}
