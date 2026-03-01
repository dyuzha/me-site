<script setup lang="ts">
import ProjectModal from './ProjectModal.vue';

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').all()
})

if (!projects.value?.length) {
  throw createError(
    { statusCode: 404, statusMessage: 'Page not found', fatal: true }
  )
}


const overlay = useOverlay()
const modal = overlay.create(ProjectModal)


async function openModal(projectData: any) {
  const instance = modal.open({ project: projectData })
  await instance.result

}
</script>

<template>
  <UPageColumns>



    <UPageCard
      v-for="project in projects"
      class="group relative overflow-hidden h-80 cursor-pointer"
      :key=project.id
      @click="openModal(project)"
    >

      <!-- Фон -->
      <div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style="background-image: url('/images/amo-sync3.png')"
        :style="{ backgroundImage: `url(${project.img})` }"
        />

      <!-- Затемнение -->
      <div class="absolute inset-0 bg-black/40" />

      <!-- Контент -->
      <div class="absolute bottom-0 w-full p-6 text-white transition-all duration-500
             group-hover:bottom-10">
        <h3 class="text-xl font-semibold">
          {{project.title}}
        </h3>

        <p class="mt-2 opacity-0 translate-y-4 transition-all duration-500
               group-hover:opacity-100 group-hover:translate-y-0">
          {{ project.description?.length > 200 ? project.description.slice(0, 200) + '...' : project.description }}
        </p>
      </div>
    </UPageCard>


  </UPageColumns>
</template>
