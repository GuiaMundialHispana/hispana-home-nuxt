// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@/assets/css/main.css',
  ],
  routeRules:{
    '/profile': { ssr: false },
    '/edit-property': { ssr: false },
    '/PostProperty': { ssr: false },
    '/payment': {ssr: false}
  },
  app: {
    head: {
      title: 'Grupo Casas & mas',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
      script: [
        {
          src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD4T85-FkXl586zyEpYLy32ipUyGAvLSAs',
          defer: true
        }
      ]
    },
  },
  modules: [
    'nuxt-icons',
    'nuxt-viewport',
    'nuxt-swiper',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
  ],
  viewport: {
    breakpoints: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
    defaultBreakpoints: {
      desktop: 'lg',
      mobile: 'xs',
      tablet: 'md',
    },
    fallbackBreakpoint: 'lg'
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      API: process.env.BASE_URL,
      PUBLISH_KEY: process.env.PUBLISH_KEY
    }
  },
  experimental: {
    renderJsonPayloads: false
  }
})
