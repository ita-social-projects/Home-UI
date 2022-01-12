import { ComponentPublicInstance } from 'vue';
import { DOMWrapper, VueWrapper } from '@vue/test-utils';

export const inputSetValueHandler = async (
  element: DOMWrapper<HTMLElement> | null,
  value: string | number,
  selector?: string,
  wrapper?: VueWrapper<ComponentPublicInstance>
): Promise<void> => {
  if (!element && wrapper && selector) {
    const el = wrapper.find(selector);
    await el.setValue(value);
    await el.trigger('blur');

    return;
  }

  if (element) {
    await element.setValue(value);
    await element.trigger('blur');

    return;
  }
};
