// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase", '@pinia/nuxt'],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/signup'],
    }
  },
  imports: {
    dirs: ['./stores']
  },
  colorMode: {
    preference: 'light'
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
    }
  }
})