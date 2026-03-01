<template>
  <section
    id="home"
    ref="sectionRef"
    class="relative h-screen overflow-hidden flex items-center"
  >

        <!-- Background -->
    <div
      ref="bgRef"
      class="absolute top-0 left-0 w-full"
      :style="{
        height: '125%', // чуть больше, чем секция
        backgroundImage: `url(${optimizedImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }"
    />

    <div class="relative z-10 w-full flex flex-col items-center px-4">
      <p class="text-xl mb-4">Привет, меня зовут</p>

      <h1 class="text-4xl md:text-6xl font-light uppercase text-primary mb-4">
        Дюжев Матвей
      </h1>

      <!-- Typed -->
      <p class="text-xl mb-6 font-mono text-white">
        Я <span ref="typedEl" class="font-mono"></span>
      </p>

      <UButton
        size="lg"
        variant="outline"
        :to="mail"
        class="border-white text-white bg-transparent hover:bg-white/10"
      >
      Связаться со мной
      </UButton>
    </div>

    <div class="absolute bottom-8 w-full flex justify-center">
      <img src="/images/scroll.gif" class="h-20" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import gsap from 'gsap'
import Typed from 'typed.js'
import ScrollTrigger from 'gsap/ScrollTrigger'


const imageUrl = '/images/background.jpg'
const mail = 'mailto:matvey10d@gmail.com'


// - Gen Image

// Для TS-safe импорта composable
import { useImage } from '#imports'

// Получаем $img из useImage()
const imageComposable = useImage()

// Генерируем URL, проверяем, что $img точно существует
const optimizedImage = imageComposable?.$img
  ? imageComposable.$img(imageUrl, { format: 'webp', quality: 20 })
  : imageUrl // fallback на оригинальный путь


// -- Typed --

// ref для HTML-элемента, который будет анимироваться
const typedEl = ref<HTMLElement | null>(null)

// typedInstance с типом Typed | undefined
let typedInstance: Typed | undefined

onMounted(() => {
  if (!typedEl.value) return

  typedInstance = new Typed(typedEl.value, {
    strings: [
      'Full stack разработчик',
      'DevOps инженер',
      'Linux администратор'
    ],
    typeSpeed: 30,
    backSpeed: 30,
    loop: true,
  })
})

onBeforeUnmount(() => {
  typedInstance?.destroy()
})



// -- Paralax --
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
    yPercent: -20, // движение вверх на 40% собственной высоты
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
