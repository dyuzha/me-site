<template>
  <section
    ref="sectionRef"
    class="relative h-[30vh] overflow-hidden flex items-center"
  >
    <!-- Background -->
<div
  ref="bgRef"
  class="absolute top-0 left-0 w-full"
  :style="{
    height: '300%', // чуть больше, чем секция
    backgroundImage: `url(${optimizedImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }"
/>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40" />

    <!-- Content -->
    <div class="relative z-10 w-full px-6 md:ml-[20%]">
      <p class="text-2xl md:text-3xl mb-6 text-white font-light">
        Я открыт для сотрудничества в ваших проектах!
      </p>

      <UButton
        :to="mail"
        size="lg"
        class="rounded-full bg-black text-white hover:bg-black/70"
      >
        Связаться со мной
      </UButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const mail = 'mailto:matvey10d@gmail.com'
const imageUrl = '/images/hire-me.jpg'


// - Gen Image

// Для TS-safe импорта composable
import { useImage } from '#imports'

// Получаем $img из useImage()
const imageComposable = useImage()

// Генерируем URL, проверяем, что $img точно существует
const optimizedImage = imageComposable?.$img
  ? imageComposable.$img(imageUrl, { format: 'webp', quality: 20 })
  : imageUrl // fallback на оригинальный путь



gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)

// Код выполняется после того, как компонент отрендерился в DOM
onMounted(async () => {

  // Ждем, пока Vue закончит ренрерить реактивные изменения
  await nextTick()

  // Проверка на null
  if (!sectionRef.value || !bgRef.value) return

  gsap.to(bgRef.value, {
    yPercent: -40, // движение вверх на 40% собственной высоты
    ease: 'none', // линейно

    // Привязывает анимацию к скролу страницы
    scrollTrigger: {
      trigger: sectionRef.value, // Зона когда анимация активна
      start: 'top bottom', // Верх секции , низ экрана
      end: 'bottom top', // Низ секции , верх экрана
      scrub: true, // Синхронизирована со скролом (плавно)
      markers: false,
    },
  })

  ScrollTrigger.refresh()
})
</script>
