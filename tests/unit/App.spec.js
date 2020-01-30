import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import App from '@/App.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

test('renders correctly', () => {
    const wrapper = mount(App, { localVue, router });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
});
