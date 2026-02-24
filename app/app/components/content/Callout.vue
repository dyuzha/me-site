<template>
  <div :class="wrapperClass">
    <div class="flex items-start gap-3">
      <div class="text-lg">
        {{ icon }}
      </div>

      <div>
        <div class="font-semibold mb-1 capitalize">
          {{ type }}
        </div>
        <div class="opacity-90 text-sm">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: 'warning' | 'tip' | 'info' | 'caution'
}>()

const styles = {
  warning: 'bg-yellow-50 border-yellow-400 text-yellow-900',
  tip: 'bg-green-50 border-green-400 text-green-900',
  info: 'bg-blue-50 border-blue-400 text-blue-900',
  caution: 'bg-red-50 border-red-400 text-red-900'
}

const icons = {
  warning: '⚠️',
  tip: '💡',
  info: 'ℹ️',
  caution: '🚨'
}

const wrapperClass = computed(() =>
  `my-6 rounded-xl border p-4 ${styles[props.type || 'info']}`
)

const icon = computed(() => icons[props.type || 'info'])
</script>
