// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Notifications App'
    }
  },

  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-03-09'
})