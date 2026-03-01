<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

const { project } = defineProps<{
  project: {
    img: string
    git: string
    title: string
    description: string
    theme: {
      green: string
      blue: string
      yellow: string
      red: string
      white: string
      black: string
      primary: string
    }
    extend: {
      title: string
      components: {
        title: string
        description: string
        icon: string
        badges: {
          color: string
          label: string
        }[]
      }[]
    }

    accordion: {
      title: string
      items: AccordionItem[]
    }
  }
}>();
</script>

<template>
  <UModal class="project"
  :description="project.description"
  :title="project.title"
  :ui="{
    content: 'w-[calc(100vw-2rem)] max-w-4xl',
    header: 'absolute z-10 top-0 left-0 w-full border-none',
    body: 'p-0 sm:p-0',
    title: 'sr-only',
    description: 'sr-only',
  }">

    <template #body>
      <NuxtImg
        :src="project.img"
        ref="projectImage"
        format="webp"
        quality="50"
        class="w-full"
        />


      <UContainer class='bg-[#323030]' :style="{
        '--project-green': project.theme.green,
        '--project-blue': project.theme.blue,
        '--project-yellow': project.theme.yellow,
        '--project-red': project.theme.red,
        '--project-black': project.theme.black,
        '--project-white': project.theme.white,
        '--project-primary': project.theme.primary,
      }" :ui="{
        root: 'lg:grid py-0 sm:py-0 lg:py-0',
      }">
        <UPageSection :title="project.title" :description="project.description" :ui="{
          title: 'text-left lg:text-md',
          description: 'text-left',
          container: 'py-5 sm:py-5 lg:py-10',
        }">

        </UPageSection>

        <UPageSection :title="project.extend.title" :ui="{
          title: 'text-left lg:text-md',
          container: 'py-5 sm:py-5 lg:py-10',
        }">
          <UPageColumns class='lg:!columns-2 py-5'>
            <UPageFeature v-for="item in project.extend.components" variant="naked" :key="item.title" :title="item.title"
              :icon="item.icon" :ui="{
                leadingIcon: 'size-5 text-muted',
              }">

              <template #description>
                <MDC :value="item.description" />
                <div v-if="item.badges" class="flex flex-wrap gap-2 mt-4">
                  <UBadge v-for="badge in item.badges" :key="badge.label" variant="solid" :style="{
                    backgroundColor: `var(--project-${badge.color})`,
                    '--tw-ring-color': `var(--project-white)`,
                    color: `var(--project-primary)`,
                    fontWeight: '700',
                  }">
                    {{ badge.label }}

                  </UBadge>
                </div>
              </template>

            </UPageFeature>
          </UPageColumns>
        </UPageSection>


        <UPageSection :title="project.accordion.title" :ui="{
          title: 'text-left lg:text-md',
          container: 'py-5 sm:py-5 lg:py-10',
        }">
          <UContainer>
            <UAccordion :items="project.accordion.items" :unmount-on-hide="false">
              <template #body="{ item }">
                <MDC :value="item.content" />
              </template>
            </UAccordion>
          </UContainer>
        </UPageSection>

        <div class="flex justify-center p-10">
          <UButton icon="i-lucide-rocket" size="md" variant="solid"
          target="_blank"
          :to="project.git"
          :style="{
            color: `var(--project-primary)`,
            backgroundColor: `var(--project-white)`,
          }">Посмотреть код</UButton>
        </div>
      </UContainer>


    </template>
  </UModal>
</template>
