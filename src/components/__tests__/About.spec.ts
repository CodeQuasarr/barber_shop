import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils';
import CAbout from '@/components/CAbout.vue';



vi.mock('@/assets/images/abouts/about1.webp', () => ({
    default: 'aboutImage1MockPath'
}));
vi.mock('@/assets/images/abouts/about2.webp', () => ({
    default: 'aboutImage2MockPath'
}));


describe('CAbout', () => {
    it('renders correctly', () => {
        const wrapper = mount(CAbout);
        expect(wrapper.exists()).toBe(true);
    });

    it('Cointains specific text content', () => {
        const wrapper = mount(CAbout);
        expect(wrapper.text()).toContain('À propos de nous');
        expect(wrapper.text()).toContain('C\'est ici');
        expect(wrapper.text()).toContain("Bienvenue au salon de coiffure Miroir de Style");
    });

    it('renders images', () => {
        const wrapper = mount(CAbout);
        const images = wrapper.findAll('img');
        expect(images.length).toBe(2);
        expect(images[0].attributes('src')).toBe('aboutImage1MockPath');
        expect(images[1].attributes('src')).toBe('aboutImage2MockPath');
    });

    it('renders RouterLink', () => {
        const wrapper = mount(CAbout);
        const routerLink = wrapper.findComponent({ name: 'RouterLink' });
        expect(routerLink.exists()).toBe(true);
        expect(routerLink.props().to).toBe('/');
    });
});
