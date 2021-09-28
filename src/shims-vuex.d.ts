import { RootStateInterface, Store } from '@/store/types';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootStateInterface>;
  }
}
