// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: "Books",
      link: [
        {
          type: "image/png",
          rel: "icon",
          href: "/icons/logo.png",
        },
      ],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/fonts",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  vite: {
    vue: {
      script: {
        globalTypeFiles: [
          fileURLToPath(new URL("./types/global.d.ts", import.meta.url)),
        ],
      },
    },
  },
});
