<script setup lang="ts">

useSeoMeta({
  title: "Fullstack разработчик Дюжев Матвей",
  ogTitle: "Fullstack разработчик Дюжев Матвей",
  description: "Fullstack разработчик Дюжев Матвей",
  ogDescription: "Fullstack разработчик Дюжев Матвей",
})

</script>


<template>
  <UPage>

    <AppHome />
    <AppAbout />
    <AppHome2 />
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
