import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import CClientTestimonials from "@/components/CClientTestimonials.vue";

// Mock the image import
vi.mock('@/assets/images/abouts/about4.webp', () => ({
    default: 'aboutImage4MockPath'
}));

describe('CClientTestimonials.vue', () => {
    it('renders correctly', () => {
        const wrapper = mount(CClientTestimonials);
        expect(wrapper.exists()).toBe(true);
    });

    it('displays client testimonials correctly', () => {
        const wrapper = mount(CClientTestimonials);
        const testimonials = wrapper.findAll('p.text-xl');
        expect(testimonials.length).toBe(3);
        expect(testimonials[0].text()).toContain('Le Salon est tout simplement extraordinaire !');
        expect(testimonials[1].text()).toContain('Chaque visite est un vrai moment de détente.');
        expect(testimonials[2].text()).toContain('Je suis cliente depuis des années et je n\'ai jamais été déçue.');
    });

    it('changes current index when a different testimonial is clicked', async () => {
        const wrapper = mount(CClientTestimonials);
        const indicators = wrapper.findAll('span.cursor-pointer');
        await indicators[1].trigger('click');
        // @ts-ignore
        expect(wrapper.vm.currentIndex).toBe(1);
        await indicators[2].trigger('click');
        // @ts-ignore
        expect(wrapper.vm.currentIndex).toBe(2);
    });

    it('displays the image correctly', () => {
        const wrapper = mount(CClientTestimonials);
        const img = wrapper.find('img');
        expect(img.exists()).toBe(true);
        expect(img.attributes('src')).toBe('aboutImage4MockPath');
    });
});
