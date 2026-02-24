<script setup lang="ts">
const route = useRoute()

// загружаем все проекты и ищем нужный по slug
const { data: project } = await useAsyncData('project', async () => {
  const allProjects = await queryCollection('projects').all()
  return allProjects.find(p => p.slug === route.params.slug)
})

// 404 если проект не найден
if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}
</script>

<template>
  <div v-if="project">
    <UPageSection>
      <img :src="project.cover" :alt="project.title" />
      <ContentRenderer :value="project" />
    </UPageSection>
  </div>
</template>
