import { mount } from '@vue/test-utils'
import NuMainContentxtLogo from '@/components/main/MainContent.vue'

describe('NuxtLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(MainContent)
    expect(wrapper.vm).toBeTruthy()
  })
})
