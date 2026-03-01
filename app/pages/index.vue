<script setup lang="ts">

useSeoMeta({
  title: "Дюжев Матвей — Fullstack разработчик (DevOps, IaC, CI/CD, Python, TypeScript, Backend)",
  ogTitle: "Дюжев Матвей — Fullstack разработчик (DevOps, IaC, CI/CD, Python, TypeScript, Backend)",
  description: "Построение микросервисной архитектуры. Настройка CI/CD пайплайнов. Разработка микросервисов на Python, TypeScript. Автоматизация бизнеспроцессов.",
  ogDescription:"Построение микросервисной архитектуры. Настройка CI/CD пайплайнов. Разработка микросервисов на Python, TypeScript. Автоматизация бизнеспроцессов.",

})


</script>


<template>
  <UPage>

    <AppHome />
    <AppAbout />
    <AppSkills />
    <Hireme />


    <UPageSection
    id="projects"
    title="Мои проекты"
    :ui="{
      title: 'text-4xl font-light text-center text-primary',
    }"
    >
      <AppPageColumns />

      <!-- View More -->
      <div class="text-center mt-12">
        <UButton
          target="_blank"
          variant="outline"
          size="lg"
          class="rounded-full"
          to="https://github.com/dyuzha"
        >
          Смотреть больше
        </UButton>
      </div>
    </UPageSection>

  </UPage>
</template>
