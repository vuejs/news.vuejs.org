import { defineNuxtPlugin } from '#app'
// import { useStore } from '@/stores/index'

export default defineNuxtPlugin(async (nuxtApp) => {
  const store = useStore(nuxtApp.$pinia)
  await store.nuxtServerInit()
})
