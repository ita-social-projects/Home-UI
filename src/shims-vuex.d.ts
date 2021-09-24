import { Store } from '@/store';
import { RootStateInterface } from '@/store/types';

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<RootStateInterface>;
  }
}
