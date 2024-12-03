// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],
  pinia: {
    autoImports: ['defineStore'], // автоматически импортировать defineStore
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
        },
      ]
    }
  },
  css: ['@/assets/css/theme.css',
    'bootstrap/dist/css/bootstrap.min.css',
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  nitro: {
    watchOptions: {
      usePolling: true, // Использовать опрос для снижения нагрузки
      interval: 1000,   // Интервал между проверками
      depth: 2          // Глубина отслеживания (уменьшите для снижения нагрузки)
    },
  },
});
