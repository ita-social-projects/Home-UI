import { Store } from 'vuex';
import { RootStateInterface } from '@/store/types';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootStateInterface>;
  }
}
