<template>
<div >
  <ParticleBackground
    :particleCount="300"
    :particleRadius="1"
    particleColor="2,243,230"
    :particleAlpha="0.3"
    :lineAlpha="0.2"
    :lineDistance="80"
    :mouseDistance="140"

    :secondParticleCount="100"
    :secondParticleRadius="2"
    secondParticleColor="68,161,234"
    :secondParticleAlpha="0.3"
    :secondLineDistance="120"
    :secondMouseDistance="160"
  >
  <UPageSection
    id="about"
    class="py-24 text-white"
    title="Обо мне"
    :ui="{
      title: 'text-4xl font-light text-center text-primary',
      container: 'py-0 sm:py-0 lg:py-0 sm:gap-16',
    }"

  >

    <div class="
      container mx-auto px-6 max-w-5xl
      ">

      <!-- Фото -->
      <div class="flex justify-center mb-10">

      <NuxtImg
        src="/images/me.png"
        alt="Me"
        format="webp"
        quality="40"
        class="w-48 h-48 rounded-full border border-zinc-700 object-cover"
        />

      </div>

      <!-- Цитата -->
      <div class="text-center text-2xl max-w-3xl mx-auto mb-12 font-mono">
        <q>
          В основе стереотипного мышления лежит идея формирования абстракций
        </q>
      </div>

      <!-- Контент -->
      <div class="space-y-6 text-lg font-mono leading-relaxed text-zinc-300 md:px-12">
        <p>
        Разрабатываю приложения, интеграции и сайты на Python и TypeScript.
        Использую микросеврисную архитектуру.
        Для упрощение разработки, тестирования и развертывания активно использую Gitlab Ci, Ansible и Docker.
        Люблю Linux, vim, консоль и все что с ними связано.
        Имею домашную лабораторию с ProxMox VE, VPN (Vless), proxy - сервера, NextCloud.
        </p>

        <p>
        Свободное время посвещаю изучению новых технологий, автоматизации собственных процессов.
        Активно занимаюсь спортом. Катаюсь на сноуборде, играю в хоккей.
        В прошлом профессиональных хоккеист.

        Люблю изучать новое и постоянно развиваюсь.

        </p>
      </div>

      <!-- Technologies -->
      <div class="mt-16">
        <Technologies />
      </div>

    </div>
  </UPageSection>

    </ParticleBackground>

</div>

</template>

<script setup>
import Technologies from '~/components/Technologies.vue'
</script>
