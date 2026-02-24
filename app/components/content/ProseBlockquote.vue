<template>
  <div
    v-if="type"
    :class="styles[type]"
    class="my-6 rounded-xl border p-4"
  >
    <div class="font-semibold mb-2 uppercase text-xs tracking-wide">
      {{ type }}
    </div>

    <div class="text-sm opacity-90">
      <slot />
    </div>
  </div>

  <blockquote v-else class="border-l-4 pl-4 italic opacity-80">
    <slot />
  </blockquote>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

const slots = useSlots()

// Получаем первый текст внутри blockquote
const firstChild = computed(() => {
  const vnode = slots.default?.()[0]
  return vnode?.children?.toString?.() || ''
})

// Проверяем есть ли [!TYPE]
const type = computed(() => {
  const match = firstChild.value.match(/\[!(\w+)\]/)
  return match ? match[1]?.toLowerCase() : null
})

const styles: Record<string, string> = {
  caution: 'bg-red-50 border-red-400 text-red-900',
  warning: 'bg-yellow-50 border-yellow-400 text-yellow-900',
  tip: 'bg-green-50 border-green-400 text-green-900',
  info: 'bg-blue-50 border-blue-400 text-blue-900'
}
</script>
