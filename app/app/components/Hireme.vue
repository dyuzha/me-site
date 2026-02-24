<template>
  <div
    class="relative h-[200px] bg-cover bg-center bg-fixed flex items-center"
    :style="{ backgroundImage: `url(${imageUrl})` }"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40" />

    <!-- Content -->
    <div
      class="relative z-10 w-full px-4 md:ml-[20%]"
      data-aos="fade-right"
    >
      <div class="text-left">
        <p class="text-xl md:text-2xl mb-4 text-white">
        Я открыт для сотрудничества в ваших проектах!
        </p>

        <UButton
          :to="mail"
          variant="solid"
          size="lg"
          class="rounded-full bg-black text-white hover:bg-black/70"
        >
          Связаться со мной
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const mail = 'mailto:matvey10d@gmail.com'
const imageUrl = '/images/hire-me.jpg'
</script>
