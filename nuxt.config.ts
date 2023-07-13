// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: {enabled: true},
    pages: true,
    modules: [
        '@nuxthq/ui',
        '@nuxt/content',
    ],
    css: ['~/assets/css/main.css'],
    content: {},
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: {
            apiBase: 'http://127.0.0.1:8080'
        }
    }
})
