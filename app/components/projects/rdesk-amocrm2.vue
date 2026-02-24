<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

  const items = ref<AccordionItem[]>([
  {
    label: 'Уникальный lead_id',
    icon: 'i-lucide-fingerprint-pattern',
    content: `
**«СПК Здравница»** передаёт данные с уникальным **lead_id**.
В тестовом домене **AmoCRM** сделок с такими **lead_id** не существует, поэтому данные **не могут** быть привязаны.

Для этого реализован **режим подмены lead_id** :
- ищется сделка с названием \`ID_<lead_id>\` ;
- если сделка найдена — во входящийх данных её **lead_id подменяется**  на реальный **lead_id** ;
- если сделка не найдена — предварительно создаётся сделка с названием \`ID_<lead_id>\` , после чего выполняется подмена **lead_id** во входящих данных.

Это позволило запускать сервис параллельно с *prod*-интеграцией и тестировать его на реальных данных.
`
  },
  {
    label: 'Перенаправление трафика для разработки',
    icon: 'i-lucide-network',
    content: `
**API**, предоставленный **«СПК Здравница»** , не соответствовал фактическому поведению.

На тот момент уже существовал **PHP**-сервис, реализующий часть функционала и работающий с **prod**-доменом **AmoCRM**. Остановить его или изменить адрес отправки данных из AmoCRM было невозможно.


В связи с этим был реализован ***PHP**-скрипт*, дублирующий входящий трафик на ПК разработчика.

В дальнейшем данное решение было перенесено на уровень **Nginx**, что позволило включать зеркалирование трафика для тестирования в «боевых» условиях без остановки **prod**-сервиса.
`
  },
  {
    label: `HotReload`,
    icon: 'i-lucide-refresh-cw',
    content:
    `
Для разработки с **Hot Reload** использовался плагин, который проксировал собранный код с ПК разработчика в **AmoCRM**.
Был настроен **Webpack** и выполнен проброс портов.
    `
  },
  {
    label: `Устаревшая библиотека`,
    icon: 'i-lucide-clock-arrow-down',
    content:
    `
Для ускорения разработки была использована готовая **Python**-библиотека *AmoCRM v2*. В процессе работы выяснилось, что библиотека не поддерживается и часть функционала работает некорректно.
Проблема решена через патчинг библиотеки через *Monkey path*.
    `

  }
])

const implementes = ([
  {
    title: 'Nginx',
    description: '(*OpenResty*) Обратный прокси с возможностью зеркалирования пакетов',
    icon: 'i-simple-icons-nginx',
    badges: [
      {
        color: 'info',
        label: 'lua',
      },
      {
        color: 'info',
        label: 'docker',
      },
    ]
  },

  {
    title: 'Плагин AmoCRM',
    description: `
- визуализация данных;
- передача данных на *localhost*;
- *Hot Reload* для разработки;
- сборка *Webpack* под формат плагинов **AmoCRM**.
`,
    icon: 'i-simple-icons-typescript',
    badges: [
      {
        color: 'neutral',
        label: 'TypeScript',
      },
      {
        color: 'error',
        label: 'HTML',
      },
      {
        color: 'info',
        label: 'CSS',
      },
      {
        color: 'success',
        label: 'JinJa',
      },
      {
        color: 'info',
        label: 'Webpack',
      },
    ]
  },
  {
    title: 'Python - сервис',
    description: `
*Двух-поточный* сервис, принимающий данные из **Здравницы** и отправляющий обработанные данные в **AmoCRM** через *OAuth2.0* авторизацию.

Потоки:
1. **FastAPI** (*асинхронный*):
- принимает данные с сервера **Здравницы**
- отправляет данные в очередь.
2. **Worker**:
- аутентификация (*OAuth 2.0*);
- трансформация данных из очереди;
- передача данных в **AmoCRM**.

    `,
    icon: 'i-simple-icons-python',
    badges: [
      {
        color: 'success',
        label: 'PyDantic',
      },
      {
        color: 'warning',
        label: 'poetry',
      },
      {
        color: 'info',
        label: 'docker',
      },
      {
        color: 'warning',
        label: 'FastAPI',
      },
      {
        color: 'info',
        label: 'HTTPX',
      },
    ]
  },
])

const {project } = defineProps<{project: string}>();

import gsap from 'gsap';
const projectImage = ref(null)

onMounted(() => {
  gsap.to(projectImage.value, {
    scale: 1,
    y: -150,
    ease: "none",
    scrollTrigger: {
      trigger: projectImage.value,
      start: "top top",
      end: "bottom top",
      scrub: true,
      scroller: ".modal-body-selector" // CSS-селектор контейнера, который скроллится
    }
  })
})
// gsap.set(projectImage.value, { scale: 1.5 })
</script>

<template>
  <UModal
    :ui="{
      content: 'w-[calc(100vw-2rem)] max-w-4xl',
      header: 'absolute top-0 left-0 w-full border-none',
      body: 'p-0 sm:p-0',
    }"
  >
    <template #body>
<img
  ref="projectImage"
  src="/images/amo-sync2.png"
  class="sticky top-0 -z-10 w-full object-cover ring"
  stayle="transform: scale(1.5)"
/>

    <UPageColumns class='lg:!columns-2'>
        <UPageCard
          v-for="item in implementes"
          :key="item.title"
          :icon="item.icon"
          :title="item.title"
          variant="outline"
        >

          <template #description>
          <MDC :value="item.description" />
          <div
            v-if="item.badges"
            class="flex flex-wrap gap-2 mt-4"
            >
            <UBadge
            v-for="badge in item.badges"
            :key="badge.label"
            :color="badge.color"
            variant="outline"
            >
            {{ badge.label }}
            </UBadge>
          </div>
          </template>

        </UPageCard>
    </UPageColumns>
    <UPageCard
      title="Проблемы и их решения"
    >
  <UAccordion
    :items="items"
    :unmount-on-hide="false"
    :ui="{
      trigger: 'text-base',
      body: 'text-base text-muted'
    }"
  >
    <template #body="{ item }">
      <MDC :value="item.content" />
    </template>
  </UAccordion>

  </UPageCard>

    </template>
  </UModal>
</template>
