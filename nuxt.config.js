import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  app: {
    // pageTransition: { name: "page" , mode:"out-in" },
    head: {
      link: [{ rel: "icon", href: "/images/Logo.png" }],
      meta: [
        { "http-equiv": "x-ua-compatible", content: "IE=edge" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      ],
    },
  },

  css: ["assets/styles/global.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/variables.scss" as *;`,
        },
      },
    },
  },

  modules: [
    "nuxt-graphql-client",
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/i18n"
  ],

  runtimeConfig: {
    public: {
      GQL_HOST: process.env.API_KEY || "https://staging-api.tatmeen.sa/graphql",
      BASE_URL: process.env.BASE_URL || "https://staging-api.tatmeen.sa/",
      BUCKET_URL:
        process.env.BUCKET_URL ||
        "https://tatmeen-staging.s3.eu-central-1.amazonaws.com/",
    },
  },
  i18n: {
    customRoutes: 'config', 
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
    locales: [
      {
        name : "English" , 
        code: "en",
        iso: "en-US",
        file: "en.yaml",
        dir: "ltr",
      },
      {
        name : "العربية" , 
        code: "ar",
        iso: "ar-SA",
        file: "ar.yaml",
        dir: "rtl",
      },
    ],
 

    defaultLocale: "en",
    lazy: false,
    langDir: "locales",
    detectBrowserLanguage: false,
    vueI18n: "./config/i18n.config.ts", // if you are using custom path, default
  },
  tailwindcss: {
    configPath: 'tailwind.config.js' ,
    cssPath: '~/assets/css/tailwind.css',
  },
  ssr: false,
  devtools: { enabled: true, vscode: { enabled: true } },
});
