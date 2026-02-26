<template>
  <section id="home" class="relative h-screen flex
    items-center justify-center text-center overflow-hidden">


    <div class="absolute inset-0 bg-black/60"></div>

    <div class="relative z-10 flex flex-col items-center px-4">

      <p class="text-xl mb-4">Привет, меня зовут</p>

      <h1 class="text-4xl md:text-6xl font-light uppercase text-primary mb-4">
        Дюжев Матвей
      </h1>

      <!-- Typed -->
      <p class="text-xl mb-6 font-mono">
        Я <span ref="typedEl" class="font-mono"></span>
      </p>

      <UButton size="lg" variant="outline" :to="mail" class="border-white text-white bg-transparent hover:bg-white/10">
        Связаться со мной
      </UButton>
    </div>

    <div class="absolute bottom-8 w-full flex justify-center">
      <img src="/images/scroll.gif" class="h-20" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Typed from 'typed.js'

const mail = 'mailto:matvey10d@gmail.com'
const typedEl = ref(null)

let typedInstance

onMounted(() => {
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
</script>

<style scoped>
section {
  position: relative;
  background-color: transparent;
}

section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/background.jpg');
  background-size: cover;
  background-position: center;
  z-index: -2;
}
</style>
