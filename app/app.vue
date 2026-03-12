<script setup lang="ts">
const colorMode = useColorMode()

colorMode.preference = 'dark'

const color = computed(() => colorMode.value === 'dark' ? '#171717' : 'white')

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.png' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
  ],

  htmlAttrs: {
    lang: 'ru'
  }
})

useSeoMeta({
  // ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/landing-light.png',
})
</script>

<template>
  <UApp :toaster="{ expand: false }">
    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>
