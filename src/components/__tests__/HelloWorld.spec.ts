import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CHeader from "../../layouts/visitors/CHeader.vue";

// describe('HelloWorld', () => {
//   it('renders properly', () => {
//     const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
//     expect(wrapper.text()).toContain('Hello Vitest')
//   })
// })

describe('CHeader', () => {
    it('renders properly', () => {
        const wrapper = mount(CHeader)
        expect(wrapper.text()).toContain('Prendre un Rendez-vous')
    })
})
